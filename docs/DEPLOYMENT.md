# Vercel Deployment Guide

## 1. Prepare Environment

Create a Vercel project and add environment variables from `.env.example`.

Required:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
CONFIG_ENCRYPTION_KEY
```

Recommended before launch:

```text
NEXT_PUBLIC_DEMO_BOOKING_URL
NEXT_PUBLIC_SALES_OWNER_EMAIL
LEADS_WEBHOOK_URL
LEADS_NOTIFICATION_EMAIL
OPENAI_API_KEY
OPENAI_MODEL
AI_ASSISTANT_API_TOKEN
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
BILLING_API_TOKEN
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_MESSAGING_SERVICE_SID
MESSAGING_API_TOKEN
SENDGRID_API_KEY
SENDGRID_FROM_EMAIL
MAILGUN_API_KEY
MAILGUN_DOMAIN
MAILGUN_FROM_EMAIL
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_GOOGLE_ADS_ID
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_LINKEDIN_PARTNER_ID
NEXT_PUBLIC_LINKEDIN_CONVERSION_ID
```

`CONFIG_ENCRYPTION_KEY` is required before admins can save API keys or other sensitive values in `/settings/config`. Generate a 32-byte base64url value with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
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
Use `/settings/config` to enter provider credentials after the first production deploy; saved secrets are encrypted and masked in the app.

## 6. Production Smoke Tests

```bash
curl https://digital360.brunerdigital.com
curl https://digital360.brunerdigital.com/og/brunerdigital-og.png
curl -X POST https://digital360.brunerdigital.com/api/leads \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"launch-test@example.com\",\"source\":\"deployment-smoke\"}"
```

Protected routes should return `401` until their internal tokens are configured and supplied:

- `POST /api/ai/assist`
- `POST /api/billing/checkout`
- `POST /api/messages/send`
