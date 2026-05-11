export type GTMLane = {
  slug: string;
  name: string;
  audience: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  metrics: Array<{ value: string; label: string }>;
  painPoints: string[];
  offerStack: Array<{ title: string; body: string }>;
  funnel: {
    offer: string;
    conversionGoal: string;
    sections: string[];
    fields: string[];
    qualification: string[];
    thankYouPath: string;
  };
  nurture: Array<{ day: string; subject: string; body: string }>;
  ads: Array<{ channel: string; hook: string; copy: string }>;
  salesScript: string[];
};

export const gtmLanes: GTMLane[] = [
  {
    slug: "/gtm/agencies",
    name: "Agency White-label Funnel",
    audience: "Marketing agencies, consultants, and SaaS resellers",
    headline: "Turn your agency into a premium white-label SaaS platform.",
    subheadline:
      "Package EnterpriseOS under your brand so clients see a modern operating system for leads, follow-up, reviews, reporting, billing, portals, and campaign proof.",
    primaryCta: "Apply for agency access",
    secondaryCta: "View partner kit",
    metrics: [
      { value: "14 days", label: "to first branded workspace" },
      { value: "3 offers", label: "starter packages to sell" },
      { value: "1 portal", label: "for client proof and retention" }
    ],
    painPoints: [
      "Clients churn because campaign value is hard to see.",
      "Fulfillment lives across too many tools and spreadsheets.",
      "The agency sells services when it could sell a sticky platform.",
      "Reporting, onboarding, and follow-up are rebuilt for every account."
    ],
    offerStack: [
      { title: "White-label platform setup", body: "Custom brand, workspace templates, portal framing, domain checklist, and reseller positioning." },
      { title: "Client acquisition funnel", body: "Dedicated application page, agency pitch copy, demo flow, partner nurture, and retargeting copy." },
      { title: "Recurring revenue packaging", body: "Starter, growth, and scale package outlines with proof dashboards and renewal prompts." },
      { title: "Fulfillment operating system", body: "CRM, AI follow-up, funnels, calendars, reputation, reporting, billing, and client portal workflows." }
    ],
    funnel: {
      offer: "Apply for the white-label agency launch kit.",
      conversionGoal: "Qualified agency application and partner demo booking.",
      sections: ["Agency pain", "Platformized offer", "Client portal proof", "Revenue packages", "Partner application", "Demo booking"],
      fields: ["Agency name", "Website", "Monthly clients", "Primary services", "White-label goal", "Launch timeline"],
      qualification: ["Has active clients", "Sells marketing, CRM, automation, or consulting", "Wants recurring SaaS/service packaging"],
      thankYouPath: "/demo/thank-you"
    },
    nurture: [
      { day: "Day 0", subject: "Your white-label agency launch kit", body: "Deliver partner positioning, package examples, and the demo booking CTA." },
      { day: "Day 2", subject: "How agencies turn service delivery into a platform", body: "Explain portal value, reporting proof, and recurring package expansion." },
      { day: "Day 5", subject: "The first client workspace to launch", body: "Show a practical CRM, automation, review, and reporting rollout." }
    ],
    ads: [
      { channel: "LinkedIn", hook: "Agencies do not need another service to fulfill.", copy: "Sell a branded operating system clients can log into, value, and expand." },
      { channel: "Meta", hook: "Turn campaigns into a client platform.", copy: "White-label CRM, automations, funnels, reviews, and reporting under your agency brand." },
      { channel: "Search", hook: "White label CRM for agencies", copy: "Launch a premium client portal and recurring SaaS-enabled offer with EnterpriseOS." }
    ],
    salesScript: [
      "Open with the cost of service-only delivery and invisible value.",
      "Show the branded client portal and proof dashboard.",
      "Map the first three packages the agency can sell.",
      "Close on first workspace setup and partner demo."
    ]
  },
  {
    slug: "/gtm/local-services",
    name: "Local Service Growth Funnel",
    audience: "Home services, clinics, appointment businesses, and local operators",
    headline: "Convert more local leads before they go cold.",
    subheadline:
      "EnterpriseOS gives local service teams one system for lead capture, speed-to-lead follow-up, booking, pipeline tracking, reviews, and revenue reporting.",
    primaryCta: "Get free lead leak audit",
    secondaryCta: "See local workflow",
    metrics: [
      { value: "<5 min", label: "target first response" },
      { value: "24/7", label: "automated lead follow-up" },
      { value: "4.8+", label: "review growth target" }
    ],
    painPoints: [
      "Form fills and missed calls do not get fast enough follow-up.",
      "Appointments, estimates, reviews, and sales notes live in disconnected tools.",
      "Owners cannot see which campaigns create booked jobs.",
      "Past leads and customers are not being reactivated."
    ],
    offerStack: [
      { title: "Lead leak audit", body: "Assess response time, lead sources, booking friction, pipeline gaps, and review process." },
      { title: "Speed-to-lead system", body: "Instant SMS/email, AI-assisted replies, missed call text-back, task alerts, and appointment routing." },
      { title: "Booking and review engine", body: "Calendar scheduling, reminders, no-show recovery, review requests, and reputation reporting." },
      { title: "Owner dashboard", body: "Track leads, booked appointments, won jobs, reviews, and campaign source performance." }
    ],
    funnel: {
      offer: "Free local lead leak audit.",
      conversionGoal: "Audit request followed by booked consultation.",
      sections: ["Lead leak calculator", "Missed revenue proof", "Workflow preview", "Audit form", "Calendar CTA", "Review growth proof"],
      fields: ["Business type", "Monthly leads", "Average sale", "Current response time", "Biggest lead source", "Phone"],
      qualification: ["Local service or appointment business", "Receives inbound leads", "Has response or review growth gap"],
      thankYouPath: "/signup/thank-you"
    },
    nurture: [
      { day: "Day 0", subject: "Your lead leak audit is queued", body: "Confirm submission and ask for current lead source details." },
      { day: "Day 1", subject: "The fastest win: response time", body: "Show speed-to-lead workflow and missed call text-back examples." },
      { day: "Day 4", subject: "Turn completed jobs into reviews", body: "Introduce review request automation and reputation reporting." }
    ],
    ads: [
      { channel: "Meta", hook: "How many leads went cold before your team replied?", copy: "Get a free lead leak audit and see where booked jobs are slipping away." },
      { channel: "Search", hook: "Lead follow up automation for service businesses", copy: "Respond faster, book more jobs, and request more reviews from one workspace." },
      { channel: "YouTube", hook: "A lead came in. The clock started.", copy: "Show instant follow-up, booking, reminders, and review request automation." }
    ],
    salesScript: [
      "Open with current lead volume, response time, and average job value.",
      "Calculate potential leakage from slow follow-up.",
      "Show speed-to-lead and review request workflows.",
      "Close on audit implementation or trial workspace."
    ]
  },
  {
    slug: "/gtm/franchises",
    name: "Franchise & Multi-location Funnel",
    audience: "Franchise operators, multi-location brands, and regional growth teams",
    headline: "Give every location one growth system with executive visibility.",
    subheadline:
      "EnterpriseOS centralizes local lead handling, campaign governance, reviews, routing, reporting, and location scorecards without taking execution away from the field.",
    primaryCta: "Take growth assessment",
    secondaryCta: "Book franchise demo",
    metrics: [
      { value: "50+", label: "locations ready to roll up" },
      { value: "1 view", label: "for market performance" },
      { value: "100%", label: "brand-governed templates" }
    ],
    painPoints: [
      "Corporate cannot see lead response quality by location.",
      "Local teams use different tools, templates, and reporting habits.",
      "Reviews, campaigns, and appointments are hard to compare across markets.",
      "Rollouts are slowed by inconsistent onboarding and adoption."
    ],
    offerStack: [
      { title: "Multi-location growth assessment", body: "Score lead routing, local response, reputation, campaign execution, reporting, and adoption risk." },
      { title: "Location operating system", body: "CRM, conversations, calendars, reviews, campaigns, and reporting separated by role, market, and location." },
      { title: "Corporate command center", body: "Rollups for lead sources, speed-to-lead, booked appointments, reviews, pipeline, and location scorecards." },
      { title: "Governed rollout kit", body: "Templates, permissions, onboarding checklist, support paths, and phased implementation plan." }
    ],
    funnel: {
      offer: "Multi-location growth assessment.",
      conversionGoal: "Executive assessment submission and franchise demo booking.",
      sections: ["Location visibility gap", "Scorecard preview", "Governance model", "Assessment form", "Executive demo", "Rollout plan"],
      fields: ["Company", "Location count", "Markets served", "Current CRM", "Reporting gap", "Rollout timeline"],
      qualification: ["Multiple locations", "Centralized marketing or operations", "Needs reporting, routing, or reputation governance"],
      thankYouPath: "/demo/thank-you"
    },
    nurture: [
      { day: "Day 0", subject: "Your multi-location assessment", body: "Confirm assessment and explain the location scorecard model." },
      { day: "Day 3", subject: "What corporate should see by location", body: "Show rollup metrics, lead routing, and review reporting examples." },
      { day: "Day 7", subject: "A safer rollout path for every location", body: "Share phased implementation plan and executive demo CTA." }
    ],
    ads: [
      { channel: "LinkedIn", hook: "Corporate strategy breaks when local execution is invisible.", copy: "Unify lead handling, reviews, campaigns, and reporting across every location." },
      { channel: "Search", hook: "Multi location marketing platform", copy: "Centralize local execution and executive reporting with EnterpriseOS." },
      { channel: "Display", hook: "One scorecard for every location.", copy: "Compare leads, bookings, reviews, and pipeline across markets." }
    ],
    salesScript: [
      "Open with current location count and reporting cadence.",
      "Identify gaps between corporate campaigns and local execution.",
      "Show location scorecards and governance controls.",
      "Close on assessment review and phased rollout plan."
    ]
  }
];

export const getGtmLane = (slug: string) => gtmLanes.find((lane) => lane.slug === slug);
