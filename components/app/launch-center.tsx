import { AlertTriangle, ArrowUpRight, CheckCircle2, Circle, ClipboardList, ExternalLink, RadioTower, Rocket, Send, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { LaunchCenterData, LaunchReadiness } from "@/lib/launch-center";
import { cn } from "@/lib/utils";

const statusTone = {
  ready: "success",
  pending: "warning",
  attention: "destructive"
} as const;

const activityTone = {
  lead: "border-sky-400/20 bg-sky-400/10 text-sky-100",
  setup: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  team: "border-violet-400/20 bg-violet-400/10 text-violet-100",
  system: "border-white/10 bg-white/[0.04] text-slate-200"
};

export function LaunchCenter({ data }: { data: LaunchCenterData }) {
  const progress = Number.parseInt(data.metrics[0]?.value ?? "0", 10);
  const readyCount = data.readiness.filter((item) => item.status === "ready").length;

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_72%_12%,rgba(37,99,235,.24),transparent_24rem),linear-gradient(145deg,rgba(15,23,42,.88),rgba(2,6,23,.74))] shadow-panel">
        <div className="grid gap-0 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Launch Center</Badge>
              <Badge variant={readyCount >= 4 ? "success" : "warning"}>{readyCount}/{data.readiness.length} checks ready</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Bring Digital360 from polished demo to live operating system.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Track setup submissions, lead capture, integration readiness, domain work, and launch blockers from one internal command screen.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-4">
              {data.metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-white/10 bg-slate-950/58 p-4">
                  <div className="text-sm text-slate-400">{metric.label}</div>
                  <div className="mt-2 text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-xs leading-5 text-slate-500">{metric.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 bg-slate-950/52 p-6 xl:border-l xl:border-t-0">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/15 text-blue-200">
                <Rocket className="size-6" />
              </div>
              <div>
                <div className="font-semibold text-white">Go-live trajectory</div>
                <div className="text-sm text-muted-foreground">Updated from Supabase audit logs</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">Launch completion</span>
                <span className="font-semibold text-white">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="mt-6 rounded-lg border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-6 text-sky-100">
              Next best move: connect notification webhooks and custom domain, then run one real lead submission from the production landing page.
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Readiness checks</CardTitle>
              <CardDescription>Production controls that need to be green before public launch</CardDescription>
            </div>
            <ShieldCheck className="size-5 text-emerald-300" />
          </CardHeader>
          <CardContent className="grid gap-3">
            {data.readiness.map((item) => (
              <ReadinessRow key={item.label} item={item} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Setup progress</CardTitle>
              <CardDescription>Steps saved from the public onboarding/setup flow</CardDescription>
            </div>
            <ClipboardList className="size-5 text-sky-300" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {data.setupSteps.map((step) => (
                <div key={step.slug} className={cn("rounded-lg border p-4", step.status === "done" ? "border-emerald-400/20 bg-emerald-400/10" : "border-white/10 bg-white/[0.025]")}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{step.title}</div>
                    {step.status === "done" ? <CheckCircle2 className="size-4 text-emerald-300" /> : <Circle className="size-4 text-slate-500" />}
                  </div>
                  <div className="mt-2 text-xs leading-5 text-slate-400">
                    {step.savedAt ? `Saved ${formatDate(step.savedAt)}` : "Waiting for setup submission"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Launch activity</CardTitle>
              <CardDescription>Leads, setup saves, invites, and launch events from audit logs</CardDescription>
            </div>
            <RadioTower className="size-5 text-blue-300" />
          </CardHeader>
          <CardContent className="grid gap-3">
            {data.activities.length > 0 ? (
              data.activities.map((activity) => (
                <div key={activity.id} className={cn("rounded-lg border p-4", activityTone[activity.tone])}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{activity.label}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-300">{activity.detail}</div>
                    </div>
                    <div className="text-xs text-slate-500">{formatDate(activity.createdAt)}</div>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">{activity.target}</div>
                </div>
              ))
            ) : (
              <EmptyState text="No launch activity yet. Submit the public form or save an onboarding step to populate this feed." />
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Integration status</CardTitle>
                <CardDescription>Provider readiness seeded for the current tenant</CardDescription>
              </div>
              <Settings2 className="size-5 text-violet-300" />
            </CardHeader>
            <CardContent className="grid gap-3">
              {data.integrations.map((integration) => (
                <div key={integration.label} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3">
                  <div>
                    <div className="font-medium text-white">{integration.label}</div>
                    <div className="mt-1 text-xs text-slate-500">Updated {formatDate(integration.updatedAt)}</div>
                  </div>
                  <Badge variant={integration.status === "ready" ? "success" : "secondary"}>{integration.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended next actions</CardTitle>
              <CardDescription>The shortest path from here to production launch</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <ActionItem icon={<Send />} title="Connect notification webhook" text="Send lead and setup submissions to email, Slack, CRM, or Make/Zapier." />
              <ActionItem icon={<ExternalLink />} title="Attach custom domain" text="Point Cloudflare DNS to Vercel, then add Supabase auth redirect URLs." />
              <ActionItem icon={<Sparkles />} title="Run a live lead test" text="Submit the production landing form and confirm it appears here in Launch Activity." />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function ReadinessRow({ item }: { item: LaunchReadiness }) {
  const Icon = item.status === "ready" ? CheckCircle2 : item.status === "attention" ? AlertTriangle : Circle;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-4">
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 size-5 shrink-0", item.status === "ready" ? "text-emerald-300" : item.status === "attention" ? "text-rose-300" : "text-amber-300")} />
        <div>
          <div className="font-medium text-white">{item.label}</div>
          <div className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</div>
        </div>
      </div>
      <Badge variant={statusTone[item.status]}>{item.status}</Badge>
    </div>
  );
}

function ActionItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-4 transition hover:border-sky-400/35 hover:bg-sky-400/10">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-400/12 text-sky-200">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold text-white">{title}</div>
          <ArrowUpRight className="size-4 text-slate-500 transition group-hover:text-sky-200" />
        </div>
        <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-6 text-sm leading-6 text-slate-400">
      {text}
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}
