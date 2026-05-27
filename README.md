# Digital360 by BrunerDigital

Digital360 by BrunerDigital is a premium white-label AI business operating system for agencies, service businesses, franchises, multi-location brands, consultants, and growth teams.

This project now includes a complete launch-ready marketing website, funnel library, conversion flows, copy system, brand strategy, content calendar, ad assets, email sequences, sales enablement assets, visual direction, launch checklists, SEO plumbing, sitemap, robots, launch-ready legal pages, and an existing internal product demo at `/dashboard`.

The backend foundation is Supabase-first: SQL migrations, RLS policies, Supabase Auth-ready profiles, typed Supabase clients, and a service-role seed script. Prisma has been removed from the stack.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The root page `/` is the pre-login marketing, signup, and onboarding landing page.

## Build And Verify

```bash
npm run typecheck
npm run lint
npm run build
```

## Supabase Database Setup

Create a Supabase project, copy `.env.example` to `.env`, and set:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Apply the SQL migration and seed demo records:

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push
npm run seed
```

For local Supabase:

```bash
npx supabase start
npx supabase db reset
npm run db:types
```

## Deployment

1. Create a production project on Vercel or another Next.js host.
2. Set production environment variables from `.env.example`, including `NEXT_PUBLIC_APP_URL=https://digital360.brunerdigital.com`.
3. Set `CONFIG_ENCRYPTION_KEY` before saving any API keys or secrets from the in-app admin config center.
4. Add the production custom domain in Vercel and point DNS to Vercel.
5. Connect analytics, pixels, CRM webhooks, email sending, payment provider, and calendar credentials.
6. Review launch legal pages with counsel before heavy paid traffic or regulated customer onboarding.
7. Deploy from the main branch.

## Important Locations

- Website pages: `app/`
- Marketing content source: `lib/marketing.ts`
- Marketing UI components: `components/marketing/`
- Product demo UI: `app/dashboard`, `components/app/`, `lib/demo-data.ts`
- Supabase schema: `supabase/migrations/`
- Supabase seed: `supabase/seed.ts`
- Supabase clients and types: `lib/supabase/`
- Tracking and pixel plumbing: `lib/tracking.ts`, `components/app/tracking-scripts.tsx`
- Integration readiness: `app/integrations`, `lib/integrations.ts`
- Admin platform config: `app/settings/config`, `lib/integration-config/catalog.ts`, `lib/server/integration-config-store.ts`
- Strategy docs: `docs/`
- Sitemap and robots: `app/sitemap.ts`, `app/robots.ts`
- Public lead API route: `app/api/leads/route.ts`
- Public setup progress API route: `app/api/setup-submissions/route.ts`
- Browser lead capture: `public/lead-capture.js`

## Customize Brand, Pricing, And Copy

- Brand positioning, voice, taglines, differentiators: `lib/marketing.ts` under `brand`
- Page copy and sections: `allPages`, `marketingPages`, and `landingPages`
- Pricing cards: `pricingPlans`
- Funnel templates: `funnelTemplates`
- Signup/demo/onboarding flows: `flowSteps`
- Copy, email, ad, sales, visual, and checklist libraries: `copyLibrary`, `emailSequences`, `adSystem`, `salesEnablement`, `visualLibrary`, `launchChecklists`

## Created Pages

Homepage, pricing, feature overview, CRM, AI automation, conversations, funnel builder, calendar scheduling, reputation, reporting, agency, white-label, franchise/multi-location, integrations, security, about, contact, resources/blog, help center, comparison, use cases, local services, consultants/coaches, marketing teams, funnel templates, waitlist, early access, partner program, trial/demo/application flows, onboarding/setup flows, thank-you pages, abandoned signup recovery, upgrade, cancellation, legal pages, and product demo.

## Credentials Still Needed

External account credentials are still needed for live CRM/webhook routing, transactional email, SMS, calendar sync, payment processing, OpenAI live responses, analytics/pixels, file uploads, and monitoring. Agency admins can now enter and update those values at `/settings/config`; secrets are encrypted server-side and masked after save.

## Recommended Next Actions

1. Add `CONFIG_ENCRYPTION_KEY` in Vercel, then enter platform credentials in `/settings/config`.
2. Add SendGrid or Mailgun sender credentials if lead email alerts should be sent directly from the app.
3. Add protected service tokens for AI, billing, and messaging before enabling live OpenAI, Stripe, or Twilio calls.
4. Review pricing, legal pages, and consent language with finance/legal.
5. QA the full mobile funnel and conversion events before paid traffic.

