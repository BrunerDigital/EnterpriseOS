import {
  BadgeCheck,
  Building2,
  CalendarClock,
  CreditCard,
  Database,
  Globe2,
  Inbox,
  Megaphone,
  Palette,
  Rocket,
  Users,
  Workflow
} from "lucide-react";

export type SetupStep = {
  slug: string;
  title: string;
  description: string;
  status: "done" | "active" | "ready" | "locked";
  owner: string;
  duration: string;
  fields: string[];
  checklist: string[];
  outcomes: string[];
  href: string;
  icon: typeof Palette;
};

export const setupSteps: SetupStep[] = [
  {
    slug: "brand",
    title: "Brand",
    description: "Set Digital360 identity, sender details, theme tokens, and portal presentation.",
    status: "active",
    owner: "Agency owner",
    duration: "8 min",
    fields: ["Company name", "Logo", "Primary color", "Support email", "Portal URL"],
    checklist: ["Logo added", "Theme reviewed", "Sender identity drafted", "Portal preview checked"],
    outcomes: ["Branded app shell", "Client portal visual baseline", "Email sender checklist"],
    href: "/setup/brand",
    icon: Palette
  },
  {
    slug: "workspace",
    title: "Workspace",
    description: "Create the first client workspace, industry profile, timezone, and operating model.",
    status: "ready",
    owner: "Implementation lead",
    duration: "10 min",
    fields: ["Workspace name", "Industry", "Timezone", "Primary offer", "Locations"],
    checklist: ["Client workspace created", "Pipeline template selected", "Dashboard baseline enabled"],
    outcomes: ["Tenant-scoped workspace", "Default pipeline", "Launch dashboard"],
    href: "/setup/workspace",
    icon: Building2
  },
  {
    slug: "team",
    title: "Team",
    description: "Invite admins, operators, sales users, billing users, and client viewers.",
    status: "ready",
    owner: "Agency admin",
    duration: "12 min",
    fields: ["Name", "Email", "Role", "Workspace access", "Invite note"],
    checklist: ["Owner verified", "Roles assigned", "Invite emails prepared", "Audit trail enabled"],
    outcomes: ["Role-aware navigation", "Tenant profiles", "Invite audit log"],
    href: "/setup/team",
    icon: Users
  },
  {
    slug: "import-contacts",
    title: "CRM import",
    description: "Map contacts, companies, tags, lifecycle stages, and opportunity sources.",
    status: "ready",
    owner: "CRM lead",
    duration: "18 min",
    fields: ["CSV file", "Source", "Lifecycle stage", "Owner", "Tags"],
    checklist: ["Columns mapped", "Duplicates reviewed", "Lead scores initialized", "Import approved"],
    outcomes: ["Clean contact base", "Company relationships", "AI summary queue"],
    href: "/setup/import-contacts",
    icon: Database
  },
  {
    slug: "integrations",
    title: "Integrations",
    description: "Connect or stage Stripe, Twilio, email, calendar, Meta, GBP, Supabase, and OpenAI.",
    status: "ready",
    owner: "Technical admin",
    duration: "20 min",
    fields: ["Provider", "API key", "Webhook URL", "OAuth client", "Test mode"],
    checklist: ["Secrets documented", "Redirect URLs verified", "Webhook endpoints planned", "Mock mode fallback set"],
    outcomes: ["Credential map", "Connection readiness", "Go-live blockers list"],
    href: "/setup/integrations",
    icon: Globe2
  },
  {
    slug: "campaign",
    title: "Campaign",
    description: "Prepare the first launch funnel, campaign, follow-up sequence, and attribution route.",
    status: "locked",
    owner: "Growth lead",
    duration: "15 min",
    fields: ["Audience", "Offer", "Landing page", "Follow-up", "UTM source"],
    checklist: ["Offer selected", "Landing page drafted", "Email/SMS follow-up queued", "Source report configured"],
    outcomes: ["Launch campaign", "Attribution trail", "AI copy variants"],
    href: "/setup/campaign",
    icon: Megaphone
  },
  {
    slug: "automation",
    title: "Automation",
    description: "Activate speed-to-lead, missed-call, review request, and task routing workflows.",
    status: "locked",
    owner: "Ops lead",
    duration: "16 min",
    fields: ["Trigger", "Conditions", "Message", "Task owner", "Fallback"],
    checklist: ["Trigger tested", "Human approval gate set", "Task assignment confirmed", "Audit logging enabled"],
    outcomes: ["First workflow active", "AI recommendations", "Operator handoff"],
    href: "/setup/automation",
    icon: Workflow
  },
  {
    slug: "plan",
    title: "Billing",
    description: "Choose launch plan, usage limits, billing owner, invoice profile, and payment provider.",
    status: "locked",
    owner: "Billing admin",
    duration: "9 min",
    fields: ["Plan", "Billing cycle", "Seats", "Workspaces", "Payment method"],
    checklist: ["Plan selected", "Usage limits reviewed", "Billing owner assigned", "Stripe connection staged"],
    outcomes: ["Subscription plan", "Invoice profile", "Usage guardrails"],
    href: "/setup/plan",
    icon: CreditCard
  },
  {
    slug: "launch",
    title: "Launch",
    description: "Review readiness, domain settings, auth email, integrations, reporting, and client handoff.",
    status: "locked",
    owner: "Launch owner",
    duration: "14 min",
    fields: ["Launch date", "Domain", "Support owner", "Client contact", "Success metric"],
    checklist: ["Domain verified", "Auth email tested", "Dashboard reviewed", "Client invite sent"],
    outcomes: ["Go-live checklist", "Client handoff", "Post-launch scorecard"],
    href: "/onboarding",
    icon: Rocket
  }
];

export const launchMetrics = [
  { label: "Setup progress", value: "32%", detail: "3 of 9 areas started", icon: BadgeCheck },
  { label: "First workspace", value: "Northfield", detail: "Client workspace seeded", icon: Building2 },
  { label: "Inbox status", value: "Mock", detail: "Twilio/email credentials needed", icon: Inbox },
  { label: "Calendar", value: "Ready", detail: "Booking flow staged", icon: CalendarClock }
];

export function getSetupStep(slug?: string) {
  return setupSteps.find((step) => step.slug === slug) ?? setupSteps[0];
}
