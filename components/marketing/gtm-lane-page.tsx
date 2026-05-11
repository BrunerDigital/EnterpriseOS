import Link from "next/link";
import { ArrowRight, BarChart3, Check, ClipboardList, Mail, Megaphone, MessageSquare, Route, ShieldCheck, Sparkles, Target, Workflow } from "lucide-react";
import type { GTMLane } from "@/lib/gtm-lanes";
import { Button } from "@/components/ui/button";
import { CheckList, MarketingShell, SectionHeader } from "@/components/marketing/marketing-shell";

export function GTMLanePage({ lane }: { lane: GTMLane }) {
  return (
    <MarketingShell>
      <main>
        <section className="px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">{lane.headline}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">{lane.subheadline}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-sky-400 text-slate-950 hover:bg-sky-300">
                  <Link href="#gtm-form">
                    {lane.primaryCta}
                    <ArrowRight data-icon="inline-end" className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#funnel">{lane.secondaryCta}</Link>
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {lane.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <div className="text-2xl font-semibold text-white">{metric.value}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <LanePreview lane={lane} />
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeader title="The buying problem this lane solves" body={`This funnel is written for ${lane.audience}, with pain-aware copy and a direct path from campaign click to qualified conversation.`} />
            <div className="grid gap-4 md:grid-cols-2">
              {lane.painPoints.map((point) => (
                <div key={point} className="rounded-lg border border-white/10 bg-slate-950/60 p-5">
                  <Target className="size-5 text-sky-300" />
                  <p className="mt-4 text-sm leading-6 text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Offer stack" body="Each lane has a clear conversion offer, supporting assets, and a fulfillment promise that matches the buyer’s operating reality." />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {lane.offerStack.map((offer, index) => (
                <article key={offer.title} className="glass-panel rounded-lg p-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-sky-400/12 text-sky-300">{index + 1}</div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{offer.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="funnel" className="border-y border-white/10 bg-slate-950/58 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            <FunnelPanel title="Funnel Path" icon={<Route />} items={lane.funnel.sections} />
            <FunnelPanel title="Qualification Rules" icon={<ShieldCheck />} items={lane.funnel.qualification} />
            <FunnelPanel title="Nurture Sequence" icon={<Mail />} items={lane.nurture.map((email) => `${email.day}: ${email.subject}`)} />
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-start">
            <div>
              <SectionHeader title="Campaign assets for launch" body="Use these hooks and scripts to create the first paid, outbound, and retargeting tests for this lane." />
              <div className="mt-8 grid gap-4">
                {lane.ads.map((ad) => (
                  <div key={`${ad.channel}-${ad.hook}`} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                    <div className="flex items-center gap-3 text-sm font-semibold text-sky-300">
                      <Megaphone className="size-4" />
                      {ad.channel}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{ad.hook}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{ad.copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <div className="flex items-center gap-3 text-sky-300">
                  <ClipboardList className="size-5" />
                  <h3 className="text-xl font-semibold text-white">Sales call path</h3>
                </div>
                <div className="mt-5">
                  <CheckList items={lane.salesScript} />
                </div>
              </div>
            </div>
            <ConversionForm lane={lane} />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function LanePreview({ lane }: { lane: GTMLane }) {
  return (
    <div className="glass-panel overflow-hidden rounded-lg p-4 shadow-panel">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-rose-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-emerald-400" />
        </div>
        <div className="text-xs text-slate-500">gtm lane / {lane.name.toLowerCase()}</div>
      </div>
      <div className="grid gap-4 pt-4 lg:grid-cols-[0.82fr_1fr]">
        <div className="rounded-lg border border-white/10 bg-slate-950/70 p-5">
          <div className="flex items-center gap-3 text-sky-300">
            <Sparkles className="size-5" />
            <span className="text-sm font-semibold text-white">{lane.funnel.offer}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">{lane.funnel.conversionGoal}</p>
          <div className="mt-5 grid gap-3">
            {lane.funnel.sections.slice(0, 4).map((step, index) => (
              <div key={step} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm">
                <span>{step}</span>
                <span className="text-xs text-slate-500">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-sky-400/20 bg-sky-400/10 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Workflow className="size-4 text-sky-300" />
              Follow-up engine
            </div>
            <div className="mt-4 space-y-3">
              {lane.nurture.map((email) => (
                <div key={email.subject} className="rounded-md bg-slate-950/55 p-3">
                  <div className="text-xs font-semibold text-sky-300">{email.day}</div>
                  <div className="mt-1 text-sm text-white">{email.subject}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <MiniMetric icon={<MessageSquare />} label="Lead capture" value="CRM routed" />
            <MiniMetric icon={<BarChart3 />} label="Attribution" value="UTM ready" />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/55 p-4">
      <div className="text-sky-300">{icon}</div>
      <div className="mt-3 text-sm font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function FunnelPanel({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center gap-3 text-sky-300">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-300">
            <Check className="mt-1 size-4 shrink-0 text-emerald-300" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConversionForm({ lane }: { lane: GTMLane }) {
  return (
    <form id="gtm-form" className="glass-panel sticky top-24 rounded-lg p-6">
      <div className="flex items-center gap-3 text-sky-300">
        <Sparkles className="size-5" />
        <h2 className="text-2xl font-semibold text-white">{lane.primaryCta}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Conversion goal: {lane.funnel.conversionGoal} Route submissions to {lane.funnel.thankYouPath} after CRM and analytics are connected.
      </p>
      <div className="mt-6 grid gap-4">
        {lane.funnel.fields.map((field) => (
          <label key={field} className="grid gap-2 text-sm font-medium text-slate-300">
            {field}
            <input className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400" placeholder={field} />
          </label>
        ))}
      </div>
      <Button type="button" className="mt-6 w-full bg-sky-400 text-slate-950 hover:bg-sky-300">
        {lane.primaryCta}
      </Button>
    </form>
  );
}
