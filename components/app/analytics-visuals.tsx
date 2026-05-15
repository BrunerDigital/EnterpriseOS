import { Activity, ArrowUpRight, Gauge, MessageSquareText, Radar, Sparkles, Star, Target, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const gauges = [
  { label: "Pipeline health", value: 92, color: "#38bdf8", icon: Gauge },
  { label: "Lead quality", value: 84, color: "#8b5cf6", icon: Target },
  { label: "Review velocity", value: 76, color: "#34d399", icon: Star }
];

const sources = [
  { label: "Paid search", value: 42, color: "bg-sky-400" },
  { label: "Organic", value: 26, color: "bg-emerald-300" },
  { label: "Social", value: 19, color: "bg-violet-400" },
  { label: "Referral", value: 13, color: "bg-amber-300" }
];

const heatmap = [
  [38, 62, 71, 88, 74, 42],
  [52, 77, 84, 91, 69, 48],
  [45, 59, 73, 95, 82, 61],
  [31, 54, 66, 78, 89, 70]
];

const funnel = [
  { label: "Captured", value: 1240, width: "100%", gradient: "from-sky-400 to-cyan-300" },
  { label: "Qualified", value: 812, width: "76%", gradient: "from-violet-400 to-sky-300" },
  { label: "Booked", value: 438, width: "54%", gradient: "from-emerald-400 to-sky-300" },
  { label: "Won", value: 146, width: "34%", gradient: "from-amber-300 to-emerald-300" }
];

const insightRows = [
  { icon: Sparkles, title: "AI next action", text: "Prioritize 17 leads with score above 85 before 2 PM.", tone: "text-violet-200" },
  { icon: MessageSquareText, title: "Inbox pressure", text: "SMS replies are 2.4x more likely to book within 12 minutes.", tone: "text-sky-200" },
  { icon: Zap, title: "Automation lift", text: "Review request workflow added 37 new reviews this month.", tone: "text-emerald-200" }
];

export function AnalyticsShowcase() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
      <Card className="overflow-hidden">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Executive signal map</CardTitle>
            <CardDescription>Lead source, quality, booking, and revenue health</CardDescription>
          </div>
          <Badge variant="success">Live model</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {gauges.map((item) => (
                  <RadialGauge key={item.label} {...item} />
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <SourceRing />
              <div className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Conversion heatmap</div>
                    <div className="mt-1 text-xs text-slate-500">Hourly booked-call probability</div>
                  </div>
                  <Radar className="size-5 text-sky-300" />
                </div>
                <div className="grid gap-2">
                  {heatmap.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-6 gap-2">
                      {row.map((value, index) => (
                        <div
                          key={`${rowIndex}-${index}`}
                          className="h-9 rounded-md border border-white/10"
                          style={{
                            background: `rgba(${value > 80 ? "52, 211, 153" : value > 65 ? "56, 189, 248" : "139, 92, 246"}, ${0.16 + value / 140})`
                          }}
                          title={`${value}%`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI operating brief</CardTitle>
          <CardDescription>What the system would tell the team right now</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {insightRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.title} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex size-10 items-center justify-center rounded-lg bg-white/[0.06]", row.tone)}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{row.title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{row.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="rounded-lg border border-sky-400/20 bg-sky-400/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-sky-100">Projected lift</div>
                <div className="mt-2 text-4xl font-semibold text-white">+$64K</div>
              </div>
              <ArrowUpRight className="size-8 text-sky-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function FunnelVelocity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel velocity</CardTitle>
        <CardDescription>How fast the workspace turns demand into booked revenue</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {funnel.map((stage) => (
          <div key={stage.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-white">{stage.label}</span>
              <span className="text-slate-400">{stage.value.toLocaleString()}</span>
            </div>
            <div className="h-10 rounded-lg border border-white/10 bg-slate-950/70 p-1">
              <div className={cn("flex h-full items-center rounded-md bg-gradient-to-r px-3 text-xs font-semibold text-slate-950", stage.gradient)} style={{ width: stage.width }}>
                {stage.label}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RadialGauge({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: typeof Activity }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-300">{label}</div>
        <Icon className="size-4 text-slate-500" />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div
          className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
          style={{ background: `conic-gradient(${color} ${value * 3.6}deg, rgba(255,255,255,.08) 0deg)` }}
        >
          <div className="absolute inset-2 rounded-full bg-slate-950" />
          <div className="relative text-lg font-semibold text-white">{value}</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}%</div>
          <div className="mt-1 text-xs leading-5 text-slate-500">Healthy range for scale rollout</div>
        </div>
      </div>
    </div>
  );
}

function SourceRing() {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/55 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">Source mix</div>
          <div className="mt-1 text-xs text-slate-500">Attributed pipeline</div>
        </div>
        <Activity className="size-5 text-emerald-300" />
      </div>
      <div className="grid gap-4 sm:grid-cols-[0.7fr_1fr] sm:items-center">
        <div className="relative mx-auto flex size-32 items-center justify-center rounded-full bg-[conic-gradient(#38bdf8_0_42%,#6ee7b7_42%_68%,#8b5cf6_68%_87%,#fcd34d_87%_100%)]">
          <div className="absolute size-20 rounded-full bg-slate-950" />
          <div className="relative text-center">
            <div className="text-2xl font-semibold text-white">$1.42M</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">pipeline</div>
          </div>
        </div>
        <div className="grid gap-3">
          {sources.map((source) => (
            <div key={source.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-300">
                <span className={cn("size-2.5 rounded-full", source.color)} />
                {source.label}
              </span>
              <span className="font-semibold text-white">{source.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
