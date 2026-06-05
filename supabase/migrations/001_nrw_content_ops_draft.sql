-- Draft only. Do not apply to production without explicit approval.

create table if not exists public.nrw_assets (
  id uuid primary key default gen_random_uuid(),
  drive_file_id text,
  source_folder text not null,
  asset_type text not null check (asset_type in ('image', 'video', 'document', 'audio', 'unknown')),
  service_category text,
  status text not null default 'new' check (status in ('new', 'approved', 'needs_review', 'rejected', 'archived')),
  risk_level text not null default 'medium' check (risk_level in ('low', 'medium', 'high')),
  usage_rights text not null default 'unknown' check (usage_rights in ('verified', 'needs_review', 'unknown')),
  customer_identifiable boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_content_ideas (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  source text not null,
  funnel_stage text,
  score numeric not null default 0,
  status text not null default 'discovered',
  risk_level text not null default 'low',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_content_posts (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid,
  platform text not null,
  status text not null default 'draft',
  risk_level text not null default 'medium',
  copy text not null,
  cta text,
  asset_ids uuid[] not null default '{}',
  approval_request_id uuid,
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_publishing_queue (
  id uuid primary key default gen_random_uuid(),
  content_post_id uuid not null references public.nrw_content_posts(id) on delete cascade,
  platform text not null,
  status text not null default 'queued',
  approval_required boolean not null default true,
  approval_request_id uuid,
  scheduled_for timestamptz,
  tracking_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_approval_requests (
  id uuid primary key default gen_random_uuid(),
  subject_type text not null,
  subject_id uuid,
  status text not null default 'open',
  risk_level text not null default 'medium',
  reason text not null,
  decision_notes text,
  requested_by text not null default 'automation',
  decided_by text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.nrw_platform_accounts (
  id uuid primary key default gen_random_uuid(),
  platform text not null unique,
  handle text,
  credential_status text not null default 'unverified',
  posting_enabled boolean not null default false,
  analytics_enabled boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_campaign_experiments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hypothesis text,
  status text not null default 'planned',
  start_at timestamptz,
  end_at timestamptz,
  success_metric text,
  created_at timestamptz not null default now()
);

create table if not exists public.nrw_content_analytics_events (
  id uuid primary key default gen_random_uuid(),
  content_post_id uuid references public.nrw_content_posts(id) on delete set null,
  campaign_id uuid,
  platform text,
  event_type text not null,
  event_value numeric,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.nrw_lead_attribution (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid,
  campaign_id uuid,
  content_post_id uuid references public.nrw_content_posts(id) on delete set null,
  tracking_id text,
  attribution_source text,
  created_at timestamptz not null default now()
);

create table if not exists public.nrw_qa_runs (
  id uuid primary key default gen_random_uuid(),
  qa_type text not null,
  status text not null default 'planned',
  target_url text,
  evidence jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.nrw_failure_queue (
  id uuid primary key default gen_random_uuid(),
  workflow_name text not null,
  stage text not null,
  severity text not null default 'medium',
  status text not null default 'open',
  payload jsonb not null default '{}'::jsonb,
  error_message text,
  retry_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nrw_daily_digest (
  id uuid primary key default gen_random_uuid(),
  digest_date date not null unique,
  wins jsonb not null default '[]'::jsonb,
  blockers jsonb not null default '[]'::jsonb,
  next_posts jsonb not null default '[]'::jsonb,
  lead_signals jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.nrw_assets enable row level security;
alter table public.nrw_content_ideas enable row level security;
alter table public.nrw_content_posts enable row level security;
alter table public.nrw_publishing_queue enable row level security;
alter table public.nrw_approval_requests enable row level security;
alter table public.nrw_platform_accounts enable row level security;
alter table public.nrw_campaign_experiments enable row level security;
alter table public.nrw_content_analytics_events enable row level security;
alter table public.nrw_lead_attribution enable row level security;
alter table public.nrw_qa_runs enable row level security;
alter table public.nrw_failure_queue enable row level security;
alter table public.nrw_daily_digest enable row level security;
