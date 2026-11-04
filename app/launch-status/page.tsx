import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { launchReadiness } from "@/lib/launch-readiness";

export const metadata: Metadata = {
  title: "Private launch and availability",
  description: "What is available today, what is being built, and how to explore Digital360 with BrunerDigital.",
  alternates: { canonical: "/launch-status" }
};

export default function LaunchStatusPage() {
  return <MarketingShell><main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">{launchReadiness.phase} · Reviewed November 4, 2026</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl">A clear view of what is available.</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{launchReadiness.summary}</p>
    <div className="mt-10 grid gap-4 md:grid-cols-2">{launchReadiness.capabilities.map(item => <article key={item.name} className="rounded-xl border border-white/15 bg-white/[0.035] p-6">
      <p className="text-sm font-semibold text-emerald-300">{item.status}</p><h2 className="mt-2 text-xl font-semibold">{item.name}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
    </article>)}</div>
    <section className="mt-12 rounded-xl border border-blue-400/25 bg-blue-400/10 p-6 sm:p-8"><h2 className="text-2xl font-semibold">Start with the workflow you need.</h2><p className="mt-3 max-w-3xl leading-7 text-slate-300">Tell us about your business, existing tools, and the first problem you want to solve. We will discuss fit, implementation, and commercial scope before a rollout. Illustrative screens and sample metrics show the intended experience; they are not customer results.</p><div className="mt-6 flex flex-wrap gap-5"><Link className="font-semibold text-emerald-300 underline underline-offset-4" href="/demo">Request a walkthrough</Link><Link className="font-semibold underline underline-offset-4" href="/brunerdigital">Explore BrunerDigital services</Link><Link className="underline underline-offset-4" href="/login">Existing user sign-in</Link></div></section>
  </main></MarketingShell>;
}
