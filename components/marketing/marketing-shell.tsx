"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, Building2, CalendarClock, Check, ChevronDown, ChevronRight, Lock, Menu, MessageSquare, Search, X, Zap } from "lucide-react";
import { brand } from "@/lib/marketing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" }
];

export function BrandMark() {
  return (
    <Link href="/" aria-label="Digital360 by BrunerDigital home" className="flex items-center gap-3">
      <div className="relative size-14 overflow-hidden rounded-lg border border-white/15 bg-white shadow-[0_0_30px_rgba(59,130,246,.24)]">
        <Image src="/brand/digital-360-logo.jpg" alt="Digital360 logo" fill sizes="56px" className="object-cover" priority />
      </div>
      <div>
        <div className="text-xl font-semibold leading-none tracking-normal text-white">Digital360</div>
        <div className="mt-1 text-sm font-medium leading-none text-slate-300">by BrunerDigital</div>
      </div>
    </Link>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(29,78,216,0.18),transparent_30rem),radial-gradient(circle_at_88%_8%,rgba(45,212,191,0.09),transparent_26rem),linear-gradient(180deg,#030714_0%,#06111f_42%,#02050d_100%)]" />
        <div className="absolute inset-0 grid-fade opacity-60" />
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030814]/84 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-7 lg:flex">
            {marketingNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
                {item.label}
                {item.label === "Solutions" ? <ChevronDown className="ml-1 inline size-3" /> : null}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild className="h-10 rounded-md bg-blue-600 px-6 text-white shadow-[0_0_26px_rgba(37,99,235,.35)] hover:bg-blue-500">
              <Link href="/demo">
                Book a demo
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
            {[...marketingNav, { label: "Book a demo", href: "/demo" }, { label: "Log in", href: "/login" }].map((item) => (
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
    <footer className="border-t border-white/10 bg-[#020711]/86">
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
        <span>© 2026 Digital360 by BrunerDigital. Launch-ready marketing system placeholder.</span>
        <span>Built for white-label SaaS launch, demand generation, and investor-ready demos.</span>
      </div>
    </footer>
  );
}

export function SectionHeader({ title, body, align = "left" }: { title: string; body?: string; align?: "left" | "center" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">{title}</h2>
      {body ? <p className="mt-3 text-sm leading-6 text-slate-400 md:text-base">{body}</p> : null}
    </div>
  );
}

export function ProductMockup({ compact = false }: { compact?: boolean }) {
  const metrics = [
    ["Total Revenue", "$284,600", "+18.6%"],
    ["New Leads", "1,250", "+24.1%"],
    ["Appointments", "320", "+14.7%"],
    ["Conversion", "24.6%", "+8.3%"]
  ];
  const activity = ["Website form submitted", "Appointment booked", "Payment received", "Review received"];

  return (
    <div className={cn("glass-panel relative overflow-hidden rounded-lg p-4 shadow-panel", !compact && "lg:translate-y-3")}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(37,99,235,.18),transparent_20rem)]" />
      <div className="relative grid min-h-[360px] grid-cols-[2.75rem_1fr] overflow-hidden rounded-md border border-white/10 bg-[#050b15]/92">
        <div className="border-r border-white/10 bg-[#050913] p-2">
          <div className="relative mx-auto mb-4 size-7 overflow-hidden rounded-md bg-white">
            <Image src="/brand/digital-360-logo.jpg" alt="" fill sizes="28px" className="object-cover" />
          </div>
          <div className="grid gap-3">
            {[Building2, BarChart3, CalendarClock, MessageSquare, Zap, Lock].map((Icon, index) => (
              <div key={index} className={cn("flex size-8 items-center justify-center rounded-md text-slate-500", index === 0 && "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,.45)]")}>
                <Icon className="size-4" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-white">Command Center</div>
              <div className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-500">Overview</div>
            </div>
            <div className="flex w-48 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-500">
              <Search className="size-3.5" />
              Search
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {metrics.map(([label, value, change]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
                <div className="text-[10px] text-slate-500">{label}</div>
                <div className="mt-2 text-lg font-semibold text-white">{value}</div>
                <div className="mt-1 text-[10px] font-medium text-emerald-300">{change}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Revenue</div>
                <div className="text-[10px] text-slate-500">The month</div>
              </div>
              <svg viewBox="0 0 360 150" className="h-36 w-full" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="mockLineBlue" x1="0" x2="1">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
                {[30, 70, 110].map((y) => <path key={y} d={`M0 ${y}H360`} stroke="rgba(148,163,184,.1)" />)}
                <path d="M0 118 C38 95 58 112 86 82 C114 52 138 78 166 63 C202 42 224 68 256 42 C292 14 312 40 360 16" fill="none" stroke="url(#mockLineBlue)" strokeWidth="4" />
                <path d="M0 126 C44 118 70 122 104 100 C138 82 164 95 198 76 C236 56 276 74 360 44" fill="none" stroke="#4f46e5" strokeWidth="3" opacity=".85" />
              </svg>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
              <div className="text-sm font-semibold text-white">Top Channels</div>
              <div className="mt-5 flex items-center gap-4">
                <div className="relative size-24 rounded-full bg-[conic-gradient(#2563eb_0_40%,#2dd4bf_40%_65%,#f59e0b_65%_85%,#8b5cf6_85%_100%)]">
                  <div className="absolute inset-5 rounded-full bg-[#050b15]" />
                </div>
                <div className="grid flex-1 gap-2 text-[10px] text-slate-400">
                  {["Paid Search", "Direct", "Organic", "Social"].map((item, index) => (
                    <div key={item} className="flex items-center justify-between">
                      <span>{item}</span>
                      <span className="text-white">{[40, 25, 20, 15][index]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-3 text-sm font-semibold text-white">Recent Activity</div>
              {activity.map((item, index) => (
                <div key={item} className="flex items-center justify-between border-t border-white/10 py-2 text-xs first:border-t-0">
                  <span className="text-slate-300">{item}</span>
                  <span className="text-slate-500">{index + 2} min ago</span>
                </div>
              ))}
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-3 text-sm font-semibold text-white">Tasks</div>
              {["Follow up with John Smith", "Revise proposal", "Check in with new lead"].map((item, index) => (
                <div key={item} className="flex items-center justify-between border-t border-white/10 py-2 text-xs first:border-t-0">
                <span>{item}</span>
                  <span className={cn("font-semibold", index === 0 ? "text-rose-300" : index === 1 ? "text-amber-300" : "text-sky-300")}>{["High", "Medium", "Low"][index]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Use Digital360 to move faster from positioning to pipeline, from campaigns to conversion, and from service delivery to measurable proof.</p>
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

