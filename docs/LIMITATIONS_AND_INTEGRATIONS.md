# Known Limitations and Recommended Integrations

## Known Limitations

- Auth screens are Supabase-ready, but production user invitations, SMTP, redirect URLs, and access policies still need final provider verification.
- Supabase SQL migrations include tenant isolation, RLS, and launch hardening, but production rollout should still use migration review and rollback discipline.
- AI has a protected `/api/ai/assist` route with deterministic fallback until `OPENAI_API_KEY` and `AI_ASSISTANT_API_TOKEN` are configured.
- Stripe checkout and Twilio outbound SMS have protected API foundations, but remain disabled until credentials and internal API tokens are configured.
- Email and lead notification fanout supports webhooks, SendGrid, and Mailgun, but depends on production sender credentials.
- Social, calendar, and review integrations are connection-ready placeholders.
- Funnel/page builder and workflow builder are foundations, not visual drag-and-drop editors yet.
- No background job queue is included yet.
- No automated tests are included beyond type/lint/build validation.

## Recommended Next Integrations

1. Supabase Auth and Postgres
2. OpenAI for AI assistant tools
3. Stripe for checkout, subscriptions, invoices, and webhooks
4. Twilio for SMS conversations and missed-call text back
5. SendGrid or Mailgun for campaign delivery
6. Google Calendar for scheduling
7. Meta for lead ads and social inbox events
8. Google Business Profile for reputation/review management
9. Google Analytics, Meta Pixel, LinkedIn Insight Tag, and Google Ads conversions
10. Sentry or equivalent error monitoring
