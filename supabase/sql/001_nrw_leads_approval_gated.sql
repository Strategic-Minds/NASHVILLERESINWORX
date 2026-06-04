-- Nashville Resin Worx live Supabase lock schema.
-- Applied after explicit approval on 2026-06-04.

create extension if not exists pgcrypto;

create table if not exists public.nrw_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  project_type text not null,
  square_footage text,
  timeline text,
  project_address text,
  surface_condition text,
  desired_finish text,
  budget_range text,
  notes text,
  lead_score text not null check (lead_score in ('hot', 'warm', 'cold')),
  source text not null default 'website',
  status text not null default 'new',
  notification_destination text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists nrw_leads_created_at_idx on public.nrw_leads (created_at desc);
create index if not exists nrw_leads_status_idx on public.nrw_leads (status);
create index if not exists nrw_leads_lead_score_idx on public.nrw_leads (lead_score);

alter table public.nrw_leads enable row level security;
revoke all on table public.nrw_leads from anon;
revoke all on table public.nrw_leads from authenticated;
grant insert on table public.nrw_leads to anon, authenticated;

create policy "website can submit leads"
  on public.nrw_leads
  for insert
  to anon, authenticated
  with check (source = 'website' and status = 'new');

create table if not exists public.nrw_user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('owner', 'admin', 'manager', 'staff', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.nrw_user_roles enable row level security;
revoke all on table public.nrw_user_roles from anon;
revoke all on table public.nrw_user_roles from authenticated;
grant select on table public.nrw_user_roles to authenticated;

create policy "authenticated users can read their own role"
  on public.nrw_user_roles
  for select
  to authenticated
  using (auth.uid() = user_id);

create table if not exists public.nrw_telemetry_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null check (length(event_name) between 1 and 120),
  path text,
  referrer text,
  session_id text,
  user_id uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists nrw_telemetry_created_at_idx on public.nrw_telemetry_events (created_at desc);
create index if not exists nrw_telemetry_event_name_idx on public.nrw_telemetry_events (event_name);

alter table public.nrw_telemetry_events enable row level security;
revoke all on table public.nrw_telemetry_events from anon;
revoke all on table public.nrw_telemetry_events from authenticated;
grant insert on table public.nrw_telemetry_events to anon, authenticated;

create policy "website can submit telemetry"
  on public.nrw_telemetry_events
  for insert
  to anon, authenticated
  with check (event_name <> '' and length(event_name) <= 120);
