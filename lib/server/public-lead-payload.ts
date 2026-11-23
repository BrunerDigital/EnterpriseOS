// Approved public marketing form fields and campaign attribution. Keep this list
// explicit; marketing form definitions may contain prototype or setup-only fields.
const publicLeadKeys = [
  "agency_name", "audience", "automations", "average_sale", "biggest_growth_bottleneck",
  "biggest_lead_source", "billing_email", "budget", "business_type", "can_we_contact_you?",
  "client_count", "company", "contact_consent", "contact_count", "current_crm",
  "current_rating", "current_response_time", "current_stack", "current_systems", "current_tools",
  "desired_go-live_date", "email", "existing_clients", "fbclid", "follow-up_gaps",
  "gclid", "goal", "growth_priority", "launch_goal", "launch_timeline",
  "lead_channels", "lead_sources", "location_count", "locations", "main_bottleneck",
  "markets", "markets_served", "missing_feature", "monthly_clients", "monthly_customers",
  "monthly_leads", "name", "page_url", "partner_type", "phone",
  "pipelines", "plan", "primary_goal", "primary_services", "reason",
  "referrer", "reporting_gap", "reporting_gaps", "response_time", "revenue_goal",
  "review_process", "role", "rollout_timeline", "seats", "services",
  "services_sold", "source", "team_size", "use_case", "utm_campaign",
  "utm_content", "utm_medium", "utm_source", "utm_term", "website",
  "white-label_goal", "work_email",
] as const;

export type PublicLeadPayload = Partial<Record<(typeof publicLeadKeys)[number], string>>;

const retiredSources = new Set(["free trial signup", "trial thank-you"]);

export function isRetiredTrialSource(source: string | undefined) {
  return source !== undefined && retiredSources.has(source.trim().toLowerCase());
}

function publicPageUrl(value: string) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return undefined;
    // Attribution is collected in named fields. Do not persist arbitrary URL
    // parameters, fragments, or userinfo embedded in page and referrer URLs.
    return url.origin + url.pathname;
  } catch {
    return undefined;
  }
}

export function selectPublicLeadPayload(value: unknown): PublicLeadPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;
  const selected: PublicLeadPayload = {};
  for (const key of publicLeadKeys) {
    if (!Object.hasOwn(input, key)) continue;
    const field = input[key];
    if (typeof field !== "string") continue;
    const safeValue = key === "page_url" || key === "referrer" ? publicPageUrl(field) : field;
    if (safeValue !== undefined) selected[key] = safeValue;
  }
  return selected;
}
