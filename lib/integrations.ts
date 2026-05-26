import "server-only";

export type IntegrationReadiness = "connected" | "ready" | "needs_credentials";

export type IntegrationStatus = {
  key: string;
  name: string;
  category: "Data" | "Revenue" | "Messaging" | "Calendar" | "Ads" | "AI" | "Analytics" | "Operations";
  readiness: IntegrationReadiness;
  configured: string[];
  missing: string[];
  nextStep: string;
};

function has(name: string) {
  const value = process.env[name];
  return Boolean(value && value.trim().length > 0 && value.trim().toLowerCase() !== "false");
}

function status(
  key: string,
  name: string,
  category: IntegrationStatus["category"],
  required: string[],
  nextStep: string,
  optional: string[] = []
): IntegrationStatus {
  const configured = [...required, ...optional].filter(has);
  const missing = required.filter((name) => !has(name));

  return {
    key,
    name,
    category,
    readiness: missing.length === 0 ? "connected" : configured.length > 0 ? "ready" : "needs_credentials",
    configured,
    missing,
    nextStep
  };
}

export function getIntegrationStatuses(): IntegrationStatus[] {
  return [
    status(
      "supabase",
      "Supabase",
      "Data",
      ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
      "Run migrations and confirm RLS policies in the production Supabase project."
    ),
    status(
      "lead-routing",
      "Lead routing and alerts",
      "Operations",
      ["LEADS_WEBHOOK_URL"],
      "Connect LEADS_WEBHOOK_URL to CRM, Slack, Make, Zapier, or an internal notification workflow.",
      ["LEADS_NOTIFICATION_EMAIL", "SENDGRID_API_KEY", "MAILGUN_API_KEY"]
    ),
    status(
      "analytics",
      "Analytics and pixels",
      "Analytics",
      ["NEXT_PUBLIC_GA_MEASUREMENT_ID"],
      "Add GA4 and optional ad pixels, then verify demo_requested conversion events.",
      ["NEXT_PUBLIC_GOOGLE_ADS_ID", "NEXT_PUBLIC_META_PIXEL_ID", "NEXT_PUBLIC_LINKEDIN_PARTNER_ID", "NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS"]
    ),
    status(
      "booking",
      "Sales calendar",
      "Calendar",
      ["NEXT_PUBLIC_DEMO_BOOKING_URL", "NEXT_PUBLIC_SALES_OWNER_EMAIL"],
      "Add the live scheduling link and sales owner email for launch demo routing.",
      ["NEXT_PUBLIC_SALES_OWNER_NAME"]
    ),
    status(
      "stripe",
      "Stripe",
      "Revenue",
      ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
      "Add Stripe keys, create price IDs, and point webhooks at the billing route before taking payments."
    ),
    status(
      "twilio",
      "Twilio",
      "Messaging",
      ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_MESSAGING_SERVICE_SID"],
      "Add Twilio credentials and compliance-approved SMS copy before sending production texts."
    ),
    status(
      "email",
      "Transactional email",
      "Messaging",
      ["LEADS_NOTIFICATION_EMAIL"],
      "Configure either SendGrid or Mailgun sender credentials for lead alerts and transactional email.",
      ["SENDGRID_API_KEY", "SENDGRID_FROM_EMAIL", "MAILGUN_API_KEY", "MAILGUN_DOMAIN", "MAILGUN_FROM_EMAIL"]
    ),
    status(
      "google-calendar",
      "Google Calendar",
      "Calendar",
      ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
      "Create OAuth credentials and connect calendar scopes for booking sync."
    ),
    status(
      "meta",
      "Meta",
      "Ads",
      ["META_APP_ID", "META_APP_SECRET"],
      "Add Meta app credentials and pixel ID before running conversion-optimized campaigns.",
      ["NEXT_PUBLIC_META_PIXEL_ID"]
    ),
    status(
      "google-business-profile",
      "Google Business Profile",
      "Ads",
      ["GOOGLE_BUSINESS_PROFILE_CLIENT_ID", "GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET"],
      "Add GBP OAuth credentials before syncing locations and reviews."
    ),
    status(
      "openai",
      "OpenAI",
      "AI",
      ["OPENAI_API_KEY", "AI_ASSISTANT_API_TOKEN"],
      "Add the OpenAI API key and an internal API token before enabling live model calls.",
      ["OPENAI_MODEL"]
    )
  ];
}

export function summarizeReadiness(statuses: IntegrationStatus[]) {
  return {
    connected: statuses.filter((item) => item.readiness === "connected").length,
    ready: statuses.filter((item) => item.readiness === "ready").length,
    needsCredentials: statuses.filter((item) => item.readiness === "needs_credentials").length,
    total: statuses.length
  };
}
