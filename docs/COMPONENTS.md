# Component Documentation

## App Shell

`components/app/app-shell.tsx` owns the primary product chrome:

- Fixed desktop sidebar
- Workspace switcher
- Top search/command region
- Notification button
- Demo-mode indicator
- Responsive content container

Use this shell for authenticated product pages.

## Page Header

`components/app/page-header.tsx` provides consistent page titles, descriptions, and primary/AI actions.

## Dashboard

`components/app/dashboard.tsx` composes the main executive dashboard:

- KPI cards
- AI dashboard insights
- Recharts area chart
- Opportunity next steps
- Pipeline preview
- Conversation preview

## Module Page

`components/app/module-page.tsx` is a reusable template for broad product modules. It renders:

- Module stats
- Seed records
- Module-specific AI recommendation copy
- Production connection notes

## UI Components

`components/ui` contains shadcn-style source components:

- `button.tsx`
- `card.tsx`
- `badge.tsx`
- `input.tsx`
- `progress.tsx`
- `separator.tsx`

These components use semantic Tailwind tokens from `app/globals.css` and `tailwind.config.ts`.

## Design Tokens

Core tokens are dark-first:

- Background: near-black and deep navy
- Surface: translucent slate panels
- Accent: electric blue primary, emerald success
- Radius: 8-10px panel system
- Effects: restrained glass, soft glow, high-contrast borders

## Extension Pattern

For a new module:

1. Add typed data to `lib/demo-data.ts`.
2. Add a route under `app/<module>/page.tsx`.
3. Reuse `AppShell`, `PageHeader`, `Card`, and `ModulePage` when possible.
4. Add database models or fields to `supabase/migrations`.
5. Add seed records to `supabase/seed.ts`.
