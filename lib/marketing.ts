export type MarketingPage = {
  slug: string;
  title: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta?: string;
  secondaryCta?: string;
  bullets: string[];
  sections: Array<{
    title: string;
    body: string;
    points: string[];
  }>;
  faqs?: Array<{ q: string; a: string }>;
};

export type FunnelTemplate = {
  slug: string;
  title: string;
  offer: string;
  audience: string;
  hook: string;
  sections: string[];
  formFields: string[];
  followUp: string[];
};

export type FlowStep = {
  slug: string;
  title: string;
  headline: string;
  body: string;
  fields: string[];
  checklist: string[];
  cta: string;
};

export const brand = {
  name: "Digital360 by BrunerDigital",
  oneLiner:
    "Digital360 by BrunerDigital is the white-label AI business operating system for agencies, service companies, franchises, and growth teams.",
  taglineOptions: [
    "Your growth engine, fully white-labeled.",
    "One operating system for leads, clients, and revenue.",
    "Launch a premium business suite under your brand.",
    "The AI-powered command center for modern service businesses.",
    "Replace disconnected tools with one branded growth platform."
  ],
  valueProposition:
    "Digital360 by BrunerDigital helps teams capture leads, automate follow-up, manage sales pipelines, schedule appointments, collect reviews, report performance, bill clients, and deliver client portals from one premium white-label workspace.",
  voice:
    "Confident, precise, executive, useful, and conversion-oriented. Avoid hype, jargon, and fear. Lead with business outcomes, then support with concrete operating details.",
  pillars: [
    "Own the client relationship with a branded platform.",
    "Convert more opportunities with AI-assisted follow-up.",
    "Operate every location, pipeline, campaign, and client from one workspace.",
    "Prove value with reporting, attribution, and executive visibility.",
    "Launch faster with templates, onboarding flows, and reseller-ready assets."
  ],
  differentiators: [
    "White-label controls for agencies and multi-brand operators.",
    "AI messaging and automation connected to CRM, calendars, inbox, funnels, and reporting.",
    "Enterprise-ready operating model for teams, locations, roles, client portals, billing, and permissions.",
    "Built around implementation and revenue expansion, not just contact storage.",
    "Launch-ready go-to-market assets, funnels, and onboarding flows."
  ]
};

export const navItems = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Security", href: "/security" }
];

const defaultFaqs = [
  {
    q: "Is Digital360 white-label?",
    a: "Yes. Agencies and operators can customize brand, domain, portal experience, outbound identity, client workspaces, and sales collateral."
  },
  {
    q: "Who is it built for?",
    a: "The platform is designed for agencies, local service businesses, consultants, marketing teams, franchises, and multi-location brands that need one operating layer for growth."
  },
  {
    q: "Does this replace a CRM?",
    a: "It includes CRM, pipelines, conversations, automations, scheduling, funnels, reputation, analytics, billing, and portals, so most teams can consolidate several tools."
  }
];

export const homepage: MarketingPage = {
  slug: "/",
  title: "Digital360 by BrunerDigital | White-label AI business operating system",
  headline: "Run your entire growth engine from one white-label AI business suite.",
  subheadline:
    "Digital360 by BrunerDigital gives agencies, franchises, service companies, and marketing teams one premium platform for CRM, pipelines, conversations, automation, scheduling, funnels, reputation, reporting, billing, portals, and brand control.",
  primaryCta: "Start free trial",
  secondaryCta: "Book a demo",
  bullets: [
    "Launch under your brand with client-ready workspaces.",
    "Capture, route, and convert leads with AI-assisted follow-up.",
    "Centralize pipeline, calendar, inbox, reviews, campaigns, and reporting.",
    "Prove ROI across teams, clients, brands, and locations."
  ],
  sections: [
    {
      title: "Everything revenue teams need in one operating layer",
      body: "Digital360 connects the tools that usually live in separate tabs, spreadsheets, inboxes, and dashboards.",
      points: ["Unified CRM and pipeline", "AI messaging and automations", "Funnels, calendars, forms, billing, portals", "Executive-grade reporting"]
    },
    {
      title: "Built to sell, onboard, and scale",
      body: "Use Digital360 for your own operations or resell it as a premium branded platform for clients and locations.",
      points: ["Agency reseller workflows", "Franchise and multi-location controls", "Onboarding and migration playbooks", "Reusable funnel and campaign templates"]
    },
    {
      title: "A premium product experience without enterprise bloat",
      body: "Clean UI, conversion-first workflows, and implementation-ready defaults help teams get value quickly.",
      points: ["Guided setup", "Role-based workspaces", "Template libraries", "Human-in-the-loop AI"]
    }
  ],
  faqs: defaultFaqs
};

export const marketingPages: Record<string, MarketingPage> = {
  "/pricing": {
    slug: "/pricing",
    title: "Pricing | Digital360 by BrunerDigital",
    headline: "Pricing built for operators, agencies, and scale.",
    subheadline:
      "Start lean, launch your workspace, then expand into white-label, multi-location, automation, and enterprise controls as your growth system matures.",
    primaryCta: "Choose your plan",
    secondaryCta: "Talk to sales",
    bullets: ["Transparent launch packages", "White-label upgrade paths", "Implementation support options", "Usage-based expansion available"],
    sections: [
      { title: "Launch", body: "For teams validating the platform with one brand or location.", points: ["CRM and pipeline", "Core automations", "Calendars and forms", "Starter reporting"] },
      { title: "Scale", body: "For agencies and companies running multiple clients, brands, or locations.", points: ["White-label controls", "Advanced automations", "Client portals", "Billing and reputation"] },
      { title: "Enterprise", body: "For complex teams that need security, custom workflows, and rollout support.", points: ["Custom permissions", "Dedicated onboarding", "Advanced reporting", "Priority support"] }
    ],
    faqs: defaultFaqs
  },
  "/features": {
    slug: "/features",
    title: "Features | Digital360 by BrunerDigital",
    headline: "One suite for every step of the customer journey.",
    subheadline:
      "Digital360 brings acquisition, conversion, service, retention, and reporting into a single premium workspace.",
    primaryCta: "Explore demo",
    secondaryCta: "View pricing",
    bullets: ["CRM and opportunities", "AI conversations and automations", "Funnels and campaigns", "Reputation, reporting, billing, and portals"],
    sections: [
      { title: "Capture demand", body: "Build pages, forms, funnels, calendars, and campaigns that turn traffic into conversations.", points: ["Lead forms", "Landing pages", "Calendar routing", "Campaign attribution"] },
      { title: "Convert faster", body: "Let AI-assisted messaging and automations keep every opportunity moving.", points: ["Inbox unification", "Pipeline stages", "Follow-up sequences", "Task automation"] },
      { title: "Operate with clarity", body: "Give leadership, clients, and locations clean visibility into activity and revenue.", points: ["Dashboards", "Review tracking", "Billing", "Portal access"] }
    ],
    faqs: defaultFaqs
  },
  "/features/crm": {
    slug: "/features/crm",
    title: "CRM | Digital360 by BrunerDigital",
    headline: "A CRM built for action, not administration.",
    subheadline:
      "Manage contacts, companies, opportunities, notes, tasks, owners, and client context from one revenue command center.",
    primaryCta: "See CRM workflow",
    secondaryCta: "Book a demo",
    bullets: ["Contact timelines", "Pipeline views", "Smart lead routing", "Workspace-level permissions"],
    sections: [
      { title: "Every relationship in context", body: "See conversations, appointments, forms, campaigns, notes, reviews, invoices, and opportunities in one timeline.", points: ["Unified profiles", "Custom fields", "Lifecycle stages", "Activity history"] },
      { title: "Pipeline visibility", body: "Track opportunities by owner, source, stage, value, location, and next step.", points: ["Kanban and list views", "Forecasting fields", "Task queues", "Source attribution"] },
      { title: "Agency-ready CRM", body: "Run multiple client workspaces while keeping data, permissions, branding, and reporting cleanly separated.", points: ["Client tenants", "User roles", "Brand controls", "Export-ready reporting"] }
    ],
    faqs: defaultFaqs
  },
  "/features/ai-automation": {
    slug: "/features/ai-automation",
    title: "AI Automation | Digital360 by BrunerDigital",
    headline: "Turn every lead response into a guided growth workflow.",
    subheadline:
      "Use AI-assisted messaging and automation templates to respond faster, qualify leads, book appointments, recover lost opportunities, and trigger internal tasks.",
    primaryCta: "Build first automation",
    secondaryCta: "Watch demo",
    bullets: ["AI replies with guardrails", "Follow-up workflows", "Lead qualification", "Human handoff rules"],
    sections: [
      { title: "AI where follow-up matters", body: "Draft replies, summarize conversations, suggest next actions, and trigger workflows from inbox, CRM, calendar, and campaigns.", points: ["Conversation summaries", "Suggested replies", "Intent detection", "Appointment prompts"] },
      { title: "Automation builder", body: "Create practical flows for speed-to-lead, no-show recovery, review requests, nurture, renewal, and reactivation.", points: ["Visual logic", "Delays and branches", "Goal tracking", "Audit trail"] },
      { title: "Control and compliance", body: "Keep humans in control with approval steps, opt-out rules, fallback paths, and role permissions.", points: ["Approval gates", "Suppression logic", "Message history", "Team alerts"] }
    ],
    faqs: defaultFaqs
  },
  "/features/conversations": {
    slug: "/features/conversations",
    title: "Conversations Inbox | Digital360 by BrunerDigital",
    headline: "One inbox for every customer conversation.",
    subheadline:
      "Centralize SMS, email, web forms, chat, missed call follow-up, internal notes, and AI-assisted replies in one team inbox.",
    primaryCta: "Preview inbox",
    secondaryCta: "Book demo",
    bullets: ["Shared team inbox", "AI reply assistance", "Lead source context", "Assignment and SLA views"],
    sections: [
      { title: "Never lose the thread", body: "Every conversation connects to the contact, opportunity, owner, location, and campaign source.", points: ["Unified timeline", "Internal notes", "Assignments", "Status filters"] },
      { title: "Respond with speed and consistency", body: "Use templates, AI drafts, snippets, and automation triggers to keep every reply on brand.", points: ["Saved replies", "AI rewrite", "Bulk actions", "Follow-up triggers"] },
      { title: "Coach the team", body: "Review response times, unresolved conversations, owner performance, and source-to-booking conversion.", points: ["SLA reporting", "Owner queues", "Quality review", "Escalation rules"] }
    ],
    faqs: defaultFaqs
  },
  "/features/funnel-builder": {
    slug: "/features/funnel-builder",
    title: "Funnel Builder | Digital360 by BrunerDigital",
    headline: "Launch conversion funnels connected to CRM, calendar, and automation.",
    subheadline:
      "Create lead capture pages, demo funnels, audits, webinars, migration offers, and paid ad landing pages without disconnecting the follow-up workflow.",
    primaryCta: "View funnel templates",
    secondaryCta: "Start trial",
    bullets: ["Template library", "Forms and calendars", "Attribution tracking", "Automated follow-up"],
    sections: [
      { title: "Templates for revenue moments", body: "Start with proven funnel structures for demos, audits, webinars, case studies, migrations, and special offers.", points: ["Reusable sections", "Lead forms", "Thank-you pages", "Tracking hooks"] },
      { title: "Connected conversion paths", body: "Every submission can create a contact, assign an owner, trigger a sequence, book a meeting, or update a pipeline.", points: ["CRM sync", "Calendar routing", "Pipeline creation", "Nurture automation"] },
      { title: "Optimize by source", body: "Measure which pages, offers, audiences, and follow-up paths drive revenue.", points: ["UTM capture", "Source reports", "A/B test notes", "Campaign dashboards"] }
    ],
    faqs: defaultFaqs
  },
  "/features/calendar-scheduling": {
    slug: "/features/calendar-scheduling",
    title: "Calendar Scheduling | Digital360 by BrunerDigital",
    headline: "Book more qualified appointments with intelligent scheduling.",
    subheadline:
      "Route leads to the right team, location, service, or client calendar while keeping CRM and automations in sync.",
    primaryCta: "See scheduling",
    secondaryCta: "Book demo",
    bullets: ["Round-robin routing", "Location calendars", "No-show recovery", "Calendar-triggered workflows"],
    sections: [
      { title: "Scheduling that knows the pipeline", body: "Booking forms can qualify leads, assign owners, set opportunity stage, and trigger reminders.", points: ["Service types", "Custom questions", "Owner routing", "Pipeline updates"] },
      { title: "Reduce no-shows", body: "Automated reminders, confirmations, reschedules, and follow-ups keep appointments moving.", points: ["SMS reminders", "Email reminders", "Reschedule links", "No-show workflows"] },
      { title: "Multi-team visibility", body: "See meetings by team, location, source, and conversion outcome.", points: ["Calendar dashboards", "Source attribution", "Booking reports", "Capacity planning"] }
    ],
    faqs: defaultFaqs
  },
  "/features/reputation": {
    slug: "/features/reputation",
    title: "Reputation Management | Digital360 by BrunerDigital",
    headline: "Turn satisfied customers into visible proof.",
    subheadline:
      "Request, monitor, respond to, and report on reviews across locations, clients, and teams.",
    primaryCta: "Launch review campaign",
    secondaryCta: "View reporting",
    bullets: ["Review request workflows", "Location dashboards", "Response templates", "Proof for sales and retention"],
    sections: [
      { title: "Ask at the right moment", body: "Trigger review requests after appointments, completed jobs, invoices, or customer success milestones.", points: ["Event-based requests", "Smart timing", "SMS and email", "Opt-out controls"] },
      { title: "Protect brand reputation", body: "Monitor sentiment, assign responses, and escalate sensitive reviews quickly.", points: ["Sentiment cues", "Response workflows", "Team assignment", "Audit history"] },
      { title: "Report the lift", body: "Show review volume, rating trends, response time, and location performance.", points: ["Client reports", "Location views", "Trend charts", "Exportable proof"] }
    ],
    faqs: defaultFaqs
  },
  "/features/reporting": {
    slug: "/features/reporting",
    title: "Reporting & Analytics | Digital360 by BrunerDigital",
    headline: "Give every stakeholder a clear view of growth.",
    subheadline:
      "Measure lead sources, speed-to-lead, pipeline value, booked appointments, campaign outcomes, reviews, revenue, and team performance.",
    primaryCta: "Preview analytics",
    secondaryCta: "Talk to sales",
    bullets: ["Executive dashboards", "Client reports", "Location rollups", "Attribution-ready events"],
    sections: [
      { title: "From activity to revenue", body: "Connect leads, conversations, appointments, opportunities, campaigns, invoices, and reviews into one reporting model.", points: ["Source attribution", "Pipeline velocity", "Conversion rates", "Revenue snapshots"] },
      { title: "Reports for each audience", body: "Executives, operators, agencies, clients, and location managers each get the view they need.", points: ["Role views", "Client exports", "Location rollups", "Scheduled reports"] },
      { title: "Launch tracking foundation", body: "Use placeholders for analytics, events, UTMs, pixels, and CRM routing until production credentials are connected.", points: ["Event map", "UTM capture", "Pixel placeholders", "CRM events"] }
    ],
    faqs: defaultFaqs
  },
  "/white-label": {
    slug: "/white-label",
    title: "White-label Agency Platform | Digital360 by BrunerDigital",
    headline: "Sell a premium business suite under your agency brand.",
    subheadline:
      "Digital360 by BrunerDigital helps agencies package CRM, automations, AI messaging, funnels, reputation, reporting, billing, and portals into a sticky recurring offer.",
    primaryCta: "Apply for agency access",
    secondaryCta: "View partner funnel",
    bullets: ["Custom domain and branding", "Client workspaces", "Reseller-ready sales assets", "Retention and upsell workflows"],
    sections: [
      { title: "Productize your service delivery", body: "Move clients from fragmented campaigns into a platform they log into, value, and expand.", points: ["Client portals", "Template snapshots", "Onboarding flows", "Recurring reporting"] },
      { title: "Retain clients with visible ROI", body: "Show leads captured, appointments booked, reviews generated, automations launched, and revenue influenced.", points: ["Client dashboards", "Executive reports", "Campaign proof", "Renewal assets"] },
      { title: "Scale fulfillment", body: "Standardize setup, migration, automations, content, and review campaigns across accounts.", points: ["Playbooks", "Workspace templates", "Team permissions", "Operational checklists"] }
    ],
    faqs: defaultFaqs
  },
  "/solutions/franchises": {
    slug: "/solutions/franchises",
    title: "Multi-location & Franchise Growth | Digital360 by BrunerDigital",
    headline: "Control brand-wide growth while empowering every location.",
    subheadline:
      "Digital360 by BrunerDigital gives franchise and multi-location teams centralized visibility, local execution, review growth, routing, reporting, and campaign governance.",
    primaryCta: "Book franchise demo",
    secondaryCta: "Take assessment",
    bullets: ["Location dashboards", "Brand governance", "Lead routing", "Review and reputation reporting"],
    sections: [
      { title: "Central strategy, local execution", body: "Give corporate teams visibility while locations manage the leads, conversations, calendars, and reviews that matter locally.", points: ["Location roles", "Brand templates", "Routing rules", "Local reporting"] },
      { title: "Roll up what matters", body: "Compare performance by market, owner, source, campaign, review score, and revenue stage.", points: ["Location scorecards", "Market comparisons", "Source reporting", "Executive rollups"] },
      { title: "Launch repeatable playbooks", body: "Deploy campaigns, automations, funnels, and review workflows across every location without rebuilding from scratch.", points: ["Reusable templates", "Governed campaigns", "Onboarding checklists", "Quality controls"] }
    ],
    faqs: defaultFaqs
  },
  "/integrations": {
    slug: "/integrations",
    title: "Integrations | Digital360 by BrunerDigital",
    headline: "Connect the systems your growth team already uses.",
    subheadline:
      "Digital360 is designed to connect with calendars, email, payments, ad platforms, analytics, webhooks, data imports, and custom implementation layers.",
    primaryCta: "Plan integration map",
    secondaryCta: "Talk to implementation",
    bullets: ["Calendar and email", "Payments and billing", "Analytics and ads", "Webhooks and imports"],
    sections: [
      { title: "Core launch connections", body: "Start with the integrations needed to capture demand, book appointments, send messages, and measure outcomes.", points: ["Calendar sync", "Email sending", "Payment gateway", "Analytics events"] },
      { title: "Implementation-friendly", body: "Use structured placeholders for API keys, webhook URLs, pixel IDs, CRM exports, and tenant-level settings.", points: ["Environment variables", "Event map", "Webhook notes", "Import templates"] },
      { title: "Designed for scale", body: "Keep tenant, location, brand, and client-level integration settings clean as the platform grows.", points: ["Tenant config", "Location settings", "Credential checklist", "Audit log"] }
    ],
    faqs: defaultFaqs
  },
  "/security": {
    slug: "/security",
    title: "Security & Trust | Digital360 by BrunerDigital",
    headline: "Trust foundations for enterprise-grade growth operations.",
    subheadline:
      "Digital360 uses a security-first operating model with role-based access, tenant separation, audit trails, data governance, and implementation checklists for production hardening.",
    primaryCta: "Request security review",
    secondaryCta: "View docs",
    bullets: ["Role-based access", "Tenant separation", "Audit-ready workflows", "Production credential checklist"],
    sections: [
      { title: "Access controls", body: "Model permissions by organization, workspace, role, client, location, and team responsibility.", points: ["Role scopes", "Workspace boundaries", "Team invites", "Admin controls"] },
      { title: "Data governance", body: "Prepare production workflows for consent, opt-out, retention, exports, deletion requests, and auditability.", points: ["Consent fields", "Opt-out handling", "Export process", "Audit trail"] },
      { title: "Launch checklist", body: "Use the included go-live docs to connect credentials, domains, analytics, email, payments, and monitoring safely.", points: ["DNS and domains", "Pixels and events", "Credential storage", "Monitoring"] }
    ],
    faqs: defaultFaqs
  },
  "/about": {
    slug: "/about",
    title: "About | Digital360 by BrunerDigital",
    headline: "Built for teams who want growth systems, not more software sprawl.",
    subheadline:
      "BrunerDigital created Digital360 to help agencies and operators package, automate, measure, and scale the work that turns attention into revenue.",
    primaryCta: "Meet the platform",
    secondaryCta: "Contact team",
    bullets: ["Operator-first design", "Premium white-label positioning", "Implementation-ready assets", "AI-assisted workflows"],
    sections: [
      { title: "Our belief", body: "The best growth teams win by connecting operations, messaging, data, and customer experience into one system.", points: ["Clarity over complexity", "Automation with judgment", "Proof over promises", "Brand ownership"] },
      { title: "Who we serve", body: "Agencies, service businesses, franchises, consultants, and marketing teams that need a scalable operating layer.", points: ["Agencies", "Local service teams", "Multi-location brands", "Growth teams"] },
      { title: "How we help", body: "Digital360 by BrunerDigital gives teams the platform, copy, funnels, onboarding, and launch assets needed to go to market quickly.", points: ["Product suite", "Funnel templates", "Sales assets", "Launch checklists"] }
    ],
    faqs: defaultFaqs
  },
  "/contact": {
    slug: "/contact",
    title: "Contact | Digital360 by BrunerDigital",
    headline: "Let’s map your Digital360 launch.",
    subheadline:
      "Tell us about your team, offer, locations, client base, and launch goals. We’ll recommend the fastest path to a branded workspace and revenue-ready funnel.",
    primaryCta: "Request demo",
    secondaryCta: "Start trial",
    bullets: ["Implementation planning", "Agency and franchise fit review", "Pricing guidance", "Launch timeline"],
    sections: [
      { title: "What happens next", body: "A product strategist reviews your use case, recommends a launch plan, and helps map the first workspace.", points: ["Fit review", "Workflow map", "Launch plan", "Next steps"] },
      { title: "Best-fit conversations", body: "We are strongest with teams that need repeatable lead capture, automation, reporting, and white-label delivery.", points: ["Agency offers", "Location rollouts", "CRM migrations", "AI follow-up"] },
      { title: "Bring your questions", body: "Use the call to explore pricing, implementation, integrations, security, migration, and reseller packaging.", points: ["Pricing", "Security", "Integrations", "Migration"] }
    ],
    faqs: defaultFaqs
  },
  "/resources": {
    slug: "/resources",
    title: "Resources | Digital360 by BrunerDigital",
    headline: "Playbooks for building a modern growth operating system.",
    subheadline:
      "Use the resource library for strategy, funnels, automation, CRM migration, reputation growth, white-label packaging, and multi-location execution.",
    primaryCta: "Download launch guide",
    secondaryCta: "View blog topics",
    bullets: ["Blog library", "Lead magnets", "Webinar topics", "Case study templates"],
    sections: [
      { title: "Pillar guides", body: "Create searchable, sales-enabled guides around CRM consolidation, AI follow-up, white-label SaaS, reputation, and franchise growth.", points: ["CRM consolidation", "AI automation", "White-label agency", "Multi-location reporting"] },
      { title: "Content engine", body: "The included 90-day plan turns the positioning into LinkedIn, blog, video, webinar, and newsletter assets.", points: ["SEO clusters", "Social prompts", "Video hooks", "Newsletter cadence"] },
      { title: "Sales content", body: "Turn educational resources into funnel offers, nurture sequences, and sales conversation starters.", points: ["Lead magnets", "Audit offers", "Webinars", "Case studies"] }
    ],
    faqs: defaultFaqs
  },
  "/help": {
    slug: "/help",
    title: "Help Center | Digital360 by BrunerDigital",
    headline: "Help center foundation for admins, teams, clients, and partners.",
    subheadline:
      "A launch-ready support library structure for setup, CRM, automations, conversations, funnels, calendars, reputation, reporting, billing, security, and white-label controls.",
    primaryCta: "Browse setup guide",
    secondaryCta: "Contact support",
    bullets: ["Getting started", "Admin setup", "Feature guides", "Troubleshooting"],
    sections: [
      { title: "Launch guides", body: "Help users complete workspace setup, brand setup, import, integrations, team invites, plan selection, and first automation.", points: ["Workspace setup", "Brand setup", "Contact import", "Integrations"] },
      { title: "Feature education", body: "Short articles and videos explain each core module with workflows, examples, and best practices.", points: ["CRM", "Conversations", "Funnels", "Calendars"] },
      { title: "Operational support", body: "Support teams can expand the placeholders into production docs, SLAs, and knowledge base articles.", points: ["Known issues", "Release notes", "SLA policy", "Contact paths"] }
    ],
    faqs: defaultFaqs
  },
  "/comparison": {
    slug: "/comparison",
    title: "Comparison | Digital360 by BrunerDigital",
    headline: "Choose an operating system, not another disconnected point tool.",
    subheadline:
      "Digital360 positions against fragmented stacks by combining CRM, AI follow-up, funnels, calendars, reputation, reporting, billing, portals, and white-label delivery.",
    primaryCta: "Compare options",
    secondaryCta: "See platform tour",
    bullets: ["One integrated suite", "White-label controls", "AI-assisted workflows", "Reporting across clients and locations"],
    sections: [
      { title: "Against single-purpose CRMs", body: "Digital360 goes beyond contact management by connecting follow-up, scheduling, funnels, reputation, billing, and reporting.", points: ["More workflows", "Less tool switching", "Better attribution", "Client portals"] },
      { title: "Against marketing-only tools", body: "Campaigns are tied to pipeline, conversations, appointments, and revenue context.", points: ["Pipeline visibility", "Appointment outcomes", "CRM sync", "Reporting"] },
      { title: "Against custom stacks", body: "Teams get speed and consistency without stitching together a fragile system of separate subscriptions.", points: ["Lower operational drag", "Faster launch", "Unified data", "Reusable templates"] }
    ],
    faqs: defaultFaqs
  },
  "/use-cases": {
    slug: "/use-cases",
    title: "Use Cases | Digital360 by BrunerDigital",
    headline: "Built for agencies, service businesses, franchises, consultants, and growth teams.",
    subheadline:
      "Each team gets a focused launch path with relevant funnels, automations, reporting, onboarding, and sales assets.",
    primaryCta: "Find your use case",
    secondaryCta: "Book strategy demo",
    bullets: ["Agencies", "Local services", "Franchises", "Consultants and marketing teams"],
    sections: [
      { title: "Agencies", body: "Package Digital360 as a branded client platform, recurring offer, or operational backbone.", points: ["White-label resale", "Client reporting", "Template fulfillment", "Retention workflows"] },
      { title: "Local service businesses", body: "Capture more leads, follow up faster, book more jobs, request reviews, and track revenue.", points: ["Speed-to-lead", "Scheduling", "Review growth", "Pipeline reporting"] },
      { title: "Growth teams", body: "Centralize campaigns, source attribution, handoff workflows, and executive reporting.", points: ["Campaign dashboards", "Lead routing", "Sales handoff", "Attribution"] }
    ],
    faqs: defaultFaqs
  }
};

const solution = (slug: string, title: string, headline: string, audience: string): MarketingPage => ({
  slug,
  title: `${title} | Digital360 by BrunerDigital`,
  headline,
  subheadline: `A focused Digital360 launch path for ${audience}: CRM, follow-up, funnels, calendars, reputation, reporting, and onboarding assets in one premium workspace.`,
  primaryCta: "Launch this playbook",
  secondaryCta: "Book demo",
  bullets: ["Audience-specific funnel", "Prebuilt automation path", "Sales and onboarding copy", "Reporting model"],
  sections: [
    { title: "Conversion path", body: "Start with a dedicated landing page, proof section, qualification form, and nurture sequence for this audience.", points: ["Landing page", "Lead magnet", "Demo flow", "Retargeting copy"] },
    { title: "Operating workflow", body: "Route leads into CRM, trigger follow-up, book meetings, create opportunities, and report outcomes.", points: ["CRM stages", "AI follow-up", "Calendar routing", "Pipeline reporting"] },
    { title: "Scale system", body: "Use templates, checklists, and content assets to repeat the offer across segments, clients, or locations.", points: ["Templates", "Checklists", "Email sequences", "Sales collateral"] }
  ],
  faqs: defaultFaqs
});

export const landingPages: Record<string, MarketingPage> = {
  "/agency": solution("/agency", "Agency Landing Page", "Turn your agency into a branded SaaS platform.", "agencies and white-label resellers"),
  "/solutions/local-service-businesses": solution("/solutions/local-service-businesses", "Local Service Business Landing Page", "Convert more local leads without adding more admin.", "local service businesses"),
  "/solutions/franchises": marketingPages["/solutions/franchises"],
  "/solutions/consultants-coaches": solution("/solutions/consultants-coaches", "Consultant & Coach Landing Page", "Deliver a premium client operating system alongside your expertise.", "consultants, coaches, advisors, and implementation partners"),
  "/solutions/marketing-teams": solution("/solutions/marketing-teams", "Marketing Team Landing Page", "Unify campaigns, pipeline, follow-up, and proof in one workspace.", "in-house marketing and demand generation teams")
};

export const allPages = { ...marketingPages, ...landingPages };

export const pricingPlans = [
  {
    name: "Launch",
    price: "$299",
    note: "per month, annual option available",
    bestFor: "Single brand or first workspace",
    features: ["CRM and pipeline", "Conversations inbox", "Funnels and forms", "Calendars", "Starter automation", "Core reporting"]
  },
  {
    name: "Scale",
    price: "$799",
    note: "per month, usage and client workspaces extra",
    bestFor: "Agencies and multi-workspace teams",
    features: ["White-label controls", "Client portals", "Advanced automation", "Reputation workflows", "Billing", "Agency sales assets"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "implementation, security, and rollout support",
    bestFor: "Franchises, multi-location brands, and large teams",
    features: ["Location rollups", "Custom permissions", "Security review", "Dedicated onboarding", "Data migration", "Priority support"]
  }
];

export const funnelTemplates: FunnelTemplate[] = [
  {
    slug: "/funnels/saas-demo",
    title: "SaaS Demo Funnel",
    offer: "See how Digital360 replaces disconnected CRM, automation, calendar, inbox, and reporting tools.",
    audience: "SaaS buyers, operators, agency owners, and growth leaders",
    hook: "Book a strategic demo and leave with a recommended launch map.",
    sections: ["Problem", "Platform proof", "Product walkthrough", "Fit criteria", "Demo form", "Thank-you page", "Post-demo follow-up"],
    formFields: ["Name", "Work email", "Company", "Team size", "Current tools", "Primary goal"],
    followUp: ["Instant confirmation", "Pre-demo qualification email", "Reminder SMS", "Post-demo recap", "ROI and pricing email"]
  },
  {
    slug: "/funnels/agency-white-label",
    title: "Agency White-label Funnel",
    offer: "Package Digital360 as a premium branded client platform.",
    audience: "Marketing agencies, consultants, SaaS resellers",
    hook: "Apply to unlock the white-label agency launch kit.",
    sections: ["Agency pain", "Recurring revenue model", "Platform preview", "Partner fit", "Application form", "Calendar routing"],
    formFields: ["Agency name", "Website", "Monthly clients", "Services sold", "White-label goal"],
    followUp: ["Application received", "Case study email", "Offer packaging email", "Partner demo invite"]
  },
  {
    slug: "/funnels/local-business-lead-generation",
    title: "Local Business Lead Generation Funnel",
    offer: "Get a lead capture and follow-up system for local service demand.",
    audience: "Home services, clinics, local appointment businesses",
    hook: "Calculate how much revenue is leaking from slow follow-up.",
    sections: ["Lead leak calculator", "Speed-to-lead proof", "Offer details", "Calendar", "Local proof", "CTA"],
    formFields: ["Business type", "Monthly leads", "Response time", "Average sale", "Phone", "Email"],
    followUp: ["Audit report", "Speed-to-lead tips", "Demo invite", "Retargeting offer"]
  },
  {
    slug: "/funnels/webinar-registration",
    title: "Webinar Registration Funnel",
    offer: "Live training: build a white-label growth operating system.",
    audience: "Agencies, consultants, and operators",
    hook: "Register for the operating system rollout workshop.",
    sections: ["Outcome promise", "Agenda", "Speaker proof", "Registration form", "Reminder stack", "Replay path"],
    formFields: ["Name", "Email", "Company", "Role", "Biggest growth bottleneck"],
    followUp: ["Registration confirmation", "24-hour reminder", "1-hour reminder", "Replay", "Demo CTA"]
  },
  {
    slug: "/funnels/case-study",
    title: "Case Study Funnel",
    offer: "See how a growth team consolidates tools and increases booked appointments.",
    audience: "Evaluation-stage buyers",
    hook: "Read the implementation story and request the workflow map.",
    sections: ["Before state", "Implementation", "Results", "Workflow screenshots", "Download form"],
    formFields: ["Name", "Email", "Company", "Use case"],
    followUp: ["Case study PDF", "Related playbook", "Demo invite"]
  },
  {
    slug: "/funnels/free-audit",
    title: "Free Audit Funnel",
    offer: "Free growth system audit covering CRM, follow-up, funnels, reviews, and reporting.",
    audience: "High-intent prospects",
    hook: "Find the top three revenue leaks in your current stack.",
    sections: ["Audit promise", "Assessment categories", "Proof", "Qualification form", "Booking"],
    formFields: ["Website", "Current CRM", "Lead sources", "Monthly leads", "Main bottleneck"],
    followUp: ["Audit confirmation", "Prep questions", "Audit recap", "Implementation offer"]
  },
  {
    slug: "/funnels/crm-migration",
    title: "CRM Migration Funnel",
    offer: "Move from scattered tools to Digital360 with a guided migration plan.",
    audience: "Teams outgrowing their CRM",
    hook: "Get a migration plan before switching tools.",
    sections: ["Migration risk", "Data map", "Workflow rebuild", "Checklist", "Consultation form"],
    formFields: ["Current CRM", "Contact count", "Pipelines", "Automations", "Desired go-live date"],
    followUp: ["Migration checklist", "Data prep email", "Demo invite"]
  },
  {
    slug: "/funnels/ai-automation-offer",
    title: "AI Automation Offer Funnel",
    offer: "Launch AI-assisted lead follow-up and reactivation workflows.",
    audience: "Teams with missed leads or slow response times",
    hook: "Turn every lead inquiry into a guided next step.",
    sections: ["Missed lead pain", "AI workflow preview", "Guardrails", "Offer stack", "CTA"],
    formFields: ["Lead channels", "Response time", "Follow-up gaps", "Team size"],
    followUp: ["Automation examples", "ROI note", "Demo invite"]
  },
  {
    slug: "/funnels/reputation-management-offer",
    title: "Reputation Management Offer Funnel",
    offer: "Generate more reviews with automated request and response workflows.",
    audience: "Local services and multi-location brands",
    hook: "Turn recent customers into visible proof.",
    sections: ["Review gap", "Workflow preview", "Location reporting", "Proof", "CTA"],
    formFields: ["Locations", "Current rating", "Monthly customers", "Review process"],
    followUp: ["Review audit", "Workflow examples", "Implementation CTA"]
  },
  {
    slug: "/funnels/multi-location-growth-assessment",
    title: "Multi-location Growth Assessment Funnel",
    offer: "Assess lead routing, local execution, reviews, and reporting across locations.",
    audience: "Franchise and multi-location leadership",
    hook: "Find the operating gaps between corporate strategy and local revenue.",
    sections: ["Assessment", "Scorecard", "Rollup proof", "Consultation form"],
    formFields: ["Location count", "Markets", "Current systems", "Reporting gaps", "Growth priority"],
    followUp: ["Assessment summary", "Location rollout guide", "Executive demo invite"]
  },
  {
    slug: "/funnels/paid-ads",
    title: "Paid Ads Landing Page Template",
    offer: "High-converting paid traffic page connected to CRM and follow-up.",
    audience: "Cold and warm traffic",
    hook: "Clear offer, proof, objection handling, and a low-friction CTA.",
    sections: ["Specific outcome", "Pain and promise", "Offer", "Proof", "FAQ", "Form"],
    formFields: ["Name", "Email", "Phone", "Goal"],
    followUp: ["Instant SMS", "Email confirmation", "Retargeting sequence"]
  },
  {
    slug: "/funnels/lead-magnet",
    title: "Lead Magnet Landing Page Template",
    offer: "Downloadable guide, checklist, calculator, or template.",
    audience: "Top and middle funnel buyers",
    hook: "Give buyers a useful asset that naturally leads to a demo.",
    sections: ["Asset promise", "What is inside", "Who it is for", "Opt-in", "Next-step CTA"],
    formFields: ["Name", "Email", "Company", "Role"],
    followUp: ["Asset delivery", "Education email", "Case study", "Demo invite"]
  },
  {
    slug: "/waitlist",
    title: "Waitlist Page",
    offer: "Join the waitlist for early Digital360 access.",
    audience: "Early adopters and partners",
    hook: "Get priority onboarding and launch templates.",
    sections: ["Promise", "Who should join", "What early access includes", "Form"],
    formFields: ["Name", "Email", "Company", "Use case"],
    followUp: ["Welcome", "Roadmap note", "Invite when ready"]
  },
  {
    slug: "/early-access",
    title: "Early Access Page",
    offer: "Apply for early access to Digital360.",
    audience: "Qualified launch partners",
    hook: "Build your first branded workspace with guided setup.",
    sections: ["Early access offer", "Qualification", "What you get", "Application"],
    formFields: ["Company", "Use case", "Launch timeline", "Team size"],
    followUp: ["Application confirmation", "Fit review", "Access instructions"]
  },
  {
    slug: "/partner-program",
    title: "Partner Program Page",
    offer: "Become a Digital360 implementation, reseller, or referral partner.",
    audience: "Agencies, consultants, platform partners",
    hook: "Add a premium operating system to your client offer.",
    sections: ["Partner models", "Benefits", "Enablement", "Application"],
    formFields: ["Partner type", "Audience", "Existing clients", "Revenue goal"],
    followUp: ["Partner kit", "Discovery invite", "Enablement sequence"]
  }
];

export const flowSteps: FlowStep[] = [
  { slug: "/signup", title: "Free Trial Signup", headline: "Create your Digital360 trial.", body: "Start with a workspace, pick your primary use case, and unlock the launch checklist.", fields: ["Work email", "Name", "Company", "Password"], checklist: ["Create account", "Verify email", "Choose use case"], cta: "Create trial" },
  { slug: "/demo", title: "Book-a-demo Flow", headline: "Book a strategic platform demo.", body: "Tell us about your team so the demo can focus on the workflow that matters.", fields: ["Name", "Work email", "Company", "Team type", "Current stack", "Preferred date"], checklist: ["Confirm fit", "Route to strategist", "Send prep email"], cta: "Book demo" },
  { slug: "/application", title: "Agency Application Flow", headline: "Apply for white-label agency access.", body: "Share your client model, services, and launch goals so we can recommend the right partner path.", fields: ["Agency name", "Website", "Client count", "Services", "Revenue goal"], checklist: ["Review application", "Score fit", "Invite to partner demo"], cta: "Submit application" },
  { slug: "/onboarding", title: "Onboarding Questionnaire", headline: "Map your launch plan.", body: "Capture business model, audience, tools, data, workflows, and first campaign goals.", fields: ["Business model", "Ideal customer", "Current tools", "Launch goal", "Timeline"], checklist: ["Define ICP", "Map workflow", "Assign launch owner"], cta: "Save launch plan" },
  { slug: "/setup/account", title: "Account Creation", headline: "Secure your account.", body: "Create identity, verify email, set password rules, and prepare admin access.", fields: ["Name", "Email", "Password", "Role"], checklist: ["Password saved", "Email verified", "Admin role assigned"], cta: "Continue" },
  { slug: "/setup/workspace", title: "Workspace Setup", headline: "Set up your first workspace.", body: "Name the workspace, choose industry, select primary revenue workflow, and set timezone.", fields: ["Workspace name", "Industry", "Timezone", "Primary workflow"], checklist: ["Workspace created", "Default pipeline added", "Sample dashboard ready"], cta: "Create workspace" },
  { slug: "/setup/brand", title: "Brand Setup", headline: "Make the platform yours.", body: "Add logo, colors, domain, email identity, portal copy, and white-label defaults.", fields: ["Brand name", "Logo URL", "Primary color", "Custom domain", "Support email"], checklist: ["Logo uploaded", "Colors saved", "Domain pending"], cta: "Save brand" },
  { slug: "/setup/import-contacts", title: "Import Contacts", headline: "Bring your relationships into Digital360.", body: "Upload contacts, map fields, dedupe records, and tag sources.", fields: ["CSV upload", "Source", "Lifecycle stage", "Owner"], checklist: ["Map fields", "Preview rows", "Confirm import"], cta: "Import contacts" },
  { slug: "/setup/integrations", title: "Connect Integrations", headline: "Connect the systems that power launch.", body: "Prepare calendar, email, payments, analytics, ads, webhooks, and domain credentials.", fields: ["Calendar", "Email", "Payment provider", "Analytics ID", "Webhook URL"], checklist: ["Calendar connected", "Email configured", "Tracking planned"], cta: "Connect tools" },
  { slug: "/setup/plan", title: "Choose Plan", headline: "Choose the plan for your rollout.", body: "Select launch, scale, or enterprise based on workspaces, locations, and support needs.", fields: ["Plan", "Billing cycle", "Seats", "Workspaces"], checklist: ["Plan selected", "Billing contact saved", "Invoice previewed"], cta: "Choose plan" },
  { slug: "/setup/team", title: "Invite Team Members", headline: "Invite the people who will run growth.", body: "Add admins, sales reps, marketers, support users, client users, and location managers.", fields: ["Email", "Role", "Workspace", "Location"], checklist: ["Roles selected", "Invites sent", "Permissions reviewed"], cta: "Send invites" },
  { slug: "/setup/automation", title: "First Automation Setup", headline: "Launch your first follow-up workflow.", body: "Start with speed-to-lead, demo reminders, no-show recovery, review requests, or reactivation.", fields: ["Trigger", "Audience", "Message", "Delay", "Owner"], checklist: ["Trigger selected", "Message reviewed", "Human handoff set"], cta: "Activate automation" },
  { slug: "/setup/campaign", title: "First Campaign Setup", headline: "Create your first connected campaign.", body: "Pick an offer, build the landing path, connect follow-up, and track results.", fields: ["Campaign name", "Audience", "Offer", "Landing page", "Source"], checklist: ["Offer selected", "Landing page connected", "Tracking enabled"], cta: "Launch campaign" },
  { slug: "/demo/thank-you", title: "Demo Thank-you", headline: "Your demo is booked.", body: "We’ll send the calendar invite, prep questions, and a short platform preview before the call.", fields: ["Calendar details"], checklist: ["Invite sent", "Prep email queued", "Reminder SMS scheduled"], cta: "View prep guide" },
  { slug: "/signup/thank-you", title: "Trial Thank-you", headline: "Your trial workspace is ready.", body: "Start setup now or use the checklist to launch your first CRM, automation, and funnel workflow.", fields: ["Workspace"], checklist: ["Account created", "Checklist unlocked", "Demo data available"], cta: "Enter workspace" },
  { slug: "/recovery/abandoned-signup", title: "Abandoned Signup Recovery", headline: "Your Digital360 setup is still waiting.", body: "Pick up where you left off and complete your workspace in a few minutes.", fields: ["Email"], checklist: ["Restore session", "Resume setup", "Send help link"], cta: "Resume setup" },
  { slug: "/upgrade", title: "Upgrade Paywall", headline: "Unlock the operating layer your team is ready for.", body: "Upgrade to white-label, advanced automation, client portals, reputation, billing, and multi-location reporting.", fields: ["Plan", "Seats", "Billing email"], checklist: ["Compare limits", "Select plan", "Activate features"], cta: "Upgrade now" },
  { slug: "/cancel", title: "Cancellation Feedback", headline: "Before you go, help us understand what changed.", body: "Collect structured feedback, save opportunities, pause options, and handoff to customer success.", fields: ["Reason", "Missing feature", "Budget", "Can we contact you?"], checklist: ["Capture reason", "Offer pause", "Notify success"], cta: "Submit feedback" }
];

export const copyLibrary = {
  headlines: [
    "Run your entire growth engine from one white-label AI business suite.",
    "Launch a premium client platform without building software from scratch.",
    "Replace disconnected CRM, inbox, calendar, funnel, and reporting tools.",
    "Turn every lead into a guided follow-up workflow.",
    "Give every location one system for leads, reviews, campaigns, and reporting."
  ],
  subheadlines: [
    "Digital360 centralizes the revenue workflows agencies and operators need to capture demand, convert faster, and prove ROI.",
    "A premium operating system for CRM, AI follow-up, funnels, scheduling, reputation, analytics, billing, portals, and white-label delivery.",
    "Build the system once, package it under your brand, and roll it out across clients, teams, or locations."
  ],
  ctas: ["Start free trial", "Book a demo", "Apply for agency access", "Get launch checklist", "See platform tour", "Upgrade workspace"],
  objections: [
    ["We already have a CRM", "Digital360 connects CRM to follow-up, scheduling, funnels, reviews, billing, and reporting so the team operates from one workflow."],
    ["Migration sounds risky", "Start with a guided migration plan, import checklist, field map, and phased rollout before switching critical workflows."],
    ["Our team will not use another tool", "The platform reduces tool switching and gives each role a focused workspace, not a generic dashboard."],
    ["We need white-label control", "Brand, domain, client portals, workspaces, outbound identity, and sales assets are designed for white-label delivery."]
  ],
  adHooks: [
    "Your CRM is not the problem. The gaps around it are.",
    "Most agencies sell campaigns. Better agencies sell operating systems.",
    "How many leads went cold before your team replied?",
    "One platform for every location, lead, review, and report.",
    "Stop duct-taping your growth stack together."
  ],
  emailSubjects: [
    "Your Digital360 launch checklist",
    "A faster way to follow up with every lead",
    "What to prepare before your demo",
    "Your trial workspace is almost live",
    "How agencies package Digital360 as a recurring offer",
    "3 workflows to activate before your trial ends"
  ],
  sms: [
    "Digital360 here: your launch checklist is ready. Want the setup link?",
    "Reminder: your Digital360 demo is coming up. Bring your current CRM and follow-up questions.",
    "Your trial workspace is ready. Finish setup here: [link]"
  ]
};

export const contentSystem = {
  calendar: [
    "Week 1: Founder POV on tool sprawl, launch announcement, CRM consolidation checklist.",
    "Week 2: Speed-to-lead education, AI follow-up examples, local business audit offer.",
    "Week 3: Agency white-label packaging, reseller pricing, client reporting proof.",
    "Week 4: Franchise visibility, location scorecards, reputation workflow guide.",
    "Week 5: Funnel templates, paid ads page teardown, demo funnel promotion.",
    "Week 6: CRM migration, data prep checklist, implementation webinar.",
    "Week 7: AI automation guardrails, human handoff, compliance-friendly messaging.",
    "Week 8: Reputation campaign playbook, review request scripts, location reporting.",
    "Week 9: Billing and portals, customer onboarding, retention reporting.",
    "Week 10: Comparison content, stack cost calculator, objection handling.",
    "Week 11: Customer story framework, partner spotlight, case study funnel.",
    "Week 12: Launch recap, webinar replay, early access and partner program push."
  ],
  keywordClusters: [
    "white label CRM software",
    "AI lead follow up automation",
    "agency client portal software",
    "multi location marketing platform",
    "reputation management automation",
    "CRM migration checklist",
    "sales pipeline automation for service businesses",
    "franchise marketing reporting"
  ],
  blogTopics: [
    "How to build a white-label SaaS offer without writing software",
    "The hidden cost of disconnected CRM and marketing tools",
    "A practical speed-to-lead automation playbook",
    "How franchises can measure local marketing performance",
    "CRM migration checklist for growth teams",
    "How to package reputation management as a recurring service",
    "AI messaging guardrails for service businesses",
    "The agency guide to client reporting that reduces churn"
  ],
  webinarTopics: [
    "Build your white-label growth operating system in 30 days",
    "From missed leads to booked appointments with AI follow-up",
    "The multi-location reporting model every operator needs",
    "How agencies can turn CRM, funnels, and automations into recurring revenue"
  ],
  leadMagnets: [
    "Growth Operating System Audit",
    "White-label Agency Offer Calculator",
    "CRM Migration Checklist",
    "Speed-to-Lead ROI Calculator",
    "Reputation Campaign Swipe File",
    "Multi-location Growth Scorecard"
  ]
};

export const emailSequences = [
  {
    name: "New Trial Signup",
    emails: [
      ["Welcome to Digital360", "Your workspace is ready. Start with brand setup, contact import, and first automation."],
      ["Activate your first revenue workflow", "Pick speed-to-lead, demo reminders, review requests, or reactivation."],
      ["Your launch checklist", "Use this checklist to connect CRM, calendar, funnel, reporting, and team invites."]
    ]
  },
  {
    name: "Demo Booked",
    emails: [
      ["Your Digital360 demo is confirmed", "Bring your current tools, growth bottleneck, and launch goals."],
      ["Before we meet", "Here are the workflows we can map: CRM, AI follow-up, white-label, franchise reporting, or migration."],
      ["Demo reminder", "We’ll focus on a launch plan, not a generic software tour."]
    ]
  },
  {
    name: "Demo No-show",
    emails: [
      ["Still want to map your growth system?", "No worries. Choose a new time and we’ll tailor the walkthrough."],
      ["What you missed", "The demo covers workflow mapping, implementation timeline, pricing, and launch assets."],
      ["Last call to reschedule", "If now is not the right time, keep the launch checklist for later."]
    ]
  },
  {
    name: "Post-demo Follow-up",
    emails: [
      ["Your Digital360 rollout summary", "Here is the recommended plan based on your team, tools, and goals."],
      ["Pricing and implementation options", "Choose launch, scale, or enterprise support based on rollout complexity."],
      ["Next step: workspace mapping", "We can set up the first pipeline, automation, funnel, and reporting view."]
    ]
  },
  {
    name: "Agency Partner Nurture",
    emails: [
      ["Package Digital360 as a recurring offer", "Position the platform as the operating layer behind your services."],
      ["White-label sales assets", "Use the demo deck, proposal, one-pager, and funnel templates."],
      ["Client onboarding playbook", "Standardize setup across CRM, automation, reviews, reporting, and portals."]
    ]
  }
];

export const adSystem = {
  metaConcepts: [
    "Split-screen tool sprawl versus Digital360 command center.",
    "Agency owner showing branded client portal and recurring revenue offer.",
    "Local business lead response timer before and after AI follow-up.",
    "Franchise executive viewing location performance rollup."
  ],
  googleSearchAds: [
    ["White Label CRM Platform", "Launch a premium branded business suite with CRM, AI follow-up, funnels, reviews, and reporting."],
    ["AI Lead Follow Up Software", "Respond faster, book more appointments, and automate customer follow-up from one workspace."],
    ["Multi Location Marketing Platform", "Unify leads, reviews, campaigns, and reporting across every location."]
  ],
  linkedInAds: [
    "Your growth stack should feel like an operating system, not a pile of subscriptions.",
    "For agencies ready to sell a premium branded client platform.",
    "For franchise teams that need location-level execution and executive visibility."
  ],
  videoScripts: [
    "Hook: Your CRM is only one piece of the revenue system. Show disconnected tabs, then Digital360 dashboard. CTA: book a demo.",
    "Hook: Agencies do not need another service to fulfill. They need a platform clients can log into. CTA: apply for white-label access.",
    "Hook: Every minute after a lead submits a form lowers conversion. Show AI follow-up and booking. CTA: start trial."
  ],
  campaignStructure: [
    "EO_Launch_Meta_Prospecting_Agency_US_Q2",
    "EO_Launch_Google_Search_WhiteLabelCRM_US_Q2",
    "EO_Launch_LinkedIn_FranchiseOps_US_Q2",
    "EO_Retargeting_DemoVisitors_30D_Q2"
  ]
};

export const salesEnablement = {
  deckOutline: ["Market problem", "Cost of tool sprawl", "Digital360 platform", "Use cases", "Product tour", "ROI model", "Pricing", "Implementation plan", "Next steps"],
  discoveryQuestions: [
    "What tools currently manage leads, follow-up, scheduling, reviews, and reporting?",
    "Where do leads most often leak or stall?",
    "How many teams, clients, brands, or locations need access?",
    "What would make this rollout successful in the first 90 days?",
    "Do you need white-label, client portal, or reseller packaging?"
  ],
  objections: copyLibrary.objections,
  proposalSections: ["Executive summary", "Goals", "Recommended plan", "Implementation timeline", "Pricing", "Success metrics", "Terms", "Acceptance"],
  roiCalculator: ["Monthly lead volume", "Current response rate", "Current close rate", "Average sale", "Expected speed-to-lead lift", "Review conversion lift", "Retained client value"]
};

export const visualLibrary = [
  "Hero dashboard preview with pipeline, inbox, AI assistant, and revenue chart.",
  "CRM contact timeline with source, conversations, appointments, notes, and opportunities.",
  "Automation builder with trigger, AI draft, wait step, condition, and human handoff.",
  "Unified inbox with SMS, email, web form, assignment, sentiment, and AI suggested reply.",
  "Reporting dashboard with booked appointments, source attribution, reviews, and pipeline value.",
  "Mobile preview for lead reply, appointment reminder, review request, and pipeline alert.",
  "Social carousel template: problem, cost, workflow, proof, CTA.",
  "Lead magnet cover template: dark gradient, product UI crop, large guide title.",
  "Webinar slide cover: executive dark background, crisp headline, product mockup rail.",
  "Icon set: CRM, automation, inbox, funnels, calendar, reputation, reporting, billing, portal, white-label, security, integrations."
];

export const launchChecklists = {
  marketing: ["Finalize ICP", "Approve positioning", "Publish core pages", "Connect demo CTA", "Load retargeting audiences"],
  website: ["Run build", "Check mobile", "Set metadata", "Publish sitemap", "Add legal placeholders", "QA forms"],
  seo: ["Map keywords", "Write titles and descriptions", "Add internal links", "Create pillar pages", "Submit sitemap"],
  analytics: ["Install analytics", "Define events", "Capture UTMs", "Add pixels", "Verify conversions"],
  crm: ["Create pipeline", "Map forms", "Create lead sources", "Assign owners", "Test routing"],
  ads: ["Approve audiences", "Load creative", "Set naming", "Define budget", "Launch retargeting"],
  email: ["Load sequences", "Test personalization", "Set suppression", "Connect domains", "QA deliverability"],
  sales: ["Finalize deck", "Train discovery script", "Load proposal", "Set pricing rules", "Prepare demo workspace"],
  onboarding: ["Finalize checklist", "Prepare migration guide", "Create workspace template", "Assign CSM", "Test welcome emails"]
};


