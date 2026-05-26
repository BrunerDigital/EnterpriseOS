# Digital360 Public Launch Today

Launch date: May 26, 2026  
Primary URL: https://digital360.brunerdigital.com  
Primary CTA: Book a launch walkthrough  
Product name: Digital360 by BrunerDigital

## Launch Position

Digital360 is the connected growth operating system for agencies, service businesses, franchises, multi-location brands, consultants, and growth teams that need CRM, conversations, calendars, funnels, reputation, reporting, billing, portals, and AI in one premium workspace.

The public launch should sell the outcome first: fewer disconnected tools, faster speed-to-lead, clearer reporting, and a guided 7-14 day rollout path.

## Ready Today

- Public landing page with premium Digital360 styling and direct launch-demo form.
- Branded Digital360 logo and name across public pages and the app shell.
- Supabase-backed lead capture endpoint with honeypot spam field, UTM/source capture, optional webhook forwarding, and thank-you redirect.
- Lead notification fanout is implemented for webhook, SendGrid, and Mailgun once credentials are supplied.
- Conditional tracking loaders are implemented for Vercel Analytics, GA4, Google Ads, Meta Pixel, and LinkedIn Insight Tag.
- Protected API foundations are implemented for OpenAI assistant calls, Stripe checkout sessions, and Twilio outbound SMS.
- Integration readiness dashboard is available at `/integrations`.
- Live thank-you route at `/demo/thank-you/`.
- OG image generated at `/og/brunerdigital-og.png`.
- Launch social assets generated in `/public/social`.
- Onboarding console and demo app dashboard available for sales walkthroughs.
- Vercel production deployment and custom subdomain path already established.

## Must Confirm Before Heavy Promotion

- Add production `LEADS_WEBHOOK_URL` if leads should instantly forward into a CRM, Slack, Make/Zapier, or workflow automation.
- Add `LEADS_NOTIFICATION_EMAIL` plus SendGrid or Mailgun sender credentials if email alerts should fire directly from the app.
- Add analytics and ad pixel IDs in Vercel: Vercel Analytics, Google Analytics, Meta Pixel, LinkedIn Insight Tag, and Google Ads as desired.
- Add `NEXT_PUBLIC_DEMO_BOOKING_URL` and sales owner env vars if CTA buttons should go directly to the live calendar.
- Confirm legal copy for privacy, terms, data handling, and SMS/email consent before paid traffic.
- Confirm the preferred sales calendar link, owner, and follow-up SLA.
- Send a test lead after deploy and confirm it appears in Supabase and any connected webhook destination.

## 0-2 Hour Launch Sprint

1. Deploy production and open `https://digital360.brunerdigital.com`.
2. Test desktop, mobile, navigation, `/demo`, and `/demo/thank-you/`.
3. Submit one test lead with source `Digital360 public launch demo`.
4. Post the founder launch post on LinkedIn using `public/social/digital360-launch-linkedin.png`.
5. Post square creative on Facebook, Instagram, and LinkedIn company page using `public/social/digital360-launch-square.png`.
6. Add the story creative to Instagram/Facebook Stories using `public/social/digital360-story.png`.
7. Send the warm-list email announcement from `docs/social-launch-strategy.md`.
8. DM the top warm prospects with the short invite copy.
9. Watch Supabase leads and respond within 10 minutes.

## Same-Day Posting Schedule

- 9:00 AM ET: Founder LinkedIn post with the direct launch POV.
- 10:30 AM ET: Company page post with the platform outcome.
- 12:00 PM ET: Instagram/Facebook story using the vertical asset.
- 1:30 PM ET: X thread with the disconnected-stack angle.
- 3:00 PM ET: Email to warm clients, partners, and prospects.
- 4:30 PM ET: Carousel post using the four-slide problem/fix/proof/offer sequence.
- 6:00 PM ET: Personal follow-up DMs to everyone who engaged.

## Launch Asset Map

- `public/og/brunerdigital-og.png`: website link previews.
- `public/social/digital360-launch-linkedin.png`: LinkedIn single-image launch post or ad.
- `public/social/digital360-x-card.png`: X/Twitter card, website card, and 16:9 placements.
- `public/social/digital360-launch-square.png`: Facebook, Instagram, LinkedIn square feed post.
- `public/social/digital360-story.png`: Instagram/Facebook stories and reels cover.
- `public/social/digital360-carousel-01-problem.png`: carousel slide 1.
- `public/social/digital360-carousel-02-speed.png`: carousel slide 2.
- `public/social/digital360-carousel-03-proof.png`: carousel slide 3.
- `public/social/digital360-carousel-04-offer.png`: carousel slide 4.

## Sales Follow-Up SLA

- Reply to every demo request in under 10 minutes during launch day.
- Send a personal email, then call or text if a phone number was provided.
- Ask three questions: current tools, lead volume, and the workflow they most want to fix.
- Book a walkthrough within 48 hours.
- Tag every lead by segment: agency, local service, franchise, multi-location, consultant, or other.

## Launch KPIs

- Unique visitors
- Landing page conversion rate
- Demo requests
- Reply speed
- Booked walkthroughs
- Source or UTM performance
- Warm outreach reply rate
- Cost per lead if paid ads are launched

## Rollback Plan

If a production issue appears, revert traffic to the prior Vercel deployment, pause paid spend, and post only organic updates until the issue is resolved. Keep the landing page CTA pointing to a direct calendar link as the fallback if the lead endpoint or webhook destination fails.

## Owner Notes

This launch is ready for public visibility. The biggest remaining rollout unlocks are external service credentials, analytics/pixel installation, legal review, and the real sales calendar/notification workflow.
