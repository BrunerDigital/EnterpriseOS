import type { Database } from "@/lib/supabase/database.types";

export type IntegrationProvider = Database["public"]["Enums"]["integration_provider"];

export type ConfigField = {
  name: string;
  label: string;
  type: "text" | "password" | "url" | "email" | "textarea" | "select";
  secret?: boolean;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: Array<{ label: string; value: string }>;
};

export type IntegrationConfigDefinition = {
  provider: IntegrationProvider;
  name: string;
  category: "Data" | "Revenue" | "Messaging" | "Calendar" | "Ads" | "AI" | "Analytics" | "Operations" | "Infrastructure";
  description: string;
  fields: ConfigField[];
  dataPoints: string[];
};

const requiredSecret = (name: string, label: string, placeholder?: string, help?: string): ConfigField => ({
  name,
  label,
  type: "password",
  secret: true,
  required: true,
  placeholder,
  help
});

const optionalSecret = (name: string, label: string, placeholder?: string, help?: string): ConfigField => ({
  name,
  label,
  type: "password",
  secret: true,
  placeholder,
  help
});

export const integrationConfigCatalog: IntegrationConfigDefinition[] = [
  {
    provider: "supabase",
    name: "Supabase",
    category: "Data",
    description: "Primary tenant database, auth, storage, and service role configuration.",
    fields: [
      { name: "NEXT_PUBLIC_SUPABASE_URL", label: "Project URL", type: "url", required: true, placeholder: "https://project.supabase.co" },
      { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", label: "Anon key", type: "textarea", required: true },
      requiredSecret("SUPABASE_SERVICE_ROLE_KEY", "Service role key"),
      optionalSecret("SUPABASE_DB_PASSWORD", "Database password")
    ],
    dataPoints: ["Tenants", "Workspaces", "Contacts", "Companies", "Deals", "Audit logs", "Integration configs"]
  },
  {
    provider: "openai",
    name: "OpenAI",
    category: "AI",
    description: "AI assistant, summaries, scoring, reply suggestions, campaign copy, and workflow recommendations.",
    fields: [
      requiredSecret("OPENAI_API_KEY", "OpenAI API key"),
      { name: "OPENAI_MODEL", label: "Model", type: "text", required: true, placeholder: "gpt-4.1-mini" },
      requiredSecret("AI_ASSISTANT_API_TOKEN", "Internal AI route token", undefined, "Used by internal services when calling /api/ai/assist.")
    ],
    dataPoints: ["Contact summary", "Lead scoring", "Reply suggestions", "Campaign copy", "Workflow recommendations", "Review responses", "Dashboard insights"]
  },
  {
    provider: "stripe",
    name: "Stripe",
    category: "Revenue",
    description: "Checkout sessions, subscriptions, invoices, products, plans, and payment webhooks.",
    fields: [
      { name: "STRIPE_PUBLISHABLE_KEY", label: "Publishable key", type: "text" },
      requiredSecret("STRIPE_SECRET_KEY", "Secret key"),
      requiredSecret("STRIPE_WEBHOOK_SECRET", "Webhook signing secret"),
      requiredSecret("BILLING_API_TOKEN", "Internal billing route token"),
      { name: "STRIPE_PRICE_LAUNCH", label: "Launch plan price ID", type: "text" },
      { name: "STRIPE_PRICE_SCALE", label: "Scale plan price ID", type: "text" },
      { name: "STRIPE_PRICE_ENTERPRISE", label: "Enterprise plan price ID", type: "text" }
    ],
    dataPoints: ["Customers", "Subscriptions", "Invoices", "Products", "Checkout sessions", "MRR", "Failed payments"]
  },
  {
    provider: "twilio",
    name: "Twilio",
    category: "Messaging",
    description: "SMS, missed-call text-back, appointment reminders, and two-way conversation plumbing.",
    fields: [
      { name: "TWILIO_ACCOUNT_SID", label: "Account SID", type: "text", required: true },
      requiredSecret("TWILIO_AUTH_TOKEN", "Auth token"),
      { name: "TWILIO_MESSAGING_SERVICE_SID", label: "Messaging service SID", type: "text", required: true },
      { name: "TWILIO_PHONE_NUMBER", label: "Fallback phone number", type: "text" },
      requiredSecret("MESSAGING_API_TOKEN", "Internal messaging route token")
    ],
    dataPoints: ["SMS conversations", "Delivery status", "Inbound replies", "Opt-outs", "Missed-call events", "Reminder sends"]
  },
  {
    provider: "sendgrid",
    name: "SendGrid",
    category: "Messaging",
    description: "Transactional email, lead alerts, onboarding emails, and campaign delivery foundation.",
    fields: [
      requiredSecret("SENDGRID_API_KEY", "API key"),
      { name: "SENDGRID_FROM_EMAIL", label: "From email", type: "email", required: true, placeholder: "support@brunerdigital.com" },
      { name: "SENDGRID_FROM_NAME", label: "From name", type: "text", placeholder: "Digital360 by BrunerDigital" }
    ],
    dataPoints: ["Email sends", "Delivery status", "Opens", "Clicks", "Bounces", "Lead alerts"]
  },
  {
    provider: "mailgun",
    name: "Mailgun",
    category: "Messaging",
    description: "Alternative transactional email provider for lead alerts and domain-authenticated sending.",
    fields: [
      requiredSecret("MAILGUN_API_KEY", "API key"),
      { name: "MAILGUN_DOMAIN", label: "Sending domain", type: "text", required: true, placeholder: "mg.brunerdigital.com" },
      { name: "MAILGUN_FROM_EMAIL", label: "From email", type: "email", required: true }
    ],
    dataPoints: ["Email sends", "Delivery status", "Bounces", "Complaints", "Lead alerts"]
  },
  {
    provider: "google_calendar",
    name: "Google Calendar",
    category: "Calendar",
    description: "Calendar OAuth, booking sync, availability, appointment creation, reminders, and no-show workflows.",
    fields: [
      { name: "GOOGLE_CLIENT_ID", label: "OAuth client ID", type: "text", required: true },
      requiredSecret("GOOGLE_CLIENT_SECRET", "OAuth client secret"),
      { name: "GOOGLE_CALENDAR_REDIRECT_URI", label: "Redirect URI", type: "url", placeholder: "https://digital360.brunerdigital.com/auth/callback" },
      { name: "GOOGLE_CALENDAR_SCOPES", label: "Scopes", type: "textarea", placeholder: "https://www.googleapis.com/auth/calendar.events" }
    ],
    dataPoints: ["Calendars", "Availability", "Appointments", "No-shows", "Reschedules", "Booking source"]
  },
  {
    provider: "calendly",
    name: "Sales calendar / booking link",
    category: "Calendar",
    description: "Direct booking URL and sales owner routing for public CTAs and launch walkthroughs.",
    fields: [
      { name: "NEXT_PUBLIC_DEMO_BOOKING_URL", label: "Demo booking URL", type: "url", required: true },
      { name: "NEXT_PUBLIC_SALES_OWNER_NAME", label: "Sales owner name", type: "text", required: true },
      { name: "NEXT_PUBLIC_SALES_OWNER_EMAIL", label: "Sales owner email", type: "email", required: true }
    ],
    dataPoints: ["Booked walkthroughs", "Owner routing", "Calendar source", "Demo no-shows", "Prep email routing"]
  },
  {
    provider: "google_analytics",
    name: "Google Analytics",
    category: "Analytics",
    description: "GA4 measurement for page views, lead events, campaign attribution, and conversion paths.",
    fields: [{ name: "NEXT_PUBLIC_GA_MEASUREMENT_ID", label: "GA4 Measurement ID", type: "text", required: true, placeholder: "G-XXXXXXXXXX" }],
    dataPoints: ["Page views", "Traffic sources", "Demo requests", "Funnel leads", "Conversion rate"]
  },
  {
    provider: "google_ads",
    name: "Google Ads",
    category: "Ads",
    description: "Google Ads conversion tracking for paid search and retargeting campaigns.",
    fields: [
      { name: "NEXT_PUBLIC_GOOGLE_ADS_ID", label: "Google Ads ID", type: "text", required: true, placeholder: "AW-XXXXXXXXXX" },
      { name: "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL", label: "Lead conversion label", type: "text", required: true }
    ],
    dataPoints: ["Ad clicks", "Lead conversions", "Conversion value", "Campaign source", "Search terms"]
  },
  {
    provider: "meta",
    name: "Meta",
    category: "Ads",
    description: "Meta app credentials, Pixel tracking, lead ads, retargeting, and social inbox expansion.",
    fields: [
      { name: "META_APP_ID", label: "App ID", type: "text", required: true },
      requiredSecret("META_APP_SECRET", "App secret"),
      { name: "NEXT_PUBLIC_META_PIXEL_ID", label: "Pixel ID", type: "text" }
    ],
    dataPoints: ["Pixel leads", "Lead ads", "Campaign source", "Social messages", "Audience events"]
  },
  {
    provider: "linkedin",
    name: "LinkedIn",
    category: "Ads",
    description: "LinkedIn Insight Tag, conversion tracking, and paid B2B launch campaigns.",
    fields: [
      { name: "NEXT_PUBLIC_LINKEDIN_PARTNER_ID", label: "Partner ID", type: "text", required: true },
      { name: "NEXT_PUBLIC_LINKEDIN_CONVERSION_ID", label: "Lead conversion ID", type: "text" },
      { name: "LINKEDIN_CLIENT_ID", label: "OAuth client ID", type: "text" },
      optionalSecret("LINKEDIN_CLIENT_SECRET", "OAuth client secret")
    ],
    dataPoints: ["Insight tag events", "Lead conversions", "Campaign source", "Company engagement"]
  },
  {
    provider: "google_business_profile",
    name: "Google Business Profile",
    category: "Ads",
    description: "Location sync, reviews, reputation data, and local business proof workflows.",
    fields: [
      { name: "GOOGLE_BUSINESS_PROFILE_CLIENT_ID", label: "OAuth client ID", type: "text", required: true },
      requiredSecret("GOOGLE_BUSINESS_PROFILE_CLIENT_SECRET", "OAuth client secret"),
      { name: "GOOGLE_BUSINESS_PROFILE_ACCOUNT_ID", label: "Account ID", type: "text" },
      { name: "GOOGLE_BUSINESS_PROFILE_LOCATION_IDS", label: "Location IDs", type: "textarea" }
    ],
    dataPoints: ["Locations", "Reviews", "Ratings", "Review replies", "Local performance"]
  },
  {
    provider: "custom_webhook",
    name: "Lead routing webhooks",
    category: "Operations",
    description: "External CRM, Slack, Make, Zapier, and custom webhook destinations for submitted leads and setup events.",
    fields: [
      optionalSecret("LEADS_WEBHOOK_URL", "Lead webhook URL"),
      optionalSecret("SETUP_WEBHOOK_URL", "Setup webhook URL"),
      { name: "LEADS_NOTIFICATION_EMAIL", label: "Lead notification email", type: "email" }
    ],
    dataPoints: ["Lead submitted", "Setup step saved", "Demo requested", "Agency application", "UTM source"]
  },
  {
    provider: "slack",
    name: "Slack",
    category: "Operations",
    description: "Slack alerting for new leads, failed workflows, setup activity, and team notifications.",
    fields: [optionalSecret("SLACK_WEBHOOK_URL", "Incoming webhook URL"), { name: "SLACK_CHANNEL", label: "Default channel", type: "text", placeholder: "#sales" }],
    dataPoints: ["Lead alerts", "Workflow failures", "Setup completions", "Billing alerts"]
  },
  {
    provider: "make",
    name: "Make",
    category: "Operations",
    description: "Make webhook routing for custom automations and external platform handoffs.",
    fields: [optionalSecret("MAKE_WEBHOOK_URL", "Webhook URL"), { name: "MAKE_SCENARIO_NAME", label: "Scenario name", type: "text" }],
    dataPoints: ["Lead fanout", "CRM sync", "Email sequence trigger", "Internal task creation"]
  },
  {
    provider: "zapier",
    name: "Zapier",
    category: "Operations",
    description: "Zapier catch hooks for fast operational automation without custom code.",
    fields: [optionalSecret("ZAPIER_WEBHOOK_URL", "Catch hook URL"), { name: "ZAPIER_ZAP_NAME", label: "Zap name", type: "text" }],
    dataPoints: ["Lead fanout", "CRM sync", "Notification routing", "Spreadsheet logging"]
  },
  {
    provider: "cloudflare",
    name: "Cloudflare",
    category: "Infrastructure",
    description: "DNS, proxy, WAF, domain, and edge configuration reference for BrunerDigital domains.",
    fields: [
      { name: "CLOUDFLARE_ACCOUNT_ID", label: "Account ID", type: "text" },
      { name: "CLOUDFLARE_ZONE_ID", label: "Zone ID", type: "text" },
      optionalSecret("CLOUDFLARE_API_TOKEN", "API token")
    ],
    dataPoints: ["DNS records", "Zone status", "WAF events", "Proxy status", "SSL mode"]
  },
  {
    provider: "vercel",
    name: "Vercel",
    category: "Infrastructure",
    description: "Deployment, environment, domain, preview, and production project reference.",
    fields: [
      { name: "VERCEL_PROJECT_ID", label: "Project ID", type: "text" },
      { name: "VERCEL_TEAM_ID", label: "Team ID", type: "text" },
      optionalSecret("VERCEL_TOKEN", "API token")
    ],
    dataPoints: ["Deployments", "Domains", "Environment status", "Build status", "Preview URLs"]
  }
];

export const integrationConfigByProvider = Object.fromEntries(integrationConfigCatalog.map((item) => [item.provider, item])) as Record<
  IntegrationProvider,
  IntegrationConfigDefinition
>;

export function getIntegrationDefinition(provider: string) {
  return integrationConfigCatalog.find((item) => item.provider === provider);
}
