import Link from "next/link";
import { ArrowRight, BarChart3, Check, Globe2, ShieldCheck, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/marketing";
import { CheckList, CtaBand, MarketingShell, ProductMockup, SectionHeader } from "@/components/marketing/marketing-shell";

const onboardingSteps = [
  "Set the Digital360 brand, domain, and sender identity.",
  "Create the first client workspace and operating model.",
  "Invite the team with agency, workspace, billing, and client roles.",
  "Import CRM data and map the pipeline, inbox, and calendar.",
  "Launch the first funnel, automation, dashboard, and client portal."
];

const trustItems = [
  "CRM, conversations, automations, calendars, funnels, reputation, billing, portals, and reporting.",
  "White-label agency controls with tenant, workspace, user, role, and permission architecture.",
  "Supabase-backed auth, protected app routes, seeded demo data, and production deployment flow.",
  "Mock-ready integrations for Stripe, Twilio, SendGrid/Mailgun, Google, Meta, GBP, and OpenAI."
];

const workflowRows = [
  ["Capture", "Forms, landing pages, UTMs, source tracking", "Lead record created"],
  ["Respond", "AI reply suggestions, SMS/email inbox, task routing", "Speed-to-lead protected"],
  ["Book", "Calendar routing, reminders, no-show recovery", "Appointment pipeline updated"],
  ["Convert", "Deals, stages, notes, proposals, invoices", "Revenue attribution visible"],
  ["Retain", "Reviews, portals, reporting, billing, expansion", "Client value proven"]
];

const implementationTracks = [
  { title: "Agency control", body: "Brand, white-label settings, client workspaces, roles, audit logs, and launch governance.", icon: <ShieldCheck /> },
  { title: "Revenue operations", body: "Contacts, companies, deals, pipelines, campaigns, automations, inbox, and calendar workflows.", icon: <Workflow /> },
  { title: "Client proof", body: "Reporting dashboards, reputation module, invoices, client portal, and AI dashboard insights.", icon: <BarChart3 /> },
  { title: "Go-live stack", body: "Supabase, Vercel, Cloudflare DNS plan, SMTP, Stripe, Twilio, email, Google, Meta, GBP, OpenAI.", icon: <Globe2 /> }
];

export function PreLoginLanding() {
  return (
    <MarketingShell>
      <main>
        <section className="relative px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Your growth operating system, fully connected.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
                Digital360 by BrunerDigital brings CRM, conversations, automations, calendars, funnels, reputation,
                reporting, billing, portals, and AI assistance into one premium white-label workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-sky-400 text-slate-950 hover:bg-sky-300">
                  <Link href="/onboarding">
                    Start guided setup
                    <ArrowRight data-icon="inline-end" className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Open app</Link>
                </Button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {trustItems.map((item) => (
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

        <section className="border-y border-white/10 bg-white/[0.025] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="One connected workflow from lead to proof" body="Digital360 is organized around the revenue path your team actually runs every day." />
            <div className="mt-10 overflow-hidden rounded-lg border border-white/10">
              {workflowRows.map(([stage, system, outcome], index) => (
                <div key={stage} className="grid gap-4 border-t border-white/10 bg-white/[0.025] p-5 first:border-t-0 md:grid-cols-[0.35fr_1fr_0.55fr] md:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-sky-400/12 text-sm font-semibold text-sky-200">{index + 1}</div>
                    <div className="font-semibold text-white">{stage}</div>
                  </div>
                  <div className="text-sm leading-6 text-slate-400">{system}</div>
                  <div className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-100">{outcome}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionHeader title="Built around the implementation, not just the demo" body="The system now has a real front door, protected app, setup console, role model, Supabase project, and deployment path." />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {implementationTracks.map((track) => (
                  <InfoPanel key={track.title} icon={track.icon} title={track.title} text={track.body} />
                ))}
              </div>
            </div>
            <SignupForm />
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-950/58 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeader title="Guided setup turns launch into a checklist" body="Every setup step maps to a real product surface, external credential, or operational decision." />
            <div className="grid gap-4 md:grid-cols-5">
              {onboardingSteps.map((step, index) => (
                <div key={step} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex size-9 items-center justify-center rounded-md bg-sky-400/12 text-sm font-semibold text-sky-300">{index + 1}</div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title="Launch paths for the first rollout" body="Start with one workspace, expand into white-label operations, then layer in integrations and automation." />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className="glass-panel rounded-lg p-6">
                  <div className="text-sm font-semibold text-sky-300">{plan.bestFor}</div>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{plan.name}</h3>
                  <div className="mt-4 text-4xl font-semibold text-white">{plan.price}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{plan.note}</p>
                  <div className="mt-6">
                    <CheckList items={plan.features} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
    </MarketingShell>
  );
}

function InfoPanel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <div className="text-sky-300">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function SignupForm() {
  const fields = [
    ["name", "Name", "text"],
    ["email", "Work email", "email"],
    ["company", "Company", "text"],
    ["phone", "Phone", "tel"],
    ["use_case", "Primary use case", "text"],
    ["current_stack", "Current tools", "text"],
    ["launch_goal", "Launch goal", "text"],
    ["timeline", "Timeline", "text"]
  ];

  return (
    <form id="signup" data-lead-form action="/api/leads" data-source="Pre-login signup and onboarding" data-thank-you="/signup/thank-you/" className="glass-panel rounded-lg p-6">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="source" value="Pre-login signup and onboarding" />
      <div className="flex items-center gap-3 text-sky-300">
        <Zap className="size-5" />
        <h2 className="text-2xl font-semibold text-white">Start your Digital360 setup</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">Create the intake record your team needs to configure the workspace, GTM lane, first funnel, and first automation.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <label key={name} className="grid gap-2 text-sm font-medium text-slate-300">
            {label}
            <input name={name} type={type} required={["name", "email", "company"].includes(name)} className="h-11 rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400" placeholder={label} />
          </label>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
        <div className="flex items-start gap-3 text-sm leading-6 text-emerald-100">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" />
          Submitting this creates a lead record, stores source attribution, and can forward to your CRM webhook when configured.
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full bg-sky-400 text-slate-950 hover:bg-sky-300">Create setup brief</Button>
      <div data-lead-status className="mt-4 min-h-5 text-sm font-semibold text-emerald-300" />
      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
        Already have access?
        <Link href="/login" className="font-semibold text-sky-300 hover:text-sky-200">Log in</Link>
      </div>
    </form>
  );
}
