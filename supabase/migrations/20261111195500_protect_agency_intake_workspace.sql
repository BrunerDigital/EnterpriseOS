alter table public.workspaces
  add column agency_admin_only boolean not null default false
  constraint workspaces_agency_admin_type check (not agency_admin_only or type = 'agency');

create or replace function public.can_access_workspace(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspaces w
    join public.profiles p on p.tenant_id = w.tenant_id
    where p.id = auth.uid()
      and w.id = target_workspace_id
      and (not w.agency_admin_only or p.role in ('agency_owner', 'agency_admin'))
  )
$$;

create policy workspace_agency_admin_scope on public.workspaces
  as restrictive for all to authenticated
  using (not agency_admin_only or public.is_tenant_admin(tenant_id))
  with check (not agency_admin_only or public.is_tenant_admin(tenant_id));

create policy audit_logs_public_lead_admin_scope on public.audit_logs
  as restrictive for select to authenticated
  using (action <> 'lead.submitted' or public.is_tenant_admin(tenant_id));

create function public.preserve_workspace_admin_scope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'The workspace access scope is fixed at creation' using errcode = '23514';
end
$$;

create trigger workspace_admin_scope_fixed
  before update of agency_admin_only on public.workspaces
  for each row when (old.agency_admin_only is distinct from new.agency_admin_only)
  execute function public.preserve_workspace_admin_scope();

create function public.require_private_inquiry_workspace()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.workspaces
    where id = new.workspace_id and agency_admin_only
  ) then
    raise exception 'Intake workspace is unavailable' using errcode = '42501';
  end if;
  return new;
end
$$;

create trigger project_inquiry_private_workspace
  before insert or update of workspace_id on public.project_inquiries
  for each row execute function public.require_private_inquiry_workspace();

revoke execute on function public.preserve_workspace_admin_scope() from public, anon, authenticated, service_role;
revoke execute on function public.require_private_inquiry_workspace() from public, anon, authenticated, service_role;
