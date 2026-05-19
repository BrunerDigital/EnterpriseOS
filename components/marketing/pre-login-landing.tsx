import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  Home,
  Landmark,
  Layers3,
  MessageSquare,
  Palette,
  Play,
  Rocket,
  Sparkles,
  Users,
  Workflow,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingShell, ProductMockup } from "@/components/marketing/marketing-shell";
import { cn } from "@/lib/utils";

const trustSegments = [
  { label: "Marketing Agencies", icon: Building2 },
  { label: "Franchises", icon: Landmark },
  { label: "Multi-Location Brands", icon: Layers3 },
  { label: "Home Services", icon: Home },
  { label: "Consultants", icon: Users },
  { label: "Professional Services", icon: Wrench }
];

const growthCards = [
  { title: "Capture & Convert", body: "High-converting funnels, forms, landing pages, and lead routing built for speed.", icon: MessageSquare, tone: "from-blue-500 to-cyan-400" },
  { title: "Nurture & Engage", body: "Two-way conversations across SMS, email, and social in a unified inbox.", icon: Users, tone: "from-emerald-500 to-teal-300" },
  { title: "Automate & Scale", body: "Visual workflows and AI automation that save time and drive results.", icon: Workflow, tone: "from-emerald-500 to-sky-400" },
  { title: "Operate & Grow", body: "Reporting, reputation, billing, portals, and more in one place.", icon: BarChart3, tone: "from-violet-500 to-blue-400" }
];

const aiCards = [
  { title: "AI Lead Scoring", body: "Identify your best leads and focus your efforts.", icon: Users },
  { title: "AI Reply Suggestions", body: "Respond faster with smart, context-aware replies.", icon: MessageSquare },
  { title: "AI Content Assistant", body: "Create emails, campaigns, and pages in seconds.", icon: Bot },
  { title: "AI Insights & Coaching", body: "Actionable insights and next steps to grow faster.", icon: Sparkles }
];

const agencyChecks = [
  "Complete white-label control",
  "Client portals & permissions",
  "Sub-accounts & workspaces",
  "Advanced reporting & dashboards"
];

const launchSteps = [
  ["1. Onboard", "Guided setup and platform training."],
  ["2. Configure", "Brand, team, workflows, and integrations."],
  ["3. Import & Connect", "Bring in data and connect tools."],
  ["4. Launch", "Go live and grow with confidence."],
  ["5. Scale", "Optimize, automate, and increase impact."]
];

export function PreLoginLanding() {
  return (
    <MarketingShell>
      <main>
        <section className="relative px-4 pb-12 pt-10 sm:px-6 md:pt-14 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-center">
            <div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-normal text-white sm:text-6xl md:text-7xl">
                Your growth operating system,
                <span className="block bg-gradient-to-r from-emerald-300 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                  fully connected.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                CRM, automation, conversations, calendars, funnels, reputation, reporting, billing, portals, and AI, everything your business needs in one platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-blue-600 text-white shadow-[0_0_32px_rgba(37,99,235,.34)] hover:bg-blue-500">
                  <Link href="/demo">
                    Book a demo
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]">
                  <Link href="/onboarding">
                    See it in action
                    <Play className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {["White-label ready", "AI-powered", "All-in-one platform", "Enterprise secure"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <span className="flex size-4 items-center justify-center rounded-full border border-emerald-400/45 text-emerald-300">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <ProductMockup />
          </div>

          <div className="mx-auto mt-10 max-w-7xl">
            <p className="text-center text-sm text-slate-500">Trusted by agencies and businesses that demand more.</p>
            <div className="mt-6 grid gap-3 text-slate-500 sm:grid-cols-2 lg:grid-cols-6">
              {trustSegments.map((segment) => {
                const Icon = segment.icon;
                return (
                  <div key={segment.label} className="flex items-center justify-center gap-3 border-r border-white/10 px-3 text-sm last:border-r-0 max-lg:border-r-0">
                    <Icon className="size-5 text-slate-600" />
                    <span>{segment.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#07111f]/44 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              title={<>Everything <span className="bg-gradient-to-r from-emerald-300 to-blue-500 bg-clip-text text-transparent">connected.</span> Everything aligned.</>}
              body="Digital360 unifies your entire customer journey in one platform so you can capture more demand, convert faster, and deliver exceptional experiences."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {growthCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-lg border border-white/12 bg-white/[0.035] p-5 shadow-panel">
                    <div className={cn("flex size-11 items-center justify-center rounded-md bg-gradient-to-br text-white shadow-[0_0_26px_rgba(37,99,235,.24)]", card.tone)}>
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{card.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#061426]/54 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <NeonCube />
            <div>
              <SectionTitle
                align="left"
                title={<>AI that works <span className="text-blue-400">for you.</span></>}
                body="Digital360 AI helps you write, respond, prioritize, score, and optimize so your team can focus on what matters most."
              />
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {aiCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="rounded-lg border border-cyan-300/12 bg-cyan-300/[0.045] p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                        <Icon className="size-4" />
                        {card.title}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{card.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Built for agencies. Designed for scale.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                White-label everything, manage clients, control access, and deliver a premium experience under your brand.
              </p>
              <div className="mt-5 grid gap-2">
                {agencyChecks.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="size-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <BrandControlPanel />
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.025] p-6 md:grid-cols-[1fr_12rem] md:items-center">
              <div>
                <h2 className="text-center text-xl font-semibold text-white md:text-2xl">
                  Ready to run <span className="text-blue-400">your</span> business on one connected platform?
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">From setup to scale, demo and see Digital360 in the way.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-5">
                  {launchSteps.map(([title, body], index) => (
                    <div key={title} className="relative">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-400/10 text-emerald-300">
                          {index === 3 ? <Rocket className="size-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
                        </div>
                        {index < launchSteps.length - 1 ? <div className="h-px flex-1 bg-white/14 max-md:hidden" /> : null}
                      </div>
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#07111f] p-5 text-center">
                <p className="text-sm text-slate-400">Most clients launch in</p>
                <div className="mt-2 bg-gradient-to-r from-emerald-300 to-blue-400 bg-clip-text text-4xl font-semibold text-transparent">7-14 days</div>
                <Button asChild className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-500">
                  <Link href="/demo">Book a demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function SectionTitle({ title, body, align = "center" }: { title: ReactNode; body: string; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      <h2 className="text-2xl font-semibold tracking-normal text-white md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
    </div>
  );
}

function NeonCube() {
  return (
    <div className="relative min-h-48 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_48%,rgba(37,99,235,.28),transparent_13rem)]">
      <div className="absolute inset-0 grid-fade opacity-40" />
      <svg viewBox="0 0 280 190" className="relative z-10 size-full min-h-48" aria-hidden="true">
        <defs>
          <linearGradient id="cubeStroke" x1="0" x2="1">
            <stop stopColor="#2dd4bf" />
            <stop offset=".55" stopColor="#2563eb" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="cubeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M140 36 218 78v86l-78 42-78-42V78z" fill="rgba(37,99,235,.08)" stroke="url(#cubeStroke)" strokeWidth="3" filter="url(#cubeGlow)" />
        <path d="M62 78 140 120l78-42M140 120v86" fill="none" stroke="url(#cubeStroke)" strokeWidth="3" opacity=".92" />
        <path d="M90 92 140 66l50 26-50 28z" fill="rgba(45,212,191,.08)" stroke="#60a5fa" opacity=".7" />
      </svg>
    </div>
  );
}

function BrandControlPanel() {
  return (
    <div className="rounded-lg border border-white/12 bg-white/[0.035] p-4 shadow-panel">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
        <Palette className="size-4 text-blue-300" />
        Your Brand
      </div>
      <div className="grid gap-4 md:grid-cols-[0.7fr_1fr_1.2fr]">
        <div>
          <div className="text-xs text-slate-500">Logo</div>
          <div className="mt-2 flex h-24 items-center justify-center rounded-md border border-white/10 bg-[#050913] text-center text-xl font-semibold text-white">
            YOUR<br />LOGO
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Primary Color</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["#2563eb", "#8b5cf6", "#f472b6", "#f97316", "#facc15", "#22c55e", "#14b8a6"].map((color) => (
              <span key={color} className="size-7 rounded-sm border border-white/10" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Domain</div>
          <div className="mt-2 rounded-md border border-white/10 bg-[#050913] px-3 py-3 text-sm text-slate-300">app.yourbrand.com</div>
          <Button className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-500">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
