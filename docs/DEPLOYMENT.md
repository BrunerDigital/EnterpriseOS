# Vercel Deployment Guide

## 1. Prepare Environment

Create a Vercel project and add environment variables from `.env.example`.

Required:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Recommended before launch:

```text
OPENAI_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
```

## 2. Build Settings

Framework preset: Next.js

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

## 3. Database Migration

For first launch, apply the SQL migrations in `supabase/migrations`:

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push
```

Regenerate database types after schema changes:

```bash
npm run db:types
```

## 4. Seed Demo Data

Run locally or from a secure one-off job after setting `SUPABASE_SERVICE_ROLE_KEY`:

```bash
npm run seed
```

Do not seed demo data into a real client production tenant unless you intend to keep demo mode enabled.

## 5. Go-Live Validation

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Then verify routes, auth, tenant isolation, webhooks, email/SMS deliverability, and billing in staging before production.
