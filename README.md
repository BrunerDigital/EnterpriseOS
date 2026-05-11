# EnterpriseOS Marketing Launch System

EnterpriseOS is a premium white-label AI business operating system for agencies, service businesses, franchises, multi-location brands, consultants, and growth teams.

This project now includes a complete launch-ready marketing website, funnel library, conversion flows, copy system, brand strategy, content calendar, ad assets, email sequences, sales enablement assets, visual direction, launch checklists, SEO plumbing, sitemap, robots, legal placeholders, and an existing internal product demo at `/dashboard`.

The backend foundation is Supabase-first: SQL migrations, RLS policies, Supabase Auth-ready profiles, typed Supabase clients, and a service-role seed script. Prisma has been removed from the stack.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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
2. Set production environment variables from `.env.example`.
3. Replace `https://enterpriseos.example` in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.
4. Connect analytics, pixels, CRM webhooks, email sending, payment provider, and calendar credentials.
5. Replace legal placeholders with attorney-reviewed policies.
6. Deploy from the main branch.

## Important Locations

- Website pages: `app/`
- Marketing content source: `lib/marketing.ts`
- Marketing UI components: `components/marketing/`
- Product demo UI: `app/dashboard`, `components/app/`, `lib/demo-data.ts`
- Supabase schema: `supabase/migrations/202605110001_enterpriseos_schema.sql`
- Supabase seed: `supabase/seed.ts`
- Supabase clients and types: `lib/supabase/`
- Tracking placeholder: `lib/tracking.ts`
- Strategy docs: `docs/`
- Sitemap and robots: `app/sitemap.ts`, `app/robots.ts`

## Customize Brand, Pricing, And Copy

- Brand positioning, voice, taglines, differentiators: `lib/marketing.ts` under `brand`
- Page copy and sections: `allPages`, `marketingPages`, and `landingPages`
- Pricing cards: `pricingPlans`
- Funnel templates: `funnelTemplates`
- Signup/demo/onboarding flows: `flowSteps`
- Copy, email, ad, sales, visual, and checklist libraries: `copyLibrary`, `emailSequences`, `adSystem`, `salesEnablement`, `visualLibrary`, `launchChecklists`

## Created Pages

Homepage, pricing, feature overview, CRM, AI automation, conversations, funnel builder, calendar scheduling, reputation, reporting, agency, white-label, franchise/multi-location, integrations, security, about, contact, resources/blog, help center, comparison, use cases, local services, consultants/coaches, marketing teams, funnel templates, waitlist, early access, partner program, trial/demo/application flows, onboarding/setup flows, thank-you pages, abandoned signup recovery, upgrade, cancellation, legal placeholders, and product demo.

## Credentials Still Needed

Analytics, ad pixels, CRM/webhook endpoints, transactional email, SMS, calendar sync, payment processor, authentication, custom domain, file uploads, production database, monitoring, and legal policy text.

## Recommended Next Actions

1. Replace placeholder domain and OG image.
2. Connect form submissions to CRM and email automation.
3. Load the email/ad/sales copy into your real tools.
4. Review pricing with finance and legal.
5. QA the full mobile funnel before paid traffic.
