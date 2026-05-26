import { MarketingShell } from "@/components/marketing/marketing-shell";

export default function Page() {
  const sections = [
    {
      title: "Information we collect",
      body:
        "Digital360 by BrunerDigital may collect contact details, company information, submitted form responses, calendar preferences, workspace setup details, usage events, device/browser metadata, referral sources, and UTM parameters."
    },
    {
      title: "How we use information",
      body:
        "We use submitted information to respond to demo requests, prepare walkthroughs, operate the platform, route leads, improve onboarding, protect the service, measure marketing performance, and communicate about Digital360."
    },
    {
      title: "Cookies and analytics",
      body:
        "The site can load analytics and advertising tags only when the related environment variables are configured. These may include Google Analytics, Google Ads, Meta Pixel, LinkedIn Insight Tag, and Vercel Analytics."
    },
    {
      title: "Service providers",
      body:
        "Digital360 is structured to work with Supabase, Vercel, Stripe, Twilio, SendGrid, Mailgun, Google Calendar, Meta, Google Business Profile, OpenAI, and webhook automation platforms when credentials are connected."
    },
    {
      title: "Data security",
      body:
        "We use role-based access controls, tenant isolation patterns, audit logs, protected server-side secrets, and secure transport. No system can be guaranteed perfectly secure, so production customers should review security requirements before launch."
    },
    {
      title: "Your choices",
      body:
        "You may request access, correction, deletion, or marketing opt-out by contacting BrunerDigital. SMS and email communications should include the legally required opt-out language when those channels are activated."
    }
  ];

  return (
    <MarketingShell>
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">Last updated May 26, 2026</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Privacy Policy</h1>
        <p className="mt-5 text-slate-400">
          This policy explains how BrunerDigital handles information submitted through Digital360 public pages and launch workflows. It is operational launch copy and should be reviewed by counsel before regulated, enterprise, SMS, or paid-media scale.
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
          Privacy contact: info@brunerdigital.com
        </div>
      </main>
    </MarketingShell>
  );
}
