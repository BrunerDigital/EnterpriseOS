-- Staff identity and tenant ownership must remain server managed.
revoke update on table public.profiles from public, anon, authenticated;
grant update (full_name) on public.profiles to authenticated;

create table public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete restrict,
  contact_id uuid references public.contacts(id) on delete set null,
  source text not null check (source in ('brunerdigital_website', 'digital360_walkthrough')),
  request_id uuid not null,
  fingerprint text not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  service text not null,
  message text,
  website_url text,
  budget text,
  timeline text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  contact_consent boolean,
  received_at timestamptz not null default now(),
  unique (workspace_id, source, request_id)
);

create index project_inquiries_workspace_received_idx
  on public.project_inquiries (workspace_id, received_at desc, id desc);
create index project_inquiries_campaign_received_idx
  on public.project_inquiries (workspace_id, utm_campaign, received_at desc, id desc);
create index project_inquiries_contact_idx on public.project_inquiries (contact_id);
create index contacts_workspace_normalized_email_idx
  on public.contacts (workspace_id, lower(email)) where email is not null;

alter table public.project_inquiries enable row level security;
revoke all on table public.project_inquiries from public, anon, authenticated, service_role;
grant select, insert on table public.project_inquiries to service_role;
grant select on table public.tenants, public.workspaces, public.contacts to service_role;
grant insert on table public.contacts to service_role;

create function public.capture_brunerdigital_inquiry(
  p_workspace_id uuid, p_request_id uuid, p_source text, p_brief jsonb
)
returns table (request_id uuid, replayed boolean, tenant_id uuid)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  saved_fingerprint text;
  brief_fingerprint text;
  lead_email text := lower(trim(p_brief->>'email'));
  lead_name text := trim(p_brief->>'name');
  contact_ids uuid[];
  contact_key uuid;
  name_parts text[];
  intake_tenant_id uuid;
begin
  if p_request_id is null or p_source is null
      or p_source not in ('brunerdigital_website', 'digital360_walkthrough')
      or jsonb_typeof(p_brief) is distinct from 'object'
      or lead_name is null or lead_name = '' or lead_email is null or lead_email = ''
      or nullif(trim(p_brief->>'service'), '') is null
      or (p_source = 'digital360_walkthrough' and p_brief->>'contact_consent' is distinct from 'true') then
    raise exception 'Invalid inquiry' using errcode = '22023';
  end if;

  select t.id into intake_tenant_id from public.workspaces w
  join public.tenants t on t.id = w.tenant_id
  where w.id = p_workspace_id and w.type = 'agency' and t.slug = 'brunerdigital';
  if not found then
    raise exception 'Intake workspace is unavailable' using errcode = '42501';
  end if;

  brief_fingerprint := encode(sha256(convert_to(p_brief::text, 'UTF8')), 'hex');
  perform pg_advisory_xact_lock(hashtextextended('inquiry:' || p_workspace_id || ':' || p_source || ':' || p_request_id, 0));
  select i.fingerprint into saved_fingerprint from public.project_inquiries i
  where i.workspace_id = p_workspace_id and i.source = p_source and i.request_id = p_request_id;
  if found then
    if saved_fingerprint <> brief_fingerprint then
      raise exception 'Inquiry delivery ID is already in use' using errcode = '23505';
    end if;
    return query select p_request_id, true, intake_tenant_id;
    return;
  end if;

  perform pg_advisory_xact_lock(hashtextextended('inquiry-contact:' || p_workspace_id || ':' || lead_email, 0));
  select array(
    select c.id from public.contacts c
    where c.workspace_id = p_workspace_id and lower(c.email) = lead_email
    order by c.id limit 2
  ) into contact_ids;

  if cardinality(contact_ids) = 0 then
    name_parts := regexp_split_to_array(lead_name, '\s+');
    insert into public.contacts (workspace_id, first_name, last_name, email, phone)
    values (p_workspace_id, name_parts[1], coalesce(array_to_string(name_parts[2:], ' '), ''), lead_email, p_brief->>'phone')
    returning id into contact_key;
  elsif cardinality(contact_ids) = 1 then
    contact_key := contact_ids[1];
  end if;

  insert into public.project_inquiries (
    workspace_id, contact_id, source, request_id, fingerprint, name, email, phone, company, service,
    message, website_url, budget, timeline, utm_source, utm_medium, utm_campaign, utm_content, utm_term, contact_consent
  ) values (
    p_workspace_id, contact_key, p_source, p_request_id, brief_fingerprint, lead_name, lead_email, p_brief->>'phone',
    p_brief->>'company', p_brief->>'service', p_brief->>'message', p_brief->>'website_url',
    p_brief->>'budget', p_brief->>'timeline', p_brief->>'utm_source', p_brief->>'utm_medium',
    p_brief->>'utm_campaign', p_brief->>'utm_content', p_brief->>'utm_term', (p_brief->>'contact_consent')::boolean
  );
  return query select p_request_id, false, intake_tenant_id;
end;
$$;

revoke execute on function public.capture_brunerdigital_inquiry(uuid, uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.capture_brunerdigital_inquiry(uuid, uuid, text, jsonb) to service_role;
