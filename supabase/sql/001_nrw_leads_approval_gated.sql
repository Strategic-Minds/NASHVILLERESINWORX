-- Nashville Resin Worx lead persistence schema.
-- Approval gate: do not apply to a live Supabase project until production data retention,
-- Auth, roles, RLS tests, and environment secrets are explicitly approved.

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

alter table public.nrw_leads enable row level security;

revoke all on table public.nrw_leads from anon;
revoke all on table public.nrw_leads from authenticated;

create index if not exists nrw_leads_created_at_idx on public.nrw_leads (created_at desc);
create index if not exists nrw_leads_status_idx on public.nrw_leads (status);
create index if not exists nrw_leads_lead_score_idx on public.nrw_leads (lead_score);

comment on table public.nrw_leads is
  'Approval-gated Nashville Resin Worx website leads. No public RLS policies are created by default; server-side inserts must use approved server credentials only.';
