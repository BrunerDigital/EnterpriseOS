# Supabase Setup Guide

## 1. Create Project

Create a Supabase project and copy:

- Project URL
- Anon key
- Service role key
- Database password, if using local CLI linking

Add them to `.env`.

## 2. Apply SQL Migrations

Use the Supabase CLI or dashboard SQL editor to apply the migration in `supabase/migrations`.

```bash
npx supabase link --project-ref <project-ref>
npx supabase db push
npm run seed
```

## 3. Auth Mapping

Recommended auth strategy:

- Supabase Auth stores identity.
- `profiles` table stores tenant role, profile, and app permissions.
- Middleware resolves authenticated user, tenant, and active workspace.
- Row-level security is enabled in the baseline migration around tenant/workspace IDs.

## 4. Storage

Create storage buckets:

- `brand-assets` for logos and portal assets
- `page-assets` for funnel/page builder media
- `attachments` for conversation and client portal files

## 5. Edge Functions

Good candidates:

- Stripe webhook handler
- Twilio inbound SMS handler
- Email inbound parse handler
- AI summarization jobs
- Calendar sync jobs

## 6. Production Notes

- Keep service role keys server-only.
- Never expose integration secrets to the browser.
- Add tenant ID and workspace ID to all app-level records.
- Add audit logs for AI, billing, impersonation, permission, and integration changes.
