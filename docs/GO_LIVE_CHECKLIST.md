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
- [x] Public lead capture creates or updates CRM company/contact records in Supabase.
- [x] UTM/source fields are supported.
- [x] Honeypot spam protection is implemented.
- [x] Optional webhook forwarding via `LEADS_WEBHOOK_URL` is implemented.
- [x] SendGrid/Mailgun/webhook notification fanout is implemented.
- [x] Production test lead endpoint has been verified.
- [x] Lead notification fanout can read saved tenant config from `/settings/config`.
- [ ] Connect webhook to CRM, Make/Zapier, Slack, or email alert destination.
- [ ] Add `LEADS_NOTIFICATION_EMAIL` and sender credentials if email alerts are preferred.
- [ ] Define lead owner and 10-minute launch-day response SLA.

## Analytics And Tracking

- [x] Add conditional tracking loaders for Vercel Analytics, Google Analytics, Google Ads, Meta Pixel, and LinkedIn Insight Tag.
- [x] Public tracking loader can read safe analytics and pixel IDs from `/settings/config`.
- [ ] Add production analytics/pixel IDs in Vercel.
- [ ] Verify `demo_requested` and paid conversion events in each platform.
- [ ] Confirm cookie/consent approach if required.

## Product Demo

- [x] Onboarding console exists for setup walkthroughs.
- [x] Dashboard, CRM, deals, conversations, calendars, campaigns, automations, funnels, forms, reputation, payments, reporting, portal, agency admin, white-label, team, integrations, billing, and help pages exist.
- [x] Demo mode data and dashboards are available.
- [ ] Confirm the exact walkthrough script and demo account.
- [ ] Record a 60-90 second screen demo for social follow-up.

## Integrations

- [x] Mock integration structure exists for Stripe, Twilio, SendGrid/Mailgun, Google Calendar, Meta, Google Business Profile, and OpenAI.
- [x] Protected API foundations exist for OpenAI, Stripe checkout, and Twilio outbound SMS.
- [x] Production internal API tokens are configured in Vercel for AI, billing, and messaging.
- [x] Integration readiness dashboard exists in the app.
- [x] Admin platform config center exists at `/settings/config` for credentials, account IDs, webhooks, notes, and datapoints.
- [ ] Confirm `CONFIG_ENCRYPTION_KEY` is set in Vercel production before saving provider secrets.
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
- [ ] Enter live third-party credentials in `/settings/config`.
- [ ] Add uptime monitoring.
- [ ] Add support inbox and escalation owner.
- [ ] Keep a rollback deployment available in Vercel.
