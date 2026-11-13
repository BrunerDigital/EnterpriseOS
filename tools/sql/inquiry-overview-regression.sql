-- Run with psql -v ON_ERROR_STOP=1 -f against a disposable database with all migrations applied.
begin;

insert into public.tenants (id, name, slug) values
  ('65000000-0000-4000-8000-000000000001', 'BrunerDigital Overview Test', 'brunerdigital'),
  ('65000000-0000-4000-8000-000000000002', 'Foreign Overview Test', 'overview-test-other');

insert into public.workspaces (id, tenant_id, name, type, agency_admin_only) values
  ('66000000-0000-4000-8000-000000000001', '65000000-0000-4000-8000-000000000001', 'Intake', 'agency', true),
  ('66000000-0000-4000-8000-000000000002', '65000000-0000-4000-8000-000000000001', 'Neighbor', 'agency', true),
  ('66000000-0000-4000-8000-000000000003', '65000000-0000-4000-8000-000000000002', 'Foreign', 'agency', true),
  ('66000000-0000-4000-8000-000000000004', '65000000-0000-4000-8000-000000000001', 'Client', 'client', false);

insert into public.project_inquiries (workspace_id, request_id, fingerprint, name, email, service, source, utm_campaign, received_at)
select workspace_id::uuid, gen_random_uuid(), 'overview-test', name, 'fixture@example.test', 'Pathway', source, campaign, now() - age
from (values
  ('66000000-0000-4000-8000-000000000001', 'Website lead', 'brunerdigital_website', 'connected_forms_first_rollout', interval '2 days'),
  ('66000000-0000-4000-8000-000000000001', 'Older walkthrough', 'digital360_walkthrough', null, interval '10 days'),
  ('66000000-0000-4000-8000-000000000001', 'Outside the period', 'brunerdigital_website', null, interval '45 days'),
  ('66000000-0000-4000-8000-000000000001', 'Future lead', 'brunerdigital_website', null, interval '-1 day'),
  ('66000000-0000-4000-8000-000000000002', 'Neighbor lead', 'brunerdigital_website', 'connected_forms_first_rollout', interval '1 day'),
  ('66000000-0000-4000-8000-000000000003', 'Foreign lead', 'brunerdigital_website', 'connected_forms_first_rollout', interval '1 day')
) as fixture(workspace_id, name, source, campaign, age);

set local role service_role;

do $$
declare
  intake constant uuid := '66000000-0000-4000-8000-000000000001';
  report jsonb;
begin
  report := public.brunerdigital_inquiry_overview(intake, now() - interval '7 days');
  if report - 'recent' is distinct from '{"total":1,"website":1,"walkthroughs":0,"connected_forms":1}'::jsonb
    or jsonb_array_length(report->'recent') is distinct from 1
    or report->'recent'->0->>'name' is distinct from 'Website lead'
    or (report->'recent'->0) ? 'email' then
    raise exception 'Seven-day report must only include the scoped recent website lead and reduced fields';
  end if;

  report := public.brunerdigital_inquiry_overview(intake, now() - interval '30 days');
  if report - 'recent' is distinct from '{"total":2,"website":1,"walkthroughs":1,"connected_forms":1}'::jsonb
    or jsonb_array_length(report->'recent') is distinct from 2
    or report->'recent'->1->>'name' is distinct from 'Older walkthrough' then
    raise exception 'Thirty-day report must also include the older walkthrough in order';
  end if;

  if public.brunerdigital_inquiry_overview(intake, now() - interval '1 hour')
      is distinct from '{"total":0,"website":0,"walkthroughs":0,"connected_forms":0,"recent":[]}'::jsonb then
    raise exception 'An empty period must return zero counts and an empty list';
  end if;

  if public.brunerdigital_inquiry_overview('66000000-0000-4000-8000-000000000003', now() - interval '30 days') is not null then
    raise exception 'A foreign workspace must be rejected even under the service role';
  end if;

  if public.brunerdigital_inquiry_overview('66000000-0000-4000-8000-000000000004', now() - interval '30 days') is not null then
    raise exception 'A same-tenant unprotected workspace must be rejected even under the service role';
  end if;

  if has_function_privilege('anon', 'public.brunerdigital_inquiry_overview(uuid,timestamptz)', 'EXECUTE')
    or has_function_privilege('authenticated', 'public.brunerdigital_inquiry_overview(uuid,timestamptz)', 'EXECUTE') then
    raise exception 'Public and authenticated clients must not execute the overview directly';
  end if;
end;
$$;

rollback;
