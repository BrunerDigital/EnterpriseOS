import Link from "next/link";
import { articles } from "@/lib/editorial";
import { ArrowRight, Building2, CalendarClock, Check, FileText, Mail, Megaphone, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";
import { adSystem, allPages, contentSystem, copyLibrary, emailSequences, flowSteps, funnelTemplates, launchChecklists, pricingPlans, salesEnablement, visualLibrary, type FlowStep, type FunnelTemplate, type MarketingPage } from "@/lib/marketing";
import { Button } from "@/components/ui/button";
import { CtaBand, CheckList, LinkArrow, MarketingShell, ProductMockup, SectionHeader } from "@/components/marketing/marketing-shell";

export function MarketingPageView({ page }: { page: MarketingPage }) {
  return (
    <MarketingShell>
      <main>
        <Hero page={page} />
        {page.slug === "/resources" ? <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"><h2 className="text-3xl font-semibold">Field notes for connected business</h2><div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{articles.map(article => <article key={article.slug} className="rounded-xl border border-white/15 bg-white/[0.035] p-6"><p className="text-sm text-emerald-300">{article.category}</p><h3 className="mt-3 text-xl font-semibold"><Link href={`/resources/${article.slug}`} className="underline-offset-4 hover:underline">{article.title}</Link></h3><p className="mt-4 text-sm leading-7 text-slate-300">{article.description}</p></article>)}</div></section> : null}
        {page.slug === "/pricing" ? <PricingSection /> : null}
        {page.slug === "/features" ? <FeatureIndex /> : null}
        {page.slug === "/resources" ? <ResourceLibrary /> : null}
        {page.slug === "/comparison" ? <ComparisonTable /> : null}
        <ContentSections page={page} />
        <FaqSection page={page} />
        <CtaBand />
      </main>
    </MarketingShell>
  );
}

function Hero({ page }: { page: MarketingPage }) {
  const demoHref = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "/demo";

  return (
    <section className="relative px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">{page.headline}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">{page.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-sky-400 text-slate-950 hover:bg-sky-300">
              <Link href={demoHref}>
                Request a walkthrough
                <ArrowRight data-icon="inline-end" className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={page.secondaryCta?.toLowerCase().includes("pricing") ? "/pricing" : demoHref}>{page.secondaryCta ?? "Book demo"}</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {page.bullets.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                  <Check className="size-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <ProductMockup />
      </div>
    </section>
  );
}

function ContentSections({ page }: { page: MarketingPage }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Explore the workflow" body="These sections describe the product direction. Review current availability and discuss the first workflow you need." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.title} className="glass-panel rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{section.body}</p>
              <div className="mt-5">
                <CheckList items={section.points} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ page }: { page: MarketingPage }) {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader align="center" title="Questions before a rollout" body="Bring your requirements to a walkthrough so we can confirm fit, availability, and next steps." />
        <div className="mt-10 grid gap-4">
          {(page.faqs ?? []).map((faq) => (
            <div key={faq.q} className="rounded-lg border border-white/10 bg-slate-950/58 p-5">
              <h3 className="font-semibold text-white">{faq.q}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const demoHref = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL || "/demo";

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-7 max-w-3xl text-base leading-7 text-slate-300">These are intended workspace options. Pricing, feature availability, implementation, and provider usage are confirmed in a scoped discussion. This page does not start a subscription.</p>
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div key={plan.name} className={`rounded-lg border p-6 ${index === 1 ? "border-sky-400/50 bg-sky-400/10 shadow-glow" : "border-white/10 bg-white/[0.035]"}`}>
              <div className="text-sm font-semibold text-sky-300">{plan.bestFor}</div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{plan.name}</h2>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-semibold">Discuss scope</span>
              </div>
              <div className="mt-6">
                <CheckList items={plan.features} />
              </div>
              <Button asChild className="mt-8 w-full bg-sky-400 text-slate-950 hover:bg-sky-300">
                <Link href={demoHref}>Discuss fit and availability</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIndex() {
  const links = [
    ["/features/crm", "CRM", "Contacts, companies, pipelines, notes, tasks, and ownership."],
    ["/features/ai-automation", "AI Automation", "Follow-up, qualification, summaries, and workflow triggers."],
    ["/features/conversations", "Conversations", "Team inbox for SMS, email, forms, chat, and internal notes."],
    ["/features/funnel-builder", "Funnel Builder", "Landing pages, forms, calendars, attribution, and thank-you paths."],
    ["/features/calendar-scheduling", "Calendar", "Routing, reminders, no-show recovery, and appointment reporting."],
    ["/features/reputation", "Reputation", "Review requests, monitoring, response workflows, and reporting."],
    ["/features/reporting", "Reporting", "Dashboards for pipeline, campaigns, reviews, revenue, and locations."]
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Feature library" body="Each feature page is written as a conversion-ready sales asset and implementation reference." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map(([href, title, body]) => (
            <Link key={href} href={href} className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-sky-400/40 hover:bg-sky-400/10">
              <Sparkles className="size-5 text-sky-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">Open page <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceLibrary() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
        <AssetPanel title="90-day calendar" icon={<CalendarClock />} items={contentSystem.calendar} />
        <AssetPanel title="SEO clusters" icon={<FileText />} items={contentSystem.keywordClusters} />
        <AssetPanel title="Lead magnets" icon={<Megaphone />} items={contentSystem.leadMagnets} />
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    ["CRM only", "Stores contacts", "Adds automations, funnels, calendars, reputation, reporting, portals, and billing"],
    ["Marketing tool", "Launches campaigns", "Connects campaigns to pipeline, conversations, appointments, and revenue"],
    ["Custom stack", "Flexible but fragile", "Standardizes the operating model while preserving brand control"]
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-white/10">
        <div className="grid grid-cols-3 bg-white/[0.06] text-sm font-semibold text-white">
          <div className="p-4">Alternative</div>
          <div className="p-4">Typical role</div>
          <div className="p-4">Digital360 advantage</div>
        </div>
        {rows.map((row) => (
          <div key={row[0]} className="grid grid-cols-3 border-t border-white/10 text-sm text-slate-300">
            {row.map((cell) => (
              <div key={cell} className="p-4">{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function AssetPanel({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center gap-3 text-sky-300">
        {icon}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-5 grid gap-3">
        {items.slice(0, 8).map((item) => (
          <p key={item} className="rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-400">{item}</p>
        ))}
      </div>
    </div>
  );
}

export function FunnelPageView({ funnel }: { funnel: FunnelTemplate }) {
  return (
    <MarketingShell>
      <main>
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <h1 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">{funnel.title}</h1>
              <p className="mt-5 text-xl leading-8 text-slate-300">{funnel.offer}</p>
              <p className="mt-4 text-base leading-7 text-slate-400">{funnel.hook}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <AssetPanel title="Funnel sections" icon={<Workflow />} items={funnel.sections} />
                <AssetPanel title="Follow-up plan" icon={<Mail />} items={funnel.followUp} />
              </div>
            </div>
            <LeadForm title="Capture template" fields={funnel.formFields} cta="Use this funnel" />
          </div>
        </section>
        <CtaBand />
      </main>
    </MarketingShell>
  );
}

export function FlowPageView({ flow }: { flow: FlowStep }) {
  const demoHref = process.env.NEXT_PUBLIC_DEMO_BOOKING_URL;
  const isDemoThankYou = flow.slug === "/demo/thank-you";

  return (
    <MarketingShell>
      <main>
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_0.75fr] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-sm font-semibold text-sky-200">{flow.title}</div>
              <h1 className="text-4xl font-semibold tracking-normal text-white md:text-6xl">{flow.headline}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-300">{flow.body}</p>
              {isDemoThankYou && demoHref ? (
                <Button asChild size="lg" className="mt-7 bg-sky-400 text-slate-950 hover:bg-sky-300">
                  <Link href={demoHref}>
                    Pick a calendar time
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
              <div className="mt-8 glass-panel rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white">Flow checklist</h2>
                <div className="mt-5">
                  <CheckList items={flow.checklist} />
                </div>
              </div>
            </div>
            <LeadForm title={flow.title} fields={flow.fields} cta={flow.cta} walkthrough={flow.slug === "/demo"} />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

function LeadForm({ title, fields, cta, walkthrough = false }: { title: string; fields: string[]; cta: string; walkthrough?: boolean }) {
  return (
    <form data-lead-form={walkthrough ? undefined : true} data-walkthrough-form={walkthrough ? true : undefined}
      action={walkthrough ? "/api/walkthroughs" : "/api/leads"} method={walkthrough ? "post" : undefined}
      data-source={title} data-thank-you="/demo/thank-you/" className="glass-panel rounded-lg p-6">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      {walkthrough ? null : <><input type="hidden" name="source" value={title} />
        <input type="hidden" name="thank_you_path" value="/demo/thank-you/" /></>}
      <h2 className="text-2xl font-semibold text-white">{walkthrough ? "Walkthrough request" : title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{walkthrough ? "Tell us what you want to evaluate. We’ll follow up about fit and scheduling." : "Submit this form to create a lead record, capture source attribution, and forward into the configured CRM/webhook path."}</p>
      <div className="mt-6 grid gap-4">
        {fields.map((field) => (
          <label key={field} className="grid gap-2 text-sm font-medium text-slate-300">
            {field}
            <input name={field.toLowerCase().replaceAll(" ", "_")} required={walkthrough && (field === "Name" || field === "Company")}
              className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400" placeholder={field} />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-medium text-slate-300">
          Work email
          <input name="email" type="email" required className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400" placeholder="you@company.com" />
        </label>
        <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.025] p-3 text-xs leading-5 text-slate-400">
          <input name="contact_consent" value="yes" required type="checkbox" className="mt-1 size-4 rounded border-white/20 bg-slate-950" />
          {walkthrough
            ? <span>I agree BrunerDigital may contact me about this walkthrough request. <Link href="/legal/privacy" className="underline">Privacy policy</Link></span>
            : <span>I agree BrunerDigital may contact me about Digital360 using the information I submit. I can opt out of marketing messages at any time.</span>}
        </label>
      </div>
      <Button type="submit" disabled={walkthrough} className="mt-6 w-full bg-sky-400 text-slate-950 hover:bg-sky-300">{cta}</Button>
      {walkthrough ? <noscript><p className="mt-3 text-sm text-slate-300">Enable JavaScript to use this form or <Link href="/contact" className="underline">contact BrunerDigital</Link>.</p></noscript> : null}
      <div data-lead-status role="status" className="mt-4 min-h-5 text-sm font-semibold text-emerald-300" />
    </form>
  );
}

export function LibraryIndexPage() {
  return (
    <MarketingShell>
      <main>
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Digital360 launch asset library" body="A screenshot-ready command center for copy, funnels, email, paid ads, sales enablement, visual direction, and launch checklists." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <AssetPanel title="Copy hooks" icon={<Sparkles />} items={[...copyLibrary.headlines, ...copyLibrary.ctas]} />
              <AssetPanel title="Email sequences" icon={<Mail />} items={emailSequences.map((sequence) => `${sequence.name}: ${sequence.emails.length} emails`)} />
              <AssetPanel title="Paid ads" icon={<Megaphone />} items={[...adSystem.metaConcepts, ...adSystem.linkedInAds]} />
              <AssetPanel title="Sales enablement" icon={<Users />} items={[...salesEnablement.deckOutline, ...salesEnablement.discoveryQuestions.slice(0, 3)]} />
              <AssetPanel title="Visual assets" icon={<Building2 />} items={visualLibrary} />
              <AssetPanel title="Launch checklists" icon={<ShieldCheck />} items={Object.entries(launchChecklists).map(([key, value]) => `${key}: ${value.slice(0, 3).join(", ")}`)} />
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Object.values(allPages).map((page) => <LinkArrow key={page.slug} href={page.slug}>{page.slug}</LinkArrow>)}
              {funnelTemplates.map((funnel) => <LinkArrow key={funnel.slug} href={funnel.slug}>{funnel.slug}</LinkArrow>)}
              {flowSteps.map((flow) => <LinkArrow key={flow.slug} href={flow.slug}>{flow.slug}</LinkArrow>)}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

