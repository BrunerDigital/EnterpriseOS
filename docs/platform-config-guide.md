# Platform Configuration Guide

Digital360 includes an admin-only Platform Config section at `/settings/config`.

Use it to store tenant-level account IDs, API keys, webhooks, tracking IDs, routing emails, notes, and enabled datapoints for each external platform.

## Security Model

- Public IDs and non-sensitive settings are stored in `integrations.config.values`.
- Secrets are encrypted before they are stored in `integrations.config.secrets`.
- Secret metadata is stored in `integrations.config.secretMeta` so admins can see that a key exists without seeing the value.
- The browser never receives raw saved secrets.
- `CONFIG_ENCRYPTION_KEY` must be set before saving any secret field.

Generate a production encryption key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Add it to Vercel as `CONFIG_ENCRYPTION_KEY` for production, preview, and development environments where admins will save secrets.

## Current Platform Catalog

The first version includes config support for:

- Supabase
- OpenAI
- Stripe
- Twilio
- SendGrid
- Mailgun
- Google Calendar
- Sales calendar / booking link
- Google Analytics
- Google Ads
- Meta
- LinkedIn
- Google Business Profile
- Lead routing webhooks
- Slack
- Make
- Zapier
- Cloudflare
- Vercel

## Runtime Usage

Current server routes can read saved tenant config with environment-variable fallback:

- `POST /api/leads` reads lead webhook, SendGrid, and Mailgun settings.
- `POST /api/ai/assist` reads OpenAI settings.
- `POST /api/billing/checkout` reads Stripe settings.
- `POST /api/messages/send` reads Twilio settings.
- `/api/public/tracking-config` exposes only safe public tracking IDs for the browser tracking loader.

## Adding A New Platform

1. Add the provider to the `integration_provider` enum in a new Supabase migration.
2. Regenerate or update `lib/supabase/database.types.ts`.
3. Add a provider definition to `lib/integration-config/catalog.ts`.
4. Add fields, mark sensitive values with `secret: true`, and list supported `dataPoints`.
5. Use `readRuntimeIntegrationConfig` or `readRuntimeIntegrationConfigByTenantSlug` from `lib/server/integration-config-store.ts` in server-only integration code.
6. Add any new environment fallback names to `.env.example`.
7. Run `npm run typecheck`, `npm run lint`, and `npm run build`.

## Admin Workflow

1. Sign in as an agency owner or agency admin.
2. Open `/settings/config`.
3. Fill public account IDs and URLs.
4. Paste secrets only into password fields.
5. Select enabled datapoints for the platform.
6. Save the provider card.
7. Confirm the card shows `Configured` or `Partial`.
