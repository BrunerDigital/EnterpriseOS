import { ArrowRight, Bot, CalendarClock, FileText, Megaphone, Star, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const orbitCards = [
  { label: "Website Leads", value: "+248", icon: Users, angle: "left-3 top-[4.5rem]", tone: "text-sky-200" },
  { label: "Ads & Campaigns", value: "+146", icon: Megaphone, angle: "left-0 top-[9.8rem]", tone: "text-rose-200" },
  { label: "Forms & Funnels", value: "+73", icon: FileText, angle: "bottom-32 left-24", tone: "text-violet-200" },
  { label: "New Clients", value: "+86", icon: Users, angle: "right-3 top-[4.5rem]", tone: "text-emerald-200" },
  { label: "Appointments", value: "+128", icon: CalendarClock, angle: "right-0 top-[9.8rem]", tone: "text-cyan-200" },
  { label: "Reviews", value: "+36", icon: Star, angle: "bottom-32 right-24", tone: "text-amber-200" }
];

const flowSegments = [
  ["Lead", 92, "from-sky-400 to-cyan-300"],
  ["Reply", 76, "from-violet-400 to-sky-300"],
  ["Book", 64, "from-emerald-400 to-sky-300"],
  ["Close", 48, "from-amber-300 to-emerald-300"]
];

export function GrowthConstellation() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,.18),transparent_18rem)] p-3">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(59,130,246,.24),transparent_14rem)]" />
      <svg className="absolute inset-0 size-full opacity-80" viewBox="0 0 760 430" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="blueRibbon" x1="0" x2="1"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#2563eb" /></linearGradient>
          <linearGradient id="pinkRibbon" x1="0" x2="1"><stop stopColor="#fb7185" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
          <linearGradient id="greenRibbon" x1="0" x2="1"><stop stopColor="#34d399" /><stop offset="1" stopColor="#22c55e" /></linearGradient>
          <linearGradient id="goldRibbon" x1="0" x2="1"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
        </defs>
        <path d="M120 92 C230 92 246 175 346 194" fill="none" stroke="url(#blueRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".62" />
        <path d="M92 160 C222 162 244 205 346 212" fill="none" stroke="url(#pinkRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".58" />
        <path d="M114 238 C232 234 254 220 346 220" fill="none" stroke="url(#greenRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".54" />
        <path d="M192 306 C260 286 292 248 354 232" fill="none" stroke="url(#goldRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".48" />
        <path d="M414 194 C520 172 536 96 642 96" fill="none" stroke="url(#pinkRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".62" />
        <path d="M414 210 C528 202 546 162 664 160" fill="none" stroke="url(#blueRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".62" />
        <path d="M414 224 C518 224 550 238 648 238" fill="none" stroke="url(#greenRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".58" />
        <path d="M406 238 C494 264 522 302 592 306" fill="none" stroke="url(#goldRibbon)" strokeWidth="8" strokeLinecap="round" opacity=".46" />
      </svg>
      <div className="absolute left-1/2 top-[50%] size-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15" />
      <div className="absolute left-1/2 top-[50%] size-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/20" />

      <div className="relative z-30 hidden items-center justify-between sm:flex">
        <div>
          <div className="text-sm font-semibold text-sky-200">Live operating graph</div>
          <div className="mt-1 text-xs text-slate-500">CRM + inbox + calendar + reviews</div>
        </div>
        <div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">Synced</div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex size-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_36%_22%,rgba(255,255,255,.88),rgba(56,189,248,.58)_22%,rgba(37,99,235,.46)_48%,rgba(124,58,237,.54)_72%,rgba(2,6,23,.12)_100%)] shadow-[0_0_95px_rgba(59,130,246,.44)]">
        <div className="absolute inset-2 rounded-full border border-white/15 bg-blue-950/10" />
        <div className="absolute inset-8 rounded-full border border-sky-200/25" />
        <div className="text-center">
          <div className="text-3xl font-semibold text-white">Digital<span className="text-blue-400">360</span></div>
        </div>
      </div>

      {orbitCards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className={cn("absolute z-20 hidden w-36 rounded-lg border border-white/10 bg-slate-950/78 p-3 shadow-panel backdrop-blur-xl sm:block", card.angle)}>
            <div className="flex items-center justify-between">
              <Icon className={cn("size-4", card.tone)} />
              <ArrowRight className="size-3.5 text-slate-500" />
            </div>
            <div className="mt-3 text-xs font-semibold text-white">{card.label}</div>
            <div className="mt-1 text-sm font-semibold text-emerald-300">{card.value}</div>
          </div>
        );
      })}

      <div className="absolute bottom-3 left-3 right-3 z-20 rounded-lg border border-white/10 bg-slate-950/82 p-4 backdrop-blur-xl sm:left-6 sm:right-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <TrendingUp className="size-4 text-emerald-300" />
            Revenue flow
          </div>
          <div className="text-xs text-slate-500">$428K pipeline</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {flowSegments.map(([label, value, gradient]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">{label}</span>
                <span className="font-semibold text-white">{value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className={cn("h-2 rounded-full bg-gradient-to-r", gradient as string)} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export function HeroInsightCards() {
  const deals = [
    ["Northfield Dental", "Proposal Sent", "$12,500"],
    ["Bright Smiles Orthodontics", "Negotiation", "$8,900"],
    ["Peak Performance PT", "Won", "$6,400"]
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.8fr_0.7fr]">
      <div className="rounded-lg border border-white/10 bg-slate-950/72 p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">Revenue Flow</h3>
          <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-300">This Month</div>
        </div>
        <div className="text-3xl font-semibold text-white">$48,920 <span className="align-middle text-sm text-emerald-300">+28.4%</span></div>
        <div className="mt-5 h-28 overflow-hidden rounded-md bg-slate-950/60">
          <svg viewBox="0 0 420 120" className="size-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 72 C80 62 110 20 182 46 C260 78 292 36 420 20" fill="none" stroke="#2563eb" strokeWidth="18" opacity=".55" />
            <path d="M0 88 C88 82 128 48 196 60 C284 76 316 54 420 42" fill="none" stroke="#8b5cf6" strokeWidth="14" opacity=".55" />
            <path d="M0 104 C92 96 128 76 200 80 C284 88 322 78 420 62" fill="none" stroke="#f97316" strokeWidth="10" opacity=".42" />
          </svg>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-slate-950/72 p-5 shadow-panel">
        <h3 className="font-semibold text-white">Recent Deals</h3>
        <div className="mt-4 grid gap-3">
          {deals.map(([name, stage, value]) => (
            <div key={name} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3">
              <div>
                <div className="text-sm font-medium text-white">{name}</div>
                <div className="mt-1 text-xs text-slate-500">{stage}</div>
              </div>
              <div className="text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-slate-950/72 p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">AI Insight</h3>
          <Bot className="size-5 text-blue-300" />
        </div>
        <div className="text-sm text-slate-400">Opportunity Score</div>
        <div className="mt-2 text-5xl font-semibold text-emerald-300">92</div>
        <div className="mt-2 font-semibold text-emerald-300">Excellent</div>
        <p className="mt-4 text-sm leading-6 text-slate-400">This lead is highly likely to convert. Recommended next step: personalized follow up email.</p>
      </div>
    </div>
  );
}

export function ProofVisualization() {
  const sources = [
    { label: "Paid search", value: 42, color: "bg-sky-400" },
    { label: "Organic", value: 26, color: "bg-emerald-300" },
    { label: "Referrals", value: 18, color: "bg-violet-400" },
    { label: "Reactivation", value: 14, color: "bg-amber-300" }
  ];

  return (
    <div className="glass-panel rounded-lg p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Attribution proof board</h3>
          <p className="mt-1 text-sm text-slate-400">Source quality, booking lift, and review velocity in one view.</p>
        </div>
        <div className="rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950">Live demo data</div>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative flex aspect-square items-center justify-center rounded-lg border border-white/10 bg-slate-950/60">
          <div className="absolute size-52 rounded-full bg-[conic-gradient(#38bdf8_0_42%,#6ee7b7_42%_68%,#8b5cf6_68%_86%,#fcd34d_86%_100%)] opacity-95" />
          <div className="absolute size-36 rounded-full bg-slate-950 shadow-[inset_0_0_35px_rgba(56,189,248,.18)]" />
          <div className="relative text-center">
            <div className="text-4xl font-semibold text-white">41%</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Booked lift</div>
          </div>
        </div>
        <div className="grid content-center gap-4">
          {sources.map((source) => (
            <div key={source.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className={cn("size-2.5 rounded-full", source.color)} />
                  {source.label}
                </span>
                <span className="font-semibold text-white">{source.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className={cn("h-2 rounded-full", source.color)} style={{ width: `${source.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
