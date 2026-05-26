create or replace function public.current_profile_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_tenant_admin(target_tenant_id uuid)
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
      and role in ('agency_owner', 'agency_admin')
  )
$$;

create or replace function public.can_manage_billing_workspace(target_workspace_id uuid)
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
      and p.role in ('agency_owner', 'agency_admin')
  )
$$;

drop policy if exists brand_same_tenant on public.brand_settings;
create policy brand_same_tenant_select on public.brand_settings
  for select using (public.is_tenant_member(tenant_id));
create policy brand_same_tenant_write on public.brand_settings
  for all using (public.is_tenant_admin(tenant_id))
  with check (public.is_tenant_admin(tenant_id));

drop policy if exists integrations_same_tenant on public.integrations;
create policy integrations_same_tenant_select on public.integrations
  for select using (public.is_tenant_member(tenant_id));
create policy integrations_same_tenant_write on public.integrations
  for all using (public.is_tenant_admin(tenant_id))
  with check (public.is_tenant_admin(tenant_id));

drop policy if exists products_workspace_access on public.products;
create policy products_workspace_select on public.products
  for select using (public.can_access_workspace(workspace_id));
create policy products_workspace_write on public.products
  for all using (public.can_manage_billing_workspace(workspace_id))
  with check (public.can_manage_billing_workspace(workspace_id));

drop policy if exists invoices_workspace_access on public.invoices;
create policy invoices_workspace_select on public.invoices
  for select using (public.can_access_workspace(workspace_id));
create policy invoices_workspace_write on public.invoices
  for all using (public.can_manage_billing_workspace(workspace_id))
  with check (public.can_manage_billing_workspace(workspace_id));

drop policy if exists audit_logs_same_tenant on public.audit_logs;
create policy audit_logs_same_tenant_select on public.audit_logs
  for select using (public.is_tenant_member(tenant_id));

revoke execute on function public.current_profile_tenant_id() from public;
revoke execute on function public.is_tenant_member(uuid) from public;
revoke execute on function public.can_access_workspace(uuid) from public;
revoke execute on function public.current_profile_role() from public;
revoke execute on function public.is_tenant_admin(uuid) from public;
revoke execute on function public.can_manage_billing_workspace(uuid) from public;

grant execute on function public.current_profile_tenant_id() to authenticated;
grant execute on function public.is_tenant_member(uuid) to authenticated;
grant execute on function public.can_access_workspace(uuid) to authenticated;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.is_tenant_admin(uuid) to authenticated;
grant execute on function public.can_manage_billing_workspace(uuid) to authenticated;
