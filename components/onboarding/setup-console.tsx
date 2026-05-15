import Link from "next/link";
import { ArrowRight, Check, Circle, Lock, Sparkles } from "lucide-react";
import { setupSteps, launchMetrics, getSetupStep } from "@/lib/setup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MarketingShell } from "@/components/marketing/marketing-shell";

type SetupConsoleProps = {
  activeSlug?: string;
  mode?: "overview" | "step";
};

const statusStyles = {
  done: "border-emerald-400/35 bg-emerald-400/10 text-emerald-100",
  active: "border-sky-400/45 bg-sky-400/12 text-sky-100",
  ready: "border-white/10 bg-white/[0.035] text-slate-300",
  locked: "border-white/10 bg-slate-950/45 text-slate-500"
};

export function SetupConsole({ activeSlug, mode = "overview" }: SetupConsoleProps) {
  const activeStep = getSetupStep(activeSlug);
  const progress = Math.round((setupSteps.filter((step) => step.status === "done").length + 0.9) / setupSteps.length * 100);

  return (
    <MarketingShell>
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="glass-panel rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-semibold tracking-normal text-white">Digital360 setup</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Configure brand, workspace, team, integrations, automations, billing, and launch readiness.
                    </p>
                  </div>
                  <Badge variant="success">{progress}%</Badge>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-300" style={{ width: `${progress}%` }} />
                </div>
                <nav className="mt-6 grid gap-2">
                  {setupSteps.map((step) => {
                    const Icon = step.icon;
                    const selected = step.slug === activeStep.slug;
                    return (
                      <Link
                        key={step.slug}
                        href={step.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md border px-3 py-3 text-sm transition hover:border-sky-400/35 hover:bg-sky-400/10",
                          statusStyles[step.status],
                          selected && "border-sky-400/60 bg-sky-400/15 text-white"
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{step.title}</span>
                        {step.status === "locked" ? <Lock className="size-3.5" /> : <Circle className="size-2 fill-current" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <div className="min-w-0">
              <SetupHero activeSlug={activeStep.slug} />
              {mode === "overview" ? <SetupOverview /> : <SetupStepDetail slug={activeStep.slug} />}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function SetupHero({ activeSlug }: { activeSlug: string }) {
  const activeStep = getSetupStep(activeSlug);

  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="grid gap-6 p-6 xl:grid-cols-[1fr_0.72fr] xl:p-8">
        <div>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl xl:text-5xl">
            Launch a connected workspace without guessing the next step.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Digital360 turns setup into a guided operating checklist: every item maps to a product module, credential,
            role, data source, and go-live decision.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-sky-400 text-slate-950 hover:bg-sky-300">
              <Link href={activeStep.href}>
                Continue {activeStep.title}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-200">
            <Sparkles className="size-4" />
            Current focus
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">{activeStep.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{activeStep.description}</p>
          <div className="mt-5 grid gap-3">
            {activeStep.outcomes.map((outcome) => (
              <div key={outcome} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-300">
                <Check className="size-4 text-emerald-300" />
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SetupOverview() {
  return (
    <>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {launchMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>{metric.label}</CardDescription>
                  <Icon className="size-4 text-sky-300" />
                </div>
                <CardTitle className="text-2xl">{metric.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{metric.detail}</CardContent>
            </Card>
          );
        })}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Launch path</CardTitle>
            <CardDescription>Every setup item becomes an operational module after launch.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {setupSteps.map((step, index) => (
              <Link key={step.slug} href={step.href} className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.025] p-4 transition hover:border-sky-400/35 hover:bg-sky-400/10">
                <div className="flex size-9 items-center justify-center rounded-md bg-sky-400/12 text-sm font-semibold text-sky-200">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white">{step.title}</div>
                  <div className="mt-1 truncate text-sm text-muted-foreground">{step.description}</div>
                </div>
                <Badge variant={step.status === "locked" ? "secondary" : step.status === "done" ? "success" : "default"}>{step.status}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <SetupForm slug="brand" compact />
      </section>
    </>
  );
}

export function SetupStepDetail({ slug }: { slug: string }) {
  const step = getSetupStep(slug);

  return (
    <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>{step.title} checklist</CardTitle>
          <CardDescription>{step.owner} · {step.duration}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {step.checklist.map((item, index) => (
            <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <div className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold", index === 0 ? "bg-emerald-400/15 text-emerald-200" : "bg-sky-400/12 text-sky-200")}>
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-white">{item}</div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">Capture the decision, validate it with the owner, and write an audit-ready setup note.</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <SetupForm slug={slug} />
    </section>
  );
}

function SetupForm({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const step = getSetupStep(slug);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{compact ? "Start setup" : `${step.title} details`}</CardTitle>
        <CardDescription>These fields are ready to connect to tenant-scoped persistence.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          {step.fields.map((field) => (
            <label key={field} className="grid gap-2 text-sm font-medium text-slate-300">
              {field}
              <Input placeholder={field} />
            </label>
          ))}
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
            AI setup assistant will summarize this step, flag missing credentials, and recommend the next launch action.
          </div>
          <Button className="bg-sky-400 text-slate-950 hover:bg-sky-300">Save and continue</Button>
        </form>
      </CardContent>
    </Card>
  );
}
