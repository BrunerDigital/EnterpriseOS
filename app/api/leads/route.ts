import { NextResponse } from "next/server";
import { walkthroughFormSource } from "@/lib/campaign-attribution";
import { createAdminClient } from "@/lib/supabase/admin";
import { inquiryWorkspaceId, inquiryWorkspaceType } from "@/lib/server/project-inquiries";
import { notifyLead } from "@/lib/server/lead-notifications";
import type { Json } from "@/lib/supabase/database.types";
import { isRetiredTrialSource, selectPublicLeadPayload, type PublicLeadPayload } from "@/lib/server/public-lead-payload";

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid lead payload." }, { status: 400 });
  }

  const selected = selectPublicLeadPayload(raw);
  if (!selected) {
    return NextResponse.json({ success: false, message: "Invalid lead payload." }, { status: 400 });
  }
  const { website, ...payload } = selected;
  if (isRetiredTrialSource(payload.source)) {
    return NextResponse.json({ success: false, message: "Digital360 is invite-only. Request a walkthrough from the demo page." }, { status: 410 });
  }
  if (payload.source === walkthroughFormSource) {
    return NextResponse.json({ success: false, message: "Reload the Digital360 walkthrough form and try again." }, { status: 409 });
  }

  if (!payload.email || typeof payload.email !== "string") {
    return NextResponse.json({ success: false, message: "Work email is required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ success: false, message: "A valid work email is required." }, { status: 400 });
  }

  if (website?.trim()) {
    return NextResponse.json({ success: true, message: "Thanks. Your Digital360 setup request was received." });
  }

  let notificationResults: Awaited<ReturnType<typeof notifyLead>> = [];
  let crmResult: { contactId?: string; companyId?: string; status: "created" | "linked" | "skipped" } = { status: "skipped" };
  let tenantId: string | undefined;

  try {
    const admin = createAdminClient();
    const { data: tenant } = await admin.from("tenants").select("id").eq("slug", "brunerdigital").maybeSingle();

    if (tenant) {
      tenantId = tenant.id;
      const workspaceId = inquiryWorkspaceId();
      const { data: workspace } = workspaceId ? await admin
        .from("workspaces")
        .select("id")
        .eq("id", workspaceId)
        .eq("tenant_id", tenant.id)
        .eq("type", inquiryWorkspaceType)
        .eq("agency_admin_only", true)
        .maybeSingle() : { data: null };

      if (workspace) {
        const companyName = cleanString(payload.company);
        const personName = splitName(cleanString(payload.name) || cleanString(payload.email)?.split("@")[0] || "Digital360 Lead");
        let companyId: string | undefined;

        if (companyName) {
          const { data: existingCompany } = await admin
            .from("companies")
            .select("id")
            .eq("workspace_id", workspace.id)
            .ilike("name", companyName)
            .maybeSingle();

          if (existingCompany) {
            companyId = existingCompany.id;
          } else {
            const { data: insertedCompany } = await admin
              .from("companies")
              .insert({
                workspace_id: workspace.id,
                name: companyName
              })
              .select("id")
              .single();

            companyId = insertedCompany?.id;
          }
        }

        const customFields = JSON.parse(
          JSON.stringify({
            launch_source: payload.source ?? "Digital360 public site",
            launch_page_url: payload.page_url ?? null,
            launch_goal: payload.launch_goal ?? null,
            current_stack: payload.current_stack ?? null,
            contact_consent: payload.contact_consent ?? null,
            utm_source: payload.utm_source ?? null,
            utm_medium: payload.utm_medium ?? null,
            utm_campaign: payload.utm_campaign ?? null,
            gclid: payload.gclid ?? null,
            fbclid: payload.fbclid ?? null
          })
        ) as Json;

        const { data: existingContact } = await admin
          .from("contacts")
          .select("id")
          .eq("workspace_id", workspace.id)
          .ilike("email", payload.email)
          .maybeSingle();

        if (existingContact) {
          crmResult = { status: "linked", contactId: existingContact.id };
        } else {
          const { data: insertedContact } = await admin
            .from("contacts")
            .insert({
              workspace_id: workspace.id,
              company_id: companyId ?? null,
              first_name: personName.first,
              last_name: personName.last,
              email: payload.email.toLowerCase(),
              phone: cleanString(payload.phone) ?? null,
              status: "lead",
              lead_score: calculateLaunchLeadScore(payload),
              ai_summary: buildLeadSummary(payload),
              custom_fields: customFields
            })
            .select("id")
            .single();

          crmResult = { status: "created", contactId: insertedContact?.id, companyId };
        }
      }

      const metadata = JSON.parse(
        JSON.stringify({
          source: payload.source ?? "Digital360 public site",
          company: payload.company ?? null,
          name: payload.name ?? null,
          page_url: payload.page_url ?? null,
          crm: crmResult,
          payload
        })
      ) as Json;

      await admin.from("audit_logs").insert({
        tenant_id: tenant.id,
        action: "lead.submitted",
        target: payload.email,
        metadata
      });
    }
  } catch {
    console.error("Digital360 lead audit write failed");
  }

  notificationResults = await notifyLead(payload, tenantId);

  return NextResponse.json({
    success: true,
    message: "Thanks. Your Digital360 setup request was received.",
    source: payload.source ?? "Digital360 public site",
    notifications: notificationResults.map((result) => ({ provider: result.provider, status: result.status })),
    redirect: "/demo/thank-you/"
  });
}

function cleanString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function splitName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0] || "Digital360";
  const last = parts.length > 1 ? parts.slice(1).join(" ") : "Lead";

  return { first, last };
}

function calculateLaunchLeadScore(payload: PublicLeadPayload) {
  let score = 62;

  if (cleanString(payload.company)) score += 8;
  if (cleanString(payload.phone)) score += 8;
  if (cleanString(payload.current_stack)) score += 7;
  if (cleanString(payload.launch_goal)) score += 7;
  if (payload.contact_consent === "yes") score += 5;

  return Math.min(score, 100);
}

function buildLeadSummary(payload: PublicLeadPayload) {
  const parts = [
    `${cleanString(payload.name) || payload.email} requested a Digital360 launch walkthrough.`,
    cleanString(payload.company) ? `Company: ${cleanString(payload.company)}.` : null,
    cleanString(payload.launch_goal) ? `Primary goal: ${cleanString(payload.launch_goal)}.` : null,
    cleanString(payload.current_stack) ? `Current stack: ${cleanString(payload.current_stack)}.` : null,
    `Source: ${cleanString(payload.source) || "Digital360 public site"}.`
  ].filter(Boolean);

  return parts.join(" ");
}
