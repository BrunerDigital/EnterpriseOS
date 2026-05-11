# Known Limitations and Recommended Integrations

## Known Limitations

- Auth screens are static and need Supabase Auth or another identity provider.
- Supabase SQL migration is ready for PostgreSQL, but production rollout should still add migration review and rollback discipline.
- AI content is mocked in demo data until OpenAI calls are wired.
- Payment, messaging, email, social, calendar, and review integrations are connection-ready placeholders.
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
9. Sentry or equivalent error monitoring
10. PostHog or equivalent product analytics
