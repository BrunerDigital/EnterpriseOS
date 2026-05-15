import { ArrowRight, Bot, CalendarClock, MessageSquare, Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const orbitCards = [
  { label: "AI score", value: "92", icon: Sparkles, angle: "left-4 top-16", tone: "text-violet-200" },
  { label: "Reviews", value: "4.8", icon: Star, angle: "right-4 top-24", tone: "text-emerald-200" },
  { label: "Booked", value: "312", icon: CalendarClock, angle: "bottom-10 left-8", tone: "text-sky-200" },
  { label: "Inbox", value: "18m", icon: MessageSquare, angle: "bottom-6 right-8", tone: "text-cyan-200" }
];

const flowSegments = [
  ["Lead", 92, "from-sky-400 to-cyan-300"],
  ["Reply", 76, "from-violet-400 to-sky-300"],
  ["Book", 64, "from-emerald-400 to-sky-300"],
  ["Close", 48, "from-amber-300 to-emerald-300"]
];

export function GrowthConstellation() {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,.18),transparent_22rem),linear-gradient(145deg,rgba(15,23,42,.92),rgba(2,6,23,.78))] p-5 shadow-panel">
      <div className="absolute inset-0 grid-fade opacity-70" />
      <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/15" />
      <div className="absolute left-1/2 top-1/2 size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/15" />
      <div className="absolute left-1/2 top-1/2 size-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/20" />

      <div className="relative z-30 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-sky-200">Live operating graph</div>
          <div className="mt-1 text-xs text-slate-500">CRM + inbox + calendar + reviews</div>
        </div>
        <div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">Synced</div>
      </div>

      <div className="absolute left-1/2 top-[46%] z-10 flex size-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.95),rgba(125,211,252,.7)_18%,rgba(56,189,248,.34)_45%,rgba(99,102,241,.28)_70%,rgba(2,6,23,.05)_100%)] shadow-[0_0_80px_rgba(56,189,248,.32)]">
        <div className="absolute inset-4 rounded-full border border-white/20" />
        <div className="absolute inset-10 rounded-full border border-sky-200/25" />
        <div className="text-center">
          <div className="text-4xl font-semibold text-white">360</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">Signal</div>
        </div>
      </div>

      {orbitCards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className={cn("absolute z-20 w-36 rounded-lg border border-white/10 bg-slate-950/78 p-3 shadow-panel backdrop-blur-xl", card.angle)}>
            <div className="flex items-center justify-between">
              <Icon className={cn("size-4", card.tone)} />
              <ArrowRight className="size-3.5 text-slate-500" />
            </div>
            <div className="mt-4 text-2xl font-semibold text-white">{card.value}</div>
            <div className="mt-1 text-xs text-slate-400">{card.label}</div>
          </div>
        );
      })}

      <div className="absolute bottom-5 left-5 right-5 z-20 rounded-lg border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
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

      <div className="absolute right-7 top-1/2 z-10 hidden w-44 -translate-y-1/2 rounded-lg border border-violet-300/20 bg-violet-400/10 p-4 text-sm leading-6 text-violet-100 xl:block">
        <div className="mb-2 flex items-center gap-2 font-semibold text-white">
          <Bot className="size-4 text-violet-200" />
          AI insight
        </div>
        Reply speed and reviews are driving the largest conversion lift.
      </div>

      <div className="absolute left-8 top-1/2 z-10 hidden w-40 -translate-y-1/2 rounded-lg border border-sky-300/20 bg-sky-400/10 p-4 text-sm leading-6 text-sky-100 xl:block">
        <div className="mb-2 flex items-center gap-2 font-semibold text-white">
          <Zap className="size-4 text-sky-200" />
          Automation
        </div>
        9 workflows active across first client workspace.
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
