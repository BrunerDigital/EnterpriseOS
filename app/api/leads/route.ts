import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyLead } from "@/lib/server/lead-notifications";
import type { Json } from "@/lib/supabase/database.types";

type LeadPayload = Record<string, unknown> & {
  email?: string;
  source?: string;
  company?: string;
  name?: string;
  page_url?: string;
};

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid lead payload." }, { status: 400 });
  }

  if (!payload.email || typeof payload.email !== "string") {
    return NextResponse.json({ success: false, message: "Work email is required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ success: false, message: "A valid work email is required." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Thanks. Your Digital360 setup request was received." });
  }

  let notificationResults: Awaited<ReturnType<typeof notifyLead>> = [];

  try {
    const admin = createAdminClient();
    const { data: tenant } = await admin.from("tenants").select("id").eq("slug", "brunerdigital").maybeSingle();

    if (tenant) {
      const metadata = JSON.parse(
        JSON.stringify({
          source: payload.source ?? "Digital360 public site",
          company: payload.company ?? null,
          name: payload.name ?? null,
          page_url: payload.page_url ?? null,
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
  } catch (error) {
    console.error("Digital360 lead audit write failed", error);
  }

  notificationResults = await notifyLead(payload);

  return NextResponse.json({
    success: true,
    message: "Thanks. Your Digital360 setup request was received.",
    source: payload.source ?? "Digital360 public site",
    notifications: notificationResults.map((result) => ({ provider: result.provider, status: result.status })),
    redirect: typeof payload.thank_you_path === "string" && payload.thank_you_path.startsWith("/") ? payload.thank_you_path : "/demo/thank-you/"
  });
}
