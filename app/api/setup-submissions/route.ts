import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";

type SetupSubmission = {
  step?: string;
  title?: string;
  fields?: Record<string, unknown>;
  page_url?: string;
};

export async function POST(request: Request) {
  let payload: SetupSubmission;

  try {
    payload = (await request.json()) as SetupSubmission;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid setup payload." }, { status: 400 });
  }

  if (!payload.step || typeof payload.step !== "string") {
    return NextResponse.json({ success: false, message: "Setup step is required." }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: tenant } = await admin.from("tenants").select("id").eq("slug", "brunerdigital").maybeSingle();

  if (!tenant) {
    return NextResponse.json({ success: false, message: "Digital360 tenant is not configured yet." }, { status: 503 });
  }

  const metadata = JSON.parse(
    JSON.stringify({
      title: payload.title ?? payload.step,
      fields: payload.fields ?? {},
      page_url: payload.page_url ?? null,
      captured_at: new Date().toISOString()
    })
  ) as Json;

  const { error } = await admin.from("audit_logs").insert({
    tenant_id: tenant.id,
    action: "setup.step.saved",
    target: payload.step,
    metadata
  });

  if (error) {
    return NextResponse.json({ success: false, message: "Setup progress could not be saved." }, { status: 500 });
  }

  const webhookUrl = process.env.SETUP_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => undefined);
  }

  return NextResponse.json({
    success: true,
    message: "Setup progress saved to Digital360."
  });
}
