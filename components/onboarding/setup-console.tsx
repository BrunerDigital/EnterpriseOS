"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  BarChart3,
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronRight,
  Circle,
  CreditCard,
  HelpCircle,
  Home,
  KeyRound,
  LogOut,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Sparkles,
  UserRound,
  Users,
  Workflow
} from "lucide-react";
import { setupSteps, getSetupStep } from "@/lib/setup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SetupConsoleProps = {
  activeSlug?: string;
  mode?: "overview" | "step";
};

const iconRail = [Home, Users, CalendarClock, MessageSquare, Workflow, UserRound, CreditCard, BarChart3, Sparkles];

const rowTone = [
  "from-emerald-500 to-teal-400",
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-orange-400 to-amber-500",
  "from-cyan-500 to-sky-400",
  "from-pink-500 to-rose-400",
  "from-violet-600 to-indigo-400",
  "from-emerald-500 to-green-400",
  "from-blue-600 to-sky-400"
];

export function SetupConsole({ activeSlug, mode = "overview" }: SetupConsoleProps) {
  const activeStep = getSetupStep(activeSlug);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const visualCompletedCount = Math.max(3, completedSteps.length);
  const progress = Math.round((visualCompletedCount / setupSteps.length) * 100);

  useEffect(() => {
    const saved = window.localStorage.getItem("digital360_setup_steps");
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved) as string[]);
      } catch {
        window.localStorage.removeItem("digital360_setup_steps");
      }
    }
  }, []);

  function completeStep(slug: string) {
    setCompletedSteps((current) => {
      const next = Array.from(new Set([...current, slug]));
      window.localStorage.setItem("digital360_setup_steps", JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="d360-workspace min-h-screen text-white">
      <header className="d360-toolbar sticky top-0 z-40 border-b">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-3 px-panel md:h-20">
          <BrandLockup />
          <div className="glass-inset hidden w-full max-w-md items-center gap-2 px-3 py-2 text-sm text-muted-foreground lg:flex">
            <Search className="size-4" />
            <span className="flex-1">Search contacts, tasks, pages...</span>
            <kbd className="rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[10px] text-slate-400">⌘ K</kbd>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="size-5 text-slate-400" />
            <HelpCircle className="size-5 text-slate-400" />
            <div className="hidden items-center gap-3 md:flex">
              <div className="relative size-10 overflow-hidden rounded-full border border-emerald-300/30 bg-gradient-to-br from-amber-200 to-rose-300">
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-950">BB</div>
              </div>
              <div>
                <div className="text-sm font-semibold">Brittany Blakely</div>
                <div className="text-xs text-muted-foreground">Owner</div>
              </div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[4.75rem_1fr]">
        <aside className="d360-workspace-sidebar relative hidden border-r border-white/10 p-3 lg:block">
          <div className="grid gap-3">
            {iconRail.map((Icon, index) => (
              <Link
                href={index === 0 ? "/dashboard" : "/onboarding"}
                key={index}
                className={cn("flex size-11 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/[0.05] hover:text-white", index === 0 && "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,.42)]")}
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
          <div className="absolute bottom-5 grid gap-3">
            <Settings className="size-5 text-slate-400" />
            <LogOut className="size-5 text-slate-400" />
          </div>
        </aside>

        <main className="min-w-0 px-panel py-layout">
          <div className="mx-auto grid max-w-[92rem] gap-layout xl:grid-cols-[17rem_minmax(0,1fr)]">
            <div className="min-w-0 xl:col-start-2 xl:row-start-1">
              <section className="d360-workspace-banner mb-layout grid gap-layout md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:items-center">
                <div>
                  <h1 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] text-white">Setup & Onboarding</h1>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">Complete your setup to unlock the full power of Digital360.</p>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">Overall Progress</span>
                    <span className="text-slate-300">{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-400" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </section>

              <SetupChecklist activeSlug={activeStep.slug} completedSteps={completedSteps} mode={mode} />

              {mode === "step" ? (
                <section className="mt-layout grid gap-layout 2xl:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
                  <StepChecklist slug={activeStep.slug} />
                  <SetupForm slug={activeStep.slug} onCompleteStep={completeStep} />
                </section>
              ) : (
                <OverviewNextSteps />
              )}
            </div>
            <SetupSidebar progress={progress} />
          </div>
        </main>
      </div>
    </div>
  );
}

function BrandLockup() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative size-14 overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_0_28px_rgba(37,99,235,.28)]">
        <Image src="/brand/digital-360-logo.jpg" alt="Digital360 logo" fill sizes="56px" className="object-cover" priority />
      </div>
      <div>
        <div className="text-xl font-semibold leading-none tracking-normal text-white">Digital360</div>
        <div className="mt-1 text-sm font-medium leading-none text-slate-300">by BrunerDigital</div>
      </div>
    </Link>
  );
}

function SetupSidebar({ progress }: { progress: number }) {
  return (
    <aside className="glass-panel p-card xl:sticky xl:top-28 xl:col-start-1 xl:row-start-1 xl:self-start">
      <div>
        <div className="text-base font-medium text-slate-300">Setup Progress</div>
        <div className="mt-2 text-sm text-slate-400">{progress}% Complete</div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-400" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">Time to Launch</div>
        <div className="mt-2 text-xl font-semibold text-emerald-300">7-14 days</div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">Owner Account</div>
        <div className="mt-5 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-emerald-300/25 bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200 text-xl font-semibold text-slate-950">
            BB
          </div>
          <div className="mt-3 font-semibold text-white">Brittany Blakely</div>
          <div className="mt-1 text-sm text-muted-foreground">info@brunerdigital.com</div>
          <Button variant="outline" className="mt-4 w-full border-white/15 bg-white/[0.03]">Manage Profile</Button>
        </div>
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">Current Workspace</div>
        <div className="glass-inset mt-3 flex items-center justify-between gap-2 p-inset">
          <div>
            <div className="text-sm font-semibold text-white">BrunerDigital</div>
            <div className="text-xs text-muted-foreground">Agency Workspace</div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
        <Button variant="outline" className="mt-3 w-full border-white/15 bg-white/[0.03]">View Workspace</Button>
      </div>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-sm text-slate-400">Helpful Resources</div>
        <div className="mt-3 grid gap-2">
          {["Implementation Guide", "Help Tutorials", "Help Center", "Community"].map((item) => (
            <div key={item} className="flex items-center justify-between text-sm text-slate-300">
              <span>{item}</span>
              <ChevronRight className="size-4 text-slate-600" />
            </div>
          ))}
        </div>
      </div>
      <div className="glass-inset mt-6 p-inset">
        <div className="font-semibold text-white">Need Help?</div>
        <p className="mt-2 text-sm leading-5 text-slate-400">Our team is here to help you succeed.</p>
        <Button variant="outline" className="mt-4 w-full border-white/15 bg-white/[0.03]">Contact Success Team</Button>
      </div>
    </aside>
  );
}

function SetupChecklist({ activeSlug, completedSteps, mode }: { activeSlug: string; completedSteps: string[]; mode: "overview" | "step" }) {
  return (
    <section aria-label="Setup steps">
      <div className="grid gap-3">
        {setupSteps.map((step, index) => {
          const Icon = step.icon;
          const routeActive = mode === "step" && step.slug === activeSlug;
          const presetDone = index < 3 && !routeActive;
          const completed = presetDone || completedSteps.includes(step.slug);
          const active = routeActive || (mode === "overview" && index === 3);
          const pending = !completed && !active;
          const status = completed ? "Completed" : active ? "In Progress" : "Pending";
          const action = completed ? (index === 2 ? "Manage" : "Edit") : active ? "Continue" : index === 8 ? "Review" : index === 6 ? "Create" : index === 7 ? "Set Up" : "Connect";

          return (
            <div
              key={step.slug}
              className={cn(
                "glass-panel grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-3 p-card sm:gap-x-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center",
                active && "glass-panel-featured"
              )}
            >
              <div className={cn("row-span-2 flex size-10 items-center justify-center rounded-md bg-gradient-to-br text-white sm:size-12 lg:row-span-1", rowTone[index])}>
                <Icon className="size-5 sm:size-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">{index + 1}.</span>
                  <h2 className="text-base font-semibold leading-snug text-white">{step.title}</h2>
                </div>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                {active && index === 3 ? (
                  <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2">
                    <div className="text-xs font-semibold text-slate-300">Import Progress</div>
                    <div className="text-xs tabular-nums text-slate-300">62%</div>
                    <div className="col-span-full h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-emerald-300 to-teal-400" />
                    </div>
                    <div className="col-span-full text-xs tabular-nums text-muted-foreground">1,250 of 2,000 records imported</div>
                  </div>
                ) : null}
              </div>
              <div className="col-start-2 flex flex-wrap items-center justify-between gap-2 lg:col-start-auto lg:w-52 lg:flex-nowrap lg:gap-4">
                <div className={cn("flex items-center gap-2 text-sm", completed && "text-emerald-300", active && "text-amber-300", pending && "text-muted-foreground")}>
                  {completed ? <Check className="size-4 shrink-0" /> : <Circle className="size-4 shrink-0" />}
                  {status}
                </div>
                <Button asChild className={cn(active && "bg-blue-600 text-white hover:bg-blue-500")} variant={active ? "default" : "outline"}>
                  <Link href={step.href}>{action}</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function OverviewNextSteps() {
  return (
    <section className="glass-panel mt-layout grid gap-layout p-panel md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
      <div>
        <h2 className="font-semibold text-white">Your next steps</h2>
        <div className="mt-4 grid gap-3">
          {["Complete CRM import to bring in your data", "Connect your calendar to start booking appointments", "Set up automations to save time and scale"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
              <Check className="size-4 text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-5 md:pt-0">
        <h2 className="font-semibold text-white">Need a hand?</h2>
        <p className="mt-2 text-sm leading-5 text-slate-400">Schedule a call with our success team and get expert help.</p>
        <Button variant="outline" className="mt-5 border-white/15 bg-white/[0.035]">
          <Phone className="size-4" />
          Schedule a Call
        </Button>
      </div>
    </section>
  );
}

function StepChecklist({ slug }: { slug: string }) {
  const step = getSetupStep(slug);

  return (
    <section className="glass-panel p-panel">
      <div className="flex items-center gap-3">
        <KeyRound className="size-5 text-blue-300" />
        <div>
          <h2 className="font-semibold text-white">{step.title} checklist</h2>
          <p className="mt-1 text-sm text-slate-400">{step.owner} · {step.duration}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {step.checklist.map((item, index) => (
          <div key={item} className="glass-inset flex items-start gap-3 p-inset">
            <div className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold", index === 0 ? "bg-emerald-400/15 text-emerald-200" : "bg-blue-400/12 text-blue-200")}>
              {index + 1}
            </div>
            <div>
              <div className="font-medium text-white">{item}</div>
              <p className="mt-1 text-sm leading-6 text-slate-400">Capture the decision, validate it with the owner, and write an audit-ready setup note.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SetupForm({ slug, onCompleteStep }: { slug: string; onCompleteStep: (slug: string) => void }) {
  const step = getSetupStep(slug);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const fields = useMemo(() => step.fields, [step.fields]);

  async function submitSetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("saving");
    setMessage("");

    try {
      const response = await fetch("/api/setup-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: step.slug,
          title: step.title,
          fields: data,
          page_url: window.location.href
        })
      });
      const result = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Setup progress could not be saved.");
      }
      onCompleteStep(step.slug);
      setStatus("saved");
      setMessage(result.message ?? "Setup progress saved.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Setup progress could not be saved.");
    }
  }

  return (
    <section className="glass-panel p-panel">
      <div className="flex items-center gap-3">
        <Sparkles className="size-5 text-emerald-300" />
        <div>
          <h2 className="font-semibold text-white">{step.title} details</h2>
          <p className="mt-1 text-sm text-slate-400">These fields are ready to connect to tenant-scoped persistence.</p>
        </div>
      </div>
      <form className="mt-5 grid gap-4" onSubmit={submitSetup}>
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field} className="grid gap-2 text-sm font-medium text-slate-300">
              {field}
              <Input name={field.toLowerCase().replaceAll(" ", "_")} placeholder={field} />
            </label>
          ))}
        </div>
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
          AI setup assistant will summarize this step, flag missing credentials, and recommend the next launch action.
        </div>
        {message ? (
          <div className={cn("rounded-lg border p-3 text-sm", status === "error" ? "border-rose-400/25 bg-rose-400/10 text-rose-100" : "border-emerald-400/25 bg-emerald-400/10 text-emerald-100")}>
            {message}
          </div>
        ) : null}
        <Button disabled={status === "saving"} className="bg-blue-600 text-white hover:bg-blue-500">
          {status === "saving" ? "Saving..." : "Save and continue"}
        </Button>
      </form>
    </section>
  );
}
