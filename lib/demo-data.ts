import {
  Activity,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  Flag,
  Globe2,
  Inbox,
  LayoutDashboard,
  Megaphone,
  PanelTop,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Workflow
} from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/launch", label: "Launch Center", icon: Rocket },
  { href: "/crm/contacts", label: "Contacts", icon: Users },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/deals", label: "Deals", icon: BriefcaseBusiness },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/conversations", label: "Conversations", icon: Inbox },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/automations", label: "Automations", icon: Workflow },
  { href: "/funnels", label: "Funnels", icon: PanelTop },
  { href: "/forms", label: "Forms", icon: FileText },
  { href: "/reputation", label: "Reviews", icon: Star },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/reporting", label: "Reporting", icon: BarChart3 },
  { href: "/ai", label: "AI Command", icon: Bot },
  { href: "/portal", label: "Client Portal", icon: Globe2 },
  { href: "/agency", label: "Agency Admin", icon: ShieldCheck },
  { href: "/white-label", label: "White Label", icon: Flag },
  { href: "/team", label: "Team", icon: Users },
  { href: "/integrations", label: "Integrations", icon: Activity },
  { href: "/billing", label: "Settings", icon: Settings },
  { href: "/help", label: "Docs", icon: Sparkles }
];

export const kpis = [
  { label: "Revenue", value: "$284K", change: "+18.4%", tone: "success" },
  { label: "Pipeline", value: "$1.42M", change: "+9 deals", tone: "default" },
  { label: "Appointments", value: "312", change: "42 today", tone: "warning" },
  { label: "Lead score", value: "84", change: "+11 pts", tone: "success" }
] as const;

export const contacts = [
  {
    name: "Maya Thompson",
    company: "Northfield Dental Group",
    email: "maya@northfield.example",
    phone: "(415) 555-0194",
    status: "Hot lead",
    score: 92,
    value: 48000,
    tags: ["Healthcare", "Multi-location", "Ads"],
    summary:
      "Decision-maker evaluating patient reactivation, reputation management, and missed-call text back for five offices.",
    nextStep: "Send AI-personalized proposal and invite finance lead to Wednesday demo."
  },
  {
    name: "Jon Bell",
    company: "Bell & Knox Legal",
    email: "jon@bellknox.example",
    phone: "(212) 555-0160",
    status: "Nurture",
    score: 71,
    value: 26000,
    tags: ["Legal", "SEO", "Reviews"],
    summary: "Interested in review routing and intake automation, but budget approval is pending.",
    nextStep: "Share review response examples and ROI forecast."
  },
  {
    name: "Priya Shah",
    company: "Atlas MedSpa",
    email: "priya@atlasmedspa.example",
    phone: "(602) 555-0138",
    status: "Customer",
    score: 88,
    value: 72000,
    tags: ["Beauty", "Subscriptions", "Calendar"],
    summary: "Client portal power user. Expansion opportunity for memberships and abandoned booking flows.",
    nextStep: "Pitch subscription billing pilot."
  }
];

export const pipeline = [
  {
    stage: "New",
    deals: [
      { name: "Northfield growth suite", owner: "Ari", value: 48000, score: 92 },
      { name: "Summit Roofing forms", owner: "Elle", value: 18500, score: 76 }
    ]
  },
  {
    stage: "Qualified",
    deals: [
      { name: "Bell & Knox intake", owner: "Sam", value: 26000, score: 71 },
      { name: "Lumen Fitness launch", owner: "Ari", value: 34000, score: 83 }
    ]
  },
  {
    stage: "Proposal",
    deals: [
      { name: "Atlas MedSpa expansion", owner: "Mira", value: 72000, score: 88 },
      { name: "Evergreen HVAC reviews", owner: "Sam", value: 22000, score: 64 }
    ]
  },
  {
    stage: "Won",
    deals: [{ name: "Cobalt Wealth portal", owner: "Elle", value: 96000, score: 95 }]
  }
];

export const conversations = [
  {
    channel: "SMS",
    name: "Maya Thompson",
    message: "Can you show how the missed-call workflow hands off to our front desk?",
    sentiment: "Positive",
    suggestion: "Absolutely. I can walk through the handoff logic and customize the notification path for each office."
  },
  {
    channel: "Email",
    name: "Jon Bell",
    message: "Do you support importing historical review data?",
    sentiment: "Neutral",
    suggestion: "Yes. We can import historical review exports and map them by practice area for reporting."
  },
  {
    channel: "Social",
    name: "Atlas MedSpa",
    message: "New lead from Instagram booking form.",
    sentiment: "High intent",
    suggestion: "Prioritize within 15 minutes and offer the consultation package mentioned in the ad."
  }
];

export const campaigns = [
  { name: "Spring reactivation", audience: "Dormant patients", status: "Draft", openRate: "42%", revenue: "$18.4K" },
  { name: "Review recovery", audience: "Recent appointments", status: "Active", openRate: "58%", revenue: "$9.7K" },
  { name: "Webinar follow-up", audience: "Agency leads", status: "Scheduled", openRate: "31%", revenue: "$0" }
];

export const workflows = [
  { name: "Missed call text back", trigger: "Call missed", steps: 7, lift: "+24% booked calls" },
  { name: "New lead speed-to-contact", trigger: "Form submitted", steps: 9, lift: "+18% conversion" },
  { name: "Review request sequence", trigger: "Appointment completed", steps: 6, lift: "+37 reviews/mo" }
];

export const reviews = [
  { source: "Google", company: "Northfield Dental", rating: 5, text: "Fast appointment reminders and helpful staff." },
  { source: "Facebook", company: "Atlas MedSpa", rating: 4, text: "Great experience, booking was easy." },
  { source: "Google", company: "Evergreen HVAC", rating: 2, text: "Technician arrived later than expected." }
];

export const chartData = [
  { name: "Mon", leads: 64, revenue: 32, appointments: 26 },
  { name: "Tue", leads: 78, revenue: 45, appointments: 31 },
  { name: "Wed", leads: 91, revenue: 57, appointments: 43 },
  { name: "Thu", leads: 84, revenue: 62, appointments: 39 },
  { name: "Fri", leads: 112, revenue: 76, appointments: 52 },
  { name: "Sat", leads: 73, revenue: 50, appointments: 28 },
  { name: "Sun", leads: 69, revenue: 47, appointments: 24 }
];

export const integrations = [
  "Stripe",
  "Twilio",
  "SendGrid",
  "Mailgun",
  "Google Calendar",
  "Meta",
  "Google Business Profile",
  "OpenAI",
  "Supabase"
];

export type ModuleConfig = {
  title: string;
  description: string;
  primaryAction: string;
  stats: string[];
  items: string[];
  ai: string;
};

export const modules: Record<string, ModuleConfig> = {
  companies: {
    title: "Companies",
    description: "Track accounts, locations, relationships, custom fields, and expansion potential.",
    primaryAction: "New company",
    stats: ["128 accounts", "$3.8M managed ARR", "31 expansion signals"],
    items: ["Northfield Dental Group", "Atlas MedSpa", "Bell & Knox Legal", "Evergreen HVAC"],
    ai: "AI found 12 accounts with high review volume and no reputation automation enabled."
  },
  calendar: {
    title: "Calendar",
    description: "Manage appointment scheduling, round-robin routing, reminders, and booking pipelines.",
    primaryAction: "Create booking page",
    stats: ["312 appointments", "91% show rate", "42 today"],
    items: ["Northfield demo", "Atlas billing review", "Agency onboarding", "Roofing estimate consult"],
    ai: "AI recommends adding a confirmation SMS two hours before consultations with high no-show risk."
  },
  campaigns: {
    title: "Campaigns",
    description: "Build email campaigns with AI copy, segmentation, scheduling, and performance tracking.",
    primaryAction: "Generate campaign",
    stats: ["3 active", "48% avg open", "$28.1K attributed"],
    items: campaigns.map((campaign) => `${campaign.name} - ${campaign.status}`),
    ai: "AI copy generator drafted a subject line variant predicted to lift opens by 8%."
  },
  automations: {
    title: "Automation workflows",
    description: "Design trigger-based workflows for lead capture, messaging, tasks, invoices, and reviews.",
    primaryAction: "New workflow",
    stats: ["24 workflows", "9.2K runs", "98.7% success"],
    items: workflows.map((workflow) => `${workflow.name} - ${workflow.steps} steps`),
    ai: "Workflow recommendation: branch hot leads above score 85 into sales-call priority routing."
  },
  funnels: {
    title: "Funnels and pages",
    description: "Foundation for landing pages, funnels, page sections, copy helpers, and conversion metrics.",
    primaryAction: "Create page",
    stats: ["18 pages", "7 funnels", "11.8% conversion"],
    items: ["Dental implant landing page", "MedSpa membership funnel", "Legal intake page", "Roofing storm-damage form"],
    ai: "AI page helper suggests replacing generic CTA copy with location-specific urgency language."
  },
  forms: {
    title: "Forms",
    description: "Capture leads with embeddable forms, custom fields, conditional routing, and attribution.",
    primaryAction: "Build form",
    stats: ["42 forms", "1.9K submissions", "24% qualified"],
    items: ["New patient inquiry", "Legal consultation", "Membership waitlist", "Storm damage inspection"],
    ai: "AI detected high drop-off on phone number fields and recommends progressive profiling."
  },
  reputation: {
    title: "Reputation",
    description: "Monitor reviews, route feedback, generate responses, and measure location-level sentiment.",
    primaryAction: "Generate responses",
    stats: ["4.7 avg rating", "312 reviews", "21 need reply"],
    items: reviews.map((review) => `${review.source}: ${review.company} - ${review.rating} stars`),
    ai: "AI review response generator prepared empathetic drafts for two low-rating reviews."
  },
  payments: {
    title: "Payments and invoices",
    description: "Products, subscriptions, invoices, payment status, and Stripe-ready billing placeholders.",
    primaryAction: "Create invoice",
    stats: ["$84K MRR", "18 overdue", "92 subscriptions"],
    items: ["Agency platform license", "Ads management retainer", "Reputation add-on", "Calendar automation setup"],
    ai: "AI flags four invoices with high churn risk and suggests a concierge follow-up."
  },
  reporting: {
    title: "Reporting",
    description: "Executive dashboards, attribution reporting, KPI cards, campaign ROI, and AI insights.",
    primaryAction: "Export report",
    stats: ["21 dashboards", "8 client reports", "+18% MoM revenue"],
    items: ["Agency executive scorecard", "Northfield patient growth", "Atlas membership launch", "Pipeline source report"],
    ai: "AI dashboard insights connect faster SMS response time to a 14% improvement in booked appointments."
  },
  ai: {
    title: "AI command center",
    description: "Centralize lead scoring, summaries, reply suggestions, sales coaching, task priority, and copy generation.",
    primaryAction: "Run AI audit",
    stats: ["2.4K assists", "183 hot leads", "11 workflows suggested"],
    items: ["Contact summary", "Lead score", "Reply suggestion", "Campaign copy", "Review response", "Task priority"],
    ai: "AI recommends focusing today on 17 leads with score above 80 and no owner response in 30 minutes."
  },
  portal: {
    title: "Client portal",
    description: "Client-facing workspace for reports, invoices, tasks, conversations, approvals, and documentation.",
    primaryAction: "Preview portal",
    stats: ["36 client users", "14 approvals", "8 shared reports"],
    items: ["Report center", "Invoice history", "Asset approvals", "Support requests"],
    ai: "AI summarizes client-visible wins for this month and hides internal agency notes."
  },
  agency: {
    title: "Agency admin",
    description: "Operate tenants, workspaces, plans, support access, usage limits, and white-label defaults.",
    primaryAction: "Create tenant",
    stats: ["18 tenants", "42 workspaces", "99.96% uptime"],
    items: ["Tenant provisioning", "Plan limits", "Support impersonation", "Usage metering"],
    ai: "AI found three tenants approaching SMS usage limits and drafted upgrade prompts."
  },
  "white-label": {
    title: "White-label settings",
    description: "Configure agency branding, logo placeholders, theme tokens, domains, and email sender identity.",
    primaryAction: "Save brand",
    stats: ["3 domains", "2 themes", "7 sender profiles"],
    items: ["Logo upload placeholder", "Custom domain", "Theme controls", "Email identity", "Portal branding"],
    ai: "AI brand assistant recommends improving contrast for the client portal accent color."
  },
  team: {
    title: "Team and permissions",
    description: "Manage users, roles, RBAC policies, invitations, workspace access, and audit logs.",
    primaryAction: "Invite user",
    stats: ["52 users", "8 roles", "1.2K audit events"],
    items: ["Agency owner", "Sales manager", "Client admin", "Support analyst", "Billing viewer"],
    ai: "AI identified two users with broad permissions who have not logged in for 90 days."
  },
  integrations: {
    title: "Integrations",
    description: "Mock integration cards and connection structure for revenue, messaging, calendar, social, reviews, and AI.",
    primaryAction: "Connect app",
    stats: ["8 ready", "3 connected", "5 mocked"],
    items: integrations,
    ai: "AI recommends connecting Google Calendar before enabling round-robin appointment assignment."
  },
  billing: {
    title: "Billing and settings",
    description: "Subscription settings, agency plan, invoices, usage, platform preferences, notifications, and audit logs.",
    primaryAction: "Update plan",
    stats: ["Scale plan", "$1,499/mo", "82% SMS quota"],
    items: ["Subscription", "Usage", "Notifications", "Security", "Audit logs", "API keys"],
    ai: "AI forecasts SMS usage will exceed quota in nine days at the current campaign pace."
  },
  help: {
    title: "Help and documentation",
    description: "In-product guide for setup, architecture, modules, integrations, deployment, and go-live operations.",
    primaryAction: "Open guide",
    stats: ["14 docs", "6 checklists", "8 integration guides"],
    items: ["Architecture", "Supabase setup", "Vercel deployment", "Component library", "Go-live checklist"],
    ai: "AI support assistant can draft setup instructions tailored to each tenant's enabled modules."
  }
};
