create extension if not exists "pgcrypto";

create type public.app_role as enum (
  'agency_owner',
  'agency_admin',
  'workspace_admin',
  'sales_manager',
  'sales_rep',
  'client_admin',
  'client_viewer',
  'billing_viewer'
);

create type public.deal_status as enum ('open', 'won', 'lost');
create type public.message_channel as enum ('email', 'sms', 'social', 'chat');
create type public.integration_provider as enum (
  'stripe',
  'twilio',
  'sendgrid',
  'mailgun',
  'google_calendar',
  'meta',
  'google_business_profile',
  'openai',
  'supabase'
);

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'scale',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  type text not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.app_role not null default 'client_viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brand_settings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null unique references public.tenants(id) on delete cascade,
  logo_url text,
  primary_color text not null default '#38bdf8',
  custom_domain text,
  theme jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  domain text,
  industry text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  status text not null default 'lead',
  lead_score integer not null default 0 check (lead_score between 0 and 100),
  ai_summary text,
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  name text not null,
  unique (tenant_id, name)
);

create table public.contact_tags (
  contact_id uuid not null references public.contacts(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (contact_id, tag_id)
);

create table public.pipelines (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.stages (
  id uuid primary key default gen_random_uuid(),
  pipeline_id uuid not null references public.pipelines(id) on delete cascade,
  name text not null,
  sort_order integer not null,
  unique (pipeline_id, sort_order)
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references public.stages(id) on delete restrict,
  company_id uuid references public.companies(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  name text not null,
  value_cents integer not null default 0,
  status public.deal_status not null default 'open',
  close_date date,
  ai_next_step text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.contacts(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  priority integer not null default 3 check (priority between 1 and 5),
  due_at timestamptz,
  done_at timestamptz,
  ai_reason text,
  created_at timestamptz not null default now()
);

create table public.message_threads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  subject text,
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  channel public.message_channel not null,
  direction text not null check (direction in ('inbound', 'outbound')),
  body text not null,
  ai_suggestion text,
  created_at timestamptz not null default now()
);

create table public.calendars (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  timezone text not null default 'America/New_York',
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled',
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  status text not null default 'draft',
  audience text not null,
  ai_copy text,
  created_at timestamptz not null default now()
);

create table public.workflows (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  trigger_key text not null,
  definition jsonb not null default '{}'::jsonb,
  ai_recommendation text,
  created_at timestamptz not null default now()
);

create table public.funnel_pages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  slug text not null,
  content jsonb not null default '{}'::jsonb,
  ai_copy_brief text,
  created_at timestamptz not null default now(),
  unique (workspace_id, slug)
);

create table public.lead_forms (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  schema jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  source text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  ai_response text,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  price_cents integer not null default 0,
  recurring boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  number text not null,
  status text not null,
  total_cents integer not null default 0,
  created_at timestamptz not null default now(),
  unique (workspace_id, number)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  config jsonb not null default '{}'::jsonb,
  ai_insight text,
  created_at timestamptz not null default now()
);

create table public.portal_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  type text not null,
  visibility text not null default 'client',
  created_at timestamptz not null default now()
);

create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider public.integration_provider not null,
  status text not null default 'mock',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, provider)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tenants_set_updated_at before update on public.tenants for each row execute function public.set_updated_at();
create trigger workspaces_set_updated_at before update on public.workspaces for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger brand_settings_set_updated_at before update on public.brand_settings for each row execute function public.set_updated_at();
create trigger companies_set_updated_at before update on public.companies for each row execute function public.set_updated_at();
create trigger contacts_set_updated_at before update on public.contacts for each row execute function public.set_updated_at();
create trigger deals_set_updated_at before update on public.deals for each row execute function public.set_updated_at();
create trigger integrations_set_updated_at before update on public.integrations for each row execute function public.set_updated_at();

create index workspaces_tenant_id_idx on public.workspaces(tenant_id);
create index profiles_tenant_id_idx on public.profiles(tenant_id);
create index companies_workspace_id_idx on public.companies(workspace_id);
create index contacts_workspace_id_idx on public.contacts(workspace_id);
create index contacts_company_id_idx on public.contacts(company_id);
create index contacts_lead_score_idx on public.contacts(workspace_id, lead_score desc);
create index deals_stage_id_idx on public.deals(stage_id);
create index deals_contact_id_idx on public.deals(contact_id);
create index message_threads_workspace_id_idx on public.message_threads(workspace_id);
create index messages_thread_id_created_at_idx on public.messages(thread_id, created_at desc);
create index appointments_calendar_starts_at_idx on public.appointments(calendar_id, starts_at);
create index audit_logs_tenant_created_at_idx on public.audit_logs(tenant_id, created_at desc);

create or replace function public.current_profile_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select tenant_id from public.profiles where id = auth.uid()
$$;

create or replace function public.is_tenant_member(target_tenant_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and tenant_id = target_tenant_id
  )
$$;

create or replace function public.can_access_workspace(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspaces w
    join public.profiles p on p.tenant_id = w.tenant_id
    where p.id = auth.uid()
      and w.id = target_workspace_id
  )
$$;

alter table public.tenants enable row level security;
alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.brand_settings enable row level security;
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.tags enable row level security;
alter table public.contact_tags enable row level security;
alter table public.pipelines enable row level security;
alter table public.stages enable row level security;
alter table public.deals enable row level security;
alter table public.notes enable row level security;
alter table public.tasks enable row level security;
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.calendars enable row level security;
alter table public.appointments enable row level security;
alter table public.campaigns enable row level security;
alter table public.workflows enable row level security;
alter table public.funnel_pages enable row level security;
alter table public.lead_forms enable row level security;
alter table public.reviews enable row level security;
alter table public.products enable row level security;
alter table public.invoices enable row level security;
alter table public.reports enable row level security;
alter table public.portal_items enable row level security;
alter table public.integrations enable row level security;
alter table public.audit_logs enable row level security;

create policy tenant_member_select on public.tenants for select using (public.is_tenant_member(id));
create policy workspace_tenant_access on public.workspaces for all using (public.is_tenant_member(tenant_id)) with check (public.is_tenant_member(tenant_id));
create policy profile_same_tenant on public.profiles for select using (public.is_tenant_member(tenant_id));
create policy profile_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy brand_same_tenant on public.brand_settings for all using (public.is_tenant_member(tenant_id)) with check (public.is_tenant_member(tenant_id));
create policy tags_same_tenant on public.tags for all using (public.is_tenant_member(tenant_id)) with check (public.is_tenant_member(tenant_id));
create policy integrations_same_tenant on public.integrations for all using (public.is_tenant_member(tenant_id)) with check (public.is_tenant_member(tenant_id));
create policy audit_logs_same_tenant on public.audit_logs for select using (public.is_tenant_member(tenant_id));

create policy companies_workspace_access on public.companies for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy contacts_workspace_access on public.contacts for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy pipelines_workspace_access on public.pipelines for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy message_threads_workspace_access on public.message_threads for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy calendars_workspace_access on public.calendars for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy campaigns_workspace_access on public.campaigns for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy workflows_workspace_access on public.workflows for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy funnel_pages_workspace_access on public.funnel_pages for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy lead_forms_workspace_access on public.lead_forms for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy reviews_workspace_access on public.reviews for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy products_workspace_access on public.products for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy invoices_workspace_access on public.invoices for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy reports_workspace_access on public.reports for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));
create policy portal_items_workspace_access on public.portal_items for all using (public.can_access_workspace(workspace_id)) with check (public.can_access_workspace(workspace_id));

create policy contact_tags_access on public.contact_tags for all using (
  exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
) with check (
  exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
);

create policy stages_access on public.stages for all using (
  exists (
    select 1 from public.pipelines p
    where p.id = pipeline_id and public.can_access_workspace(p.workspace_id)
  )
) with check (
  exists (
    select 1 from public.pipelines p
    where p.id = pipeline_id and public.can_access_workspace(p.workspace_id)
  )
);

create policy deals_access on public.deals for all using (
  exists (
    select 1
    from public.stages s
    join public.pipelines p on p.id = s.pipeline_id
    where s.id = stage_id and public.can_access_workspace(p.workspace_id)
  )
) with check (
  exists (
    select 1
    from public.stages s
    join public.pipelines p on p.id = s.pipeline_id
    where s.id = stage_id and public.can_access_workspace(p.workspace_id)
  )
);

create policy notes_access on public.notes for all using (
  exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
) with check (
  exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
);

create policy tasks_access on public.tasks for all using (
  contact_id is null
  or exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
) with check (
  contact_id is null
  or exists (
    select 1 from public.contacts c
    where c.id = contact_id and public.can_access_workspace(c.workspace_id)
  )
);

create policy messages_access on public.messages for all using (
  exists (
    select 1 from public.message_threads t
    where t.id = thread_id and public.can_access_workspace(t.workspace_id)
  )
) with check (
  exists (
    select 1 from public.message_threads t
    where t.id = thread_id and public.can_access_workspace(t.workspace_id)
  )
);

create policy appointments_access on public.appointments for all using (
  exists (
    select 1 from public.calendars c
    where c.id = calendar_id and public.can_access_workspace(c.workspace_id)
  )
) with check (
  exists (
    select 1 from public.calendars c
    where c.id = calendar_id and public.can_access_workspace(c.workspace_id)
  )
);
