# Go-Live Checklist

## Security

- Connect real authentication.
- Enforce tenant and workspace isolation on every query.
- Add role and permission checks for agency, client, billing, and support actions.
- Protect service role keys and integration secrets.
- Add audit logs for sensitive actions.

## Data

- Run migrations against staging.
- Test seed data separately from production data.
- Back up production database before launch.
- Add retention rules for messages, audit logs, and AI prompts.

## Integrations

- Verify Stripe test mode and webhook signatures.
- Verify Twilio inbound/outbound SMS.
- Verify SendGrid or Mailgun domain authentication.
- Verify Google Calendar OAuth and webhook refresh.
- Verify Meta and Google Business Profile account permissions.
- Verify OpenAI rate limits, moderation, and fallback behavior.

## Product

- Test onboarding, dashboard, CRM, pipeline, calendar, conversations, campaigns, workflows, reviews, invoices, reports, portal, and settings.
- Confirm branded logo, theme, custom domain, and sender profile.
- Confirm mobile navigation and responsive layouts.
- Confirm empty states, loading states, and error states after real APIs are connected.

## Operations

- Set up monitoring and error reporting.
- Add uptime checks.
- Add support contact and escalation path.
- Create staging and production environments.
- Document rollback process.
