import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";

export default function Page() {
  return (
    <MarketingShell>
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Digital360 private launch</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Thank you for your interest.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Our team reviews walkthrough requests and follows up by work email about fit and scheduling.
        </p>
        <div className="mt-7 flex flex-wrap gap-5">
          <Link href="/launch-status" className="font-semibold text-emerald-300 underline">Review availability</Link>
          <Link href="/resources" className="font-semibold text-white underline">Explore Digital360 resources</Link>
        </div>
      </main>
    </MarketingShell>
  );
}
