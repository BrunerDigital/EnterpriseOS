"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, Building2, CalendarClock, Check, ChevronRight, Lock, Menu, MessageSquare, Sparkles, X, Zap } from "lucide-react";
import { brand, navItems } from "@/lib/marketing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="EnterpriseOS home">
      <div className="flex size-10 items-center justify-center rounded-lg bg-sky-400 text-slate-950 shadow-glow">
        <Sparkles className="size-5" />
      </div>
      <div className="leading-tight">
        <div className="text-base font-semibold tracking-normal text-white">{brand.name}</div>
        <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">White-label suite</div>
      </div>
    </Link>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,0.22),transparent_31rem),radial-gradient(circle_at_82%_8%,rgba(99,102,241,0.18),transparent_28rem),linear-gradient(135deg,#020617_0%,#07111f_46%,#020617_100%)]" />
        <div className="absolute inset-0 grid-fade opacity-80" />
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/72 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-sky-400 text-slate-950 hover:bg-sky-300">
              <Link href="/demo">
                Book demo
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
          </div>
          <button className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      {open ? (
        <div className="fixed inset-0 z-[60] bg-slate-950/96 p-5 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between">
            <BrandMark />
            <button className="inline-flex size-10 items-center justify-center rounded-md border border-white/10" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-10 grid gap-3">
            {[...navItems, { label: "Book Demo", href: "/demo" }, { label: "Start Trial", href: "/signup" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-4 text-lg font-semibold">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
      {children}
      <Footer />
    </div>
  );
}

export function Footer() {
  const columns = [
    { title: "Platform", links: [["Features", "/features"], ["Pricing", "/pricing"], ["Integrations", "/integrations"], ["Security", "/security"]] },
    { title: "Solutions", links: [["Agencies", "/agency"], ["Local services", "/solutions/local-service-businesses"], ["Franchises", "/solutions/franchises"], ["Marketing teams", "/solutions/marketing-teams"]] },
    { title: "Resources", links: [["Resources", "/resources"], ["Help center", "/help"], ["Comparison", "/comparison"], ["Use cases", "/use-cases"]] },
    { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"]] }
  ];

  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">{brand.oneLiner}</p>
          <div className="mt-6 rounded-lg border border-sky-400/20 bg-sky-400/10 p-4 text-sm text-sky-100">
            Analytics, pixels, CRM webhooks, payments, and email sending are intentionally placeholder-ready until production credentials are connected.
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <div className="text-sm font-semibold text-white">{column.title}</div>
              <div className="mt-4 grid gap-3">
                {column.links.map(([label, href]) => (
                  <Link key={href} href={href} className="text-sm text-slate-400 transition hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/10 px-4 py-6 text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <span>© 2026 EnterpriseOS. Launch-ready marketing system placeholder.</span>
        <span>Built for white-label SaaS launch, demand generation, and investor-ready demos.</span>
      </div>
    </footer>
  );
}

export function SectionHeader({ title, body, align = "left" }: { title: string; body?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{body}</p> : null}
    </div>
  );
}

export function ProductMockup({ compact = false }: { compact?: boolean }) {
  const pipeline = ["New lead", "AI qualified", "Demo booked", "Proposal", "Won"];

  return (
    <div className={cn("glass-panel relative overflow-hidden rounded-lg p-3 shadow-panel", !compact && "lg:translate-y-5")}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-rose-400" />
          <div className="size-3 rounded-full bg-amber-300" />
          <div className="size-3 rounded-full bg-emerald-400" />
        </div>
        <div className="text-xs font-medium text-slate-500">enterpriseos.app / command-center</div>
      </div>
      <div className="grid gap-3 p-3 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Revenue cockpit</div>
              <div className="text-xs text-slate-500">Apex Growth Agency</div>
            </div>
            <div className="rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">Live</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["$428k", "Pipeline"],
              ["41%", "Booked lift"],
              ["18m", "Reply time"],
              ["4.8", "Review score"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                <div className="text-xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {pipeline.map((stage, index) => (
              <div key={stage} className="flex items-center gap-3">
                <div className="w-24 text-xs text-slate-400">{stage}</div>
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-300" style={{ width: `${92 - index * 13}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold"><MessageSquare className="size-4 text-sky-300" /> Unified inbox</div>
              <span className="text-xs text-slate-500">AI draft ready</span>
            </div>
            {["New lead from audit funnel", "Missed call follow-up", "Review request approved"].map((item, index) => (
              <div key={item} className="mb-2 flex items-center justify-between rounded-md border border-white/10 bg-slate-950/55 p-3 text-sm">
                <span>{item}</span>
                <span className={cn("text-xs", index === 0 ? "text-sky-300" : "text-slate-500")}>{index === 0 ? "Now" : `${index + 2}m`}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <MiniPanel icon={<Zap className="size-4" />} title="Automation" text="Speed-to-lead sequence active" />
            <MiniPanel icon={<CalendarClock className="size-4" />} title="Calendar" text="12 demos booked this week" />
            <MiniPanel icon={<BarChart3 className="size-4" />} title="Reporting" text="Source ROI by workspace" />
            <MiniPanel icon={<Lock className="size-4" />} title="White-label" text="Client portal branded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPanel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/55 p-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="text-sky-300">{icon}</span>
        {title}
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-sky-400/20 bg-gradient-to-br from-sky-400/16 via-slate-900 to-emerald-400/10 p-8 shadow-panel md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">Build the launch system once. Scale it across every client, team, and location.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Use EnterpriseOS to move faster from positioning to pipeline, from campaigns to conversion, and from service delivery to measurable proof.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild size="lg" className="bg-sky-400 text-slate-950 hover:bg-sky-300">
              <Link href="/signup">Start free trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/demo">Book demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Check className="size-3.5" />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function LinkArrow({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200">
      {children}
      <ChevronRight className="size-4" />
    </Link>
  );
}

export const featureIcons = [Building2, Zap, MessageSquare, CalendarClock, BarChart3, Lock];
