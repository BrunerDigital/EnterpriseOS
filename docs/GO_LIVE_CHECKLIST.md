# Go-Live Checklist

Status for May 26, 2026: ready for public launch visibility, demo capture, and sales walkthroughs. External credentials and legal/pixel confirmations should be finished before heavy paid spend.

## Public Website

- [x] Digital360 name, BrunerDigital branding, and logo applied.
- [x] Premium launch landing page built with direct walkthrough CTA.
- [x] Lead form submits to `/api/leads`.
- [x] Lead form redirects to `/demo/thank-you/`.
- [x] OG image generated at `/og/brunerdigital-og.png`.
- [x] Social creative generated in `/public/social`.
- [x] Sitemap, robots, privacy, and terms routes exist.
- [ ] Final legal review of privacy, terms, email consent, and SMS consent.

## Data And Leads

- [x] Supabase-ready lead capture is implemented.
- [x] UTM/source fields are supported.
- [x] Honeypot spam protection is implemented.
- [x] Optional webhook forwarding via `LEADS_WEBHOOK_URL` is implemented.
- [ ] Send a production test lead after deploy.
- [ ] Connect webhook to CRM, Make/Zapier, Slack, or email alert destination.
- [ ] Define lead owner and 10-minute launch-day response SLA.

## Analytics And Tracking

- [ ] Add Vercel Analytics or preferred analytics.
- [ ] Add Google Analytics if desired.
- [ ] Add Meta Pixel before Meta paid traffic.
- [ ] Add LinkedIn Insight Tag before LinkedIn paid traffic.
- [ ] Add Google Ads conversion tag before search campaigns.
- [ ] Confirm cookie/consent approach if required.

## Product Demo

- [x] Onboarding console exists for setup walkthroughs.
- [x] Dashboard, CRM, deals, conversations, calendars, campaigns, automations, funnels, forms, reputation, payments, reporting, portal, agency admin, white-label, team, integrations, billing, and help pages exist.
- [x] Demo mode data and dashboards are available.
- [ ] Confirm the exact walkthrough script and demo account.
- [ ] Record a 60-90 second screen demo for social follow-up.

## Integrations

- [x] Mock integration structure exists for Stripe, Twilio, SendGrid/Mailgun, Google Calendar, Meta, Google Business Profile, and OpenAI.
- [ ] Add production Stripe keys and webhook signatures.
- [ ] Add Twilio messaging credentials and compliance copy.
- [ ] Add SendGrid/Mailgun sender domain authentication.
- [ ] Add Google Calendar OAuth credentials.
- [ ] Add Meta app/pixel/ad account access.
- [ ] Add Google Business Profile access.
- [ ] Add OpenAI API key and usage limits.

## Operations

- [x] Vercel production project is linked.
- [x] Custom subdomain path is established.
- [ ] Confirm production environment variables in Vercel.
- [ ] Add uptime monitoring.
- [ ] Add support inbox and escalation owner.
- [ ] Keep a rollback deployment available in Vercel.
