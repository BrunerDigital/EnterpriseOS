create function public.brunerdigital_inquiry_overview(p_workspace_id uuid, p_since timestamptz)
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  with workspace_scope as (
    select w.id from public.workspaces w
    join public.tenants t on t.id = w.tenant_id
    where w.id = p_workspace_id and w.type = 'agency' and w.agency_admin_only
      and t.slug = 'brunerdigital'
  ), summary as (
    select count(*) as total,
      count(*) filter (where i.source = 'brunerdigital_website') as website,
      count(*) filter (where i.source = 'digital360_walkthrough') as walkthroughs,
      count(*) filter (where i.utm_campaign = 'connected_forms_first_rollout') as connected_forms
    from public.project_inquiries i join workspace_scope w on w.id = i.workspace_id
    where i.received_at >= p_since and i.received_at <= now()
  ), recent as (
    select i.id, i.name, i.service, i.source, i.received_at, i.utm_campaign, i.utm_content
    from public.project_inquiries i join workspace_scope w on w.id = i.workspace_id
    where i.received_at >= p_since and i.received_at <= now()
    order by i.received_at desc, i.id desc
    limit 6
  )
  select jsonb_build_object(
    'total', s.total, 'website', s.website, 'walkthroughs', s.walkthroughs, 'connected_forms', s.connected_forms,
    'recent', coalesce((select jsonb_agg(r order by r.received_at desc, r.id desc) from recent r), '[]'::jsonb)
  )
  from summary s
  where exists (select 1 from workspace_scope);
$$;

revoke execute on function public.brunerdigital_inquiry_overview(uuid, timestamptz) from public, anon, authenticated;
grant execute on function public.brunerdigital_inquiry_overview(uuid, timestamptz) to service_role;
