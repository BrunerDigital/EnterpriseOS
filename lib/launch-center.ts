import { createClient } from "@/lib/supabase/server";
import type { AppSession } from "@/lib/auth/session";
import type { Database, Json } from "@/lib/supabase/database.types";

type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];
type Integration = Database["public"]["Tables"]["integrations"]["Row"];
type BrandSettings = Database["public"]["Tables"]["brand_settings"]["Row"];

export type LaunchActivity = {
  id: string;
  action: string;
  label: string;
  target: string;
  detail: string;
  createdAt: string;
  tone: "lead" | "setup" | "system" | "team";
};

export type LaunchReadiness = {
  label: string;
  status: "ready" | "pending" | "attention";
  detail: string;
};

export type LaunchCenterData = {
  activities: LaunchActivity[];
  readiness: LaunchReadiness[];
  metrics: Array<{ label: string; value: string; detail: string }>;
  setupSteps: Array<{ slug: string; title: string; savedAt: string | null; status: "done" | "pending" }>;
  integrations: Array<{ label: string; status: string; updatedAt: string }>;
};

const setupTitles: Record<string, string> = {
  brand: "Brand",
  workspace: "Workspace",
  team: "Team",
  "import-contacts": "CRM import",
  integrations: "Integrations",
  campaign: "Campaign",
  automation: "Automation",
  plan: "Billing",
  launch: "Launch"
};

const providerLabels: Record<string, string> = {
  stripe: "Stripe",
  twilio: "Twilio",
  sendgrid: "SendGrid",
  mailgun: "Mailgun",
  google_calendar: "Google Calendar",
  meta: "Meta",
  google_business_profile: "Google Business Profile",
  openai: "OpenAI",
  supabase: "Supabase"
};

export async function getLaunchCenterData(session: AppSession): Promise<LaunchCenterData> {
  const supabase = await createClient();

  const [{ data: logs }, { data: integrations }, { data: brandSettings }] = await Promise.all([
    supabase
      .from("audit_logs")
      .select("*")
      .eq("tenant_id", session.profile.tenantId)
      .order("created_at", { ascending: false })
      .limit(75),
    supabase
      .from("integrations")
      .select("*")
      .eq("tenant_id", session.profile.tenantId)
      .order("provider", { ascending: true }),
    supabase
      .from("brand_settings")
      .select("*")
      .eq("tenant_id", session.profile.tenantId)
      .maybeSingle()
  ]);

  const auditLogs = (logs ?? []) as AuditLog[];
  const integrationRows = (integrations ?? []) as Integration[];
  const brand = brandSettings as BrandSettings | null;
  const leadLogs = auditLogs.filter((log) => log.action === "lead.submitted");
  const setupLogs = auditLogs.filter((log) => log.action === "setup.step.saved");
  const setupByStep = new Map<string, AuditLog>();

  for (const log of setupLogs) {
    if (!setupByStep.has(log.target)) {
      setupByStep.set(log.target, log);
    }
  }

  const setupSteps = Object.entries(setupTitles).map(([slug, title]) => {
    const saved = setupByStep.get(slug);
    return {
      slug,
      title,
      savedAt: saved?.created_at ?? null,
      status: saved ? "done" as const : "pending" as const
    };
  });

  const readyIntegrations = integrationRows.filter((item) => item.status === "ready").length;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const customDomain = brand?.custom_domain ?? "";
  const readiness: LaunchReadiness[] = [
    {
      label: "Supabase project",
      status: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "ready" : "attention",
      detail: "Auth, database, RLS, and server routes are connected."
    },
    {
      label: "Service role",
      status: process.env.SUPABASE_SERVICE_ROLE_KEY ? "ready" : "attention",
      detail: "Required for lead and setup capture API writes."
    },
    {
      label: "Production app URL",
      status: appUrl && !appUrl.includes("localhost") ? "ready" : "pending",
      detail: appUrl || "Set NEXT_PUBLIC_APP_URL in Vercel."
    },
    {
      label: "Custom domain",
      status: customDomain && !customDomain.includes(".example") ? "ready" : "pending",
      detail: customDomain && !customDomain.includes(".example") ? customDomain : "Point Cloudflare DNS to Vercel, then update Supabase redirects."
    },
    {
      label: "Lead webhook",
      status: process.env.LEADS_WEBHOOK_URL ? "ready" : "pending",
      detail: process.env.LEADS_WEBHOOK_URL ? "Lead submissions can forward to your notification stack." : "Add LEADS_WEBHOOK_URL to email, Slack, CRM, or automation webhook."
    },
    {
      label: "Setup webhook",
      status: process.env.SETUP_WEBHOOK_URL ? "ready" : "pending",
      detail: process.env.SETUP_WEBHOOK_URL ? "Setup progress can trigger notifications." : "Add SETUP_WEBHOOK_URL when you want setup alerts."
    }
  ];

  const activities = auditLogs
    .filter((log) => ["lead.submitted", "setup.step.saved", "team.invite.sent", "demo.seeded"].includes(log.action))
    .slice(0, 18)
    .map(formatActivity);

  return {
    activities,
    readiness,
    metrics: [
      { label: "Launch progress", value: `${Math.round((setupByStep.size / Object.keys(setupTitles).length) * 100)}%`, detail: `${setupByStep.size} of ${Object.keys(setupTitles).length} setup areas saved` },
      { label: "Captured leads", value: String(leadLogs.length), detail: "Public landing and funnel submissions logged" },
      { label: "Integrations ready", value: `${readyIntegrations}/${integrationRows.length || 9}`, detail: "Mock and production provider status" },
      { label: "Readiness checks", value: `${readiness.filter((item) => item.status === "ready").length}/${readiness.length}`, detail: "Go-live environment checklist" }
    ],
    setupSteps,
    integrations: integrationRows.map((integration) => ({
      label: providerLabels[integration.provider] ?? integration.provider,
      status: integration.status,
      updatedAt: integration.updated_at
    }))
  };
}

function formatActivity(log: AuditLog): LaunchActivity {
  const metadata = asRecord(log.metadata);

  if (log.action === "lead.submitted") {
    const payload = asRecord(metadata.payload);
    const company = stringValue(metadata.company) ?? stringValue(payload.company) ?? "Unknown company";
    const source = stringValue(metadata.source) ?? stringValue(payload.source) ?? "Digital360 public site";
    return {
      id: log.id,
      action: log.action,
      label: "New launch lead",
      target: log.target,
      detail: `${company} via ${source}`,
      createdAt: log.created_at,
      tone: "lead"
    };
  }

  if (log.action === "setup.step.saved") {
    const title = stringValue(metadata.title) ?? setupTitles[log.target] ?? log.target;
    return {
      id: log.id,
      action: log.action,
      label: `${title} saved`,
      target: log.target,
      detail: "Setup progress captured in tenant audit logs.",
      createdAt: log.created_at,
      tone: "setup"
    };
  }

  if (log.action === "team.invite.sent") {
    return {
      id: log.id,
      action: log.action,
      label: "Team invite sent",
      target: log.target,
      detail: stringValue(metadata.role) ?? "Invite recorded",
      createdAt: log.created_at,
      tone: "team"
    };
  }

  return {
    id: log.id,
    action: log.action,
    label: "System event",
    target: log.target,
    detail: stringValue(metadata.source) ?? "Digital360 event captured",
    createdAt: log.created_at,
    tone: "system"
  };
}

function asRecord(value: Json | undefined): Record<string, Json> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, Json>;
  }

  return {};
}

function stringValue(value: Json | undefined) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
