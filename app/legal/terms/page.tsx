import { MarketingShell } from "@/components/marketing/marketing-shell";

export default function Page() {
  const sections = [
    {
      title: "Use of Digital360",
      body:
        "Digital360 by BrunerDigital is provided for business use by agencies, service businesses, franchises, consultants, and growth teams. Users are responsible for keeping account credentials secure and using the platform lawfully."
    },
    {
      title: "Accounts and access",
      body:
        "Access may be invite-only during launch. Organizations are responsible for assigning appropriate roles, removing users who no longer need access, and maintaining accurate workspace and billing information."
    },
    {
      title: "Communications and compliance",
      body:
        "Customers are responsible for obtaining required consent before sending email, SMS, review requests, or advertising messages through connected providers. Production messaging should comply with CAN-SPAM, TCPA, carrier rules, platform policies, and other applicable laws."
    },
    {
      title: "Third-party services",
      body:
        "Digital360 is structured to connect with services such as Supabase, Vercel, Stripe, Twilio, SendGrid, Mailgun, Google Calendar, Meta, Google Business Profile, OpenAI, and webhook automation tools. Those services may have separate terms, fees, limits, and compliance requirements."
    },
    {
      title: "Payments and subscriptions",
      body:
        "Paid plans, invoices, subscriptions, and usage limits should be confirmed in the final order form, proposal, or checkout flow. Billing modules are connection-ready until production Stripe credentials and plan IDs are configured."
    },
    {
      title: "Disclaimers and limitation",
      body:
        "Digital360 is provided without guarantees of specific revenue, ranking, advertising, review, or conversion outcomes. Liability terms should be finalized in a signed customer agreement before enterprise rollout."
    }
  ];

  return (
    <MarketingShell>
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Last updated May 26, 2026</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Terms of Service</h1>
        <p className="mt-5 text-slate-400">
          These terms are launch-ready operating terms for Digital360 by BrunerDigital. They should be reviewed by counsel before paid enterprise contracts, reseller agreements, regulated industries, or high-volume messaging.
        </p>
        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{section.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-sky-400/20 bg-sky-400/10 p-5 text-sm leading-7 text-sky-100">
          Business contact: info@brunerdigital.com
        </div>
      </main>
    </MarketingShell>
  );
}
