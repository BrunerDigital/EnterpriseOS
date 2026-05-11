import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running npm run seed.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

async function main() {
  const { data: tenant, error: tenantError } = await supabase
    .from("tenants")
    .upsert({ name: "Apex Growth Agency", slug: "apex-growth", plan: "scale" }, { onConflict: "slug" })
    .select()
    .single();

  if (tenantError) throw tenantError;

  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .insert({ tenant_id: tenant.id, name: "Northfield Dental", type: "client" })
    .select()
    .single();

  if (workspaceError) throw workspaceError;

  await supabase.from("brand_settings").upsert(
    {
      tenant_id: tenant.id,
      primary_color: "#38bdf8",
      custom_domain: "app.apexgrowth.example",
      theme: { mode: "dark", accent: "electric-blue" }
    },
    { onConflict: "tenant_id" }
  );

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      workspace_id: workspace.id,
      name: "Northfield Dental Group",
      domain: "northfield.example",
      industry: "Healthcare"
    })
    .select()
    .single();

  if (companyError) throw companyError;

  const { data: contact, error: contactError } = await supabase
    .from("contacts")
    .insert({
      workspace_id: workspace.id,
      company_id: company.id,
      first_name: "Maya",
      last_name: "Thompson",
      email: "maya@northfield.example",
      phone: "(415) 555-0194",
      status: "Hot lead",
      lead_score: 92,
      ai_summary: "Decision-maker evaluating patient reactivation and reputation management for five offices."
    })
    .select()
    .single();

  if (contactError) throw contactError;

  const { data: pipeline, error: pipelineError } = await supabase
    .from("pipelines")
    .insert({ workspace_id: workspace.id, name: "Growth pipeline" })
    .select()
    .single();

  if (pipelineError) throw pipelineError;

  const { data: stages, error: stagesError } = await supabase
    .from("stages")
    .insert([
      { pipeline_id: pipeline.id, name: "New", sort_order: 1 },
      { pipeline_id: pipeline.id, name: "Qualified", sort_order: 2 },
      { pipeline_id: pipeline.id, name: "Proposal", sort_order: 3 },
      { pipeline_id: pipeline.id, name: "Won", sort_order: 4 }
    ])
    .select();

  if (stagesError) throw stagesError;

  const newStage = stages.find((stage) => stage.name === "New");
  if (!newStage) throw new Error("Seed stage not created.");

  await supabase.from("deals").insert({
    stage_id: newStage.id,
    company_id: company.id,
    contact_id: contact.id,
    name: "Northfield growth suite",
    value_cents: 4800000,
    ai_next_step: "Send AI-personalized proposal and invite finance lead to demo."
  });

  const { data: calendar } = await supabase
    .from("calendars")
    .insert({ workspace_id: workspace.id, name: "Consultations" })
    .select()
    .single();

  if (calendar) {
    await supabase.from("appointments").insert({
      calendar_id: calendar.id,
      title: "Northfield platform demo",
      starts_at: "2026-05-13T18:00:00.000Z",
      ends_at: "2026-05-13T19:00:00.000Z"
    });
  }

  await supabase.from("campaigns").insert([
    {
      workspace_id: workspace.id,
      name: "Spring reactivation",
      audience: "Dormant patients",
      status: "draft",
      ai_copy: "Win back patients with timely reminders and a gentle care-focused offer."
    },
    {
      workspace_id: workspace.id,
      name: "Review recovery",
      audience: "Recent appointments",
      status: "active",
      ai_copy: "Ask happy patients for feedback while the experience is fresh."
    }
  ]);

  await supabase.from("workflows").insert({
    workspace_id: workspace.id,
    name: "Missed call text back",
    trigger_key: "call.missed",
    definition: { steps: ["send_sms", "wait", "assign_task", "notify_owner"] },
    ai_recommendation: "Branch hot leads above score 85 into sales-call priority routing."
  });

  await supabase.from("reviews").insert({
    workspace_id: workspace.id,
    source: "Google",
    rating: 5,
    body: "Fast appointment reminders and helpful staff.",
    ai_response: "Thank you for sharing this. We are grateful the appointment experience felt easy and helpful."
  });

  await supabase.from("products").insert({
    workspace_id: workspace.id,
    name: "Reputation automation add-on",
    price_cents: 49900,
    recurring: true
  });

  await supabase.from("invoices").insert({
    workspace_id: workspace.id,
    number: "INV-1007",
    status: "open",
    total_cents: 149900
  });

  await supabase.from("integrations").upsert(
    [
      "stripe",
      "twilio",
      "sendgrid",
      "mailgun",
      "google_calendar",
      "meta",
      "google_business_profile",
      "openai",
      "supabase"
    ].map((provider) => ({
      tenant_id: tenant.id,
      provider,
      status: provider === "openai" || provider === "supabase" ? "ready" : "mock"
    })),
    { onConflict: "tenant_id,provider" }
  );

  await supabase.from("audit_logs").insert({
    tenant_id: tenant.id,
    action: "demo.seeded",
    target: workspace.id,
    metadata: { mode: "demo", source: "supabase/seed.ts" }
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
