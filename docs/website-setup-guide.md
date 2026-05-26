# Website Setup Guide

## Edit Content

Most copy lives in `lib/marketing.ts`. Update brand messaging, pricing, pages, funnels, forms, copy library, email assets, ad assets, sales assets, and checklists there.

## Add A Page

1. Add a `MarketingPage` entry in `lib/marketing.ts`.
2. Create `app/path/page.tsx`.
3. Render `<MarketingPageView page={allPages["/path"]} />`.

## Add A Funnel

1. Add a `FunnelTemplate` in `funnelTemplates`.
2. Create the matching route under `app/funnels`.
3. Render `<FunnelPageView funnel={...} />`.

## Connect Forms

Current forms submit through `public/lead-capture.js` to `POST /api/leads`, capture UTM/source data, enforce a honeypot field, and redirect to `/demo/thank-you/`. Add `LEADS_WEBHOOK_URL` or SendGrid/Mailgun notification env vars to forward production leads into the sales workflow.
