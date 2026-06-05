# NRW AUTO BUILDER Full System Build Docs

## Purpose

This document is the repo-level build specification for the Nashville Resin Worx 24/7 governed autonomous content and lead-generation operating system.

The system must be built as an autonomous business operating layer, not as a chatbot and not as a one-off website patch. AUTO BUILDER should keep implementing branch-safe system pieces until it reaches a real approval gate.

## Current Build State

- Work branch: `auto-builder/nrw-content-ops`
- Production branch: `main`
- Production URL: `https://nashvilleresinworx-strategic-minds-advisory.vercel.app`
- Supabase project: `prhppuuwcnmfdhwsagug`
- Current branch includes docs, approval matrix, launch checklist, JSON schemas, workflow contract, migration draft, guarded dry-run route, guarded daily digest route, and dry-run helpers.
- Production `main` has not been changed by this content-ops branch.
- Public publishing is disabled.
- Supabase migration is draft-only until approved.

## Business Goal

Turn Nashville Resin Worx into a continuously operating local-demand capture engine that produces qualified estimate requests, builds social proof, grows awareness, and reduces manual content workload.

## Operating Loop

Discover -> Capture -> Analyze -> Repurpose -> Create -> Revise -> Finalize -> Queue -> Publish -> Measure -> Optimize -> Repeat.

## Source Truth

Verified business details:

- Brand: Nashville Resin Worx
- Phone: `(772) 209-0266`
- Email: `info@epoxywillchangeyourlife.com`
- Location signal: Nashville, Tennessee

Approved Drive asset folders:

- `01_Hero_Collages`
- `02_Color_Charts`
- `03_Gallery_Portfolio`
- `04_Process_Images`
- `05_Product_Images`
- `06_Customer_Uploads`
- `07_Logos_Icons_Fonts`

Asset rules:

- Assets must be traced to a Drive file ID or explicitly approved source.
- Customer-identifying assets require approval metadata.
- Unverified images may be used only in internal draft mode.
- Public content must not use customer upload assets until rights are verified.

## Agent Topology

### Master Orchestrator Agent
Owns the workflow loop, prioritizes tasks, checks gates, and routes work.

### Asset Intake Agent
Audits Drive folders, classifies files, creates asset records, and flags missing approvals.

### Content Discovery Agent
Finds topics from local demand, service categories, seasonal timing, FAQs, objections, and competitor patterns.

### Trend And Competitor Research Agent
Benchmarks local epoxy/concrete businesses and extracts safe content patterns.

### Content Analysis Agent
Scores ideas and assets by funnel stage, proof strength, CTA fit, and risk.

### Repurposing Agent
Turns one approved source asset into platform-specific drafts.

### Creative Production Agent
Creates hooks, scripts, captions, thumbnail briefs, blog snippets, email/SMS drafts, and gallery copy.

### Brand And Compliance Editor Agent
Checks brand voice, local SEO, claim safety, and approval requirements.

### Approval Gate Agent
Creates approval requests and blocks unsafe state transitions.

### Publishing Queue Agent
Creates queue rows and schedules approved content. It does not publish until enabled.

### Analytics Agent
Imports metrics and scores post/campaign performance.

### Optimization Agent
Identifies winners, losers, next experiments, and kill/scale recommendations.

### Recovery And Retry Agent
Monitors failed tasks, retries safe failures, and escalates repeated failures.

### Memory Agent
Maintains durable state, operator rules, asset gaps, and build status.

## Data System

Required tables:

- `nrw_assets`
- `nrw_content_ideas`
- `nrw_content_posts`
- `nrw_publishing_queue`
- `nrw_approval_requests`
- `nrw_platform_accounts`
- `nrw_campaign_experiments`
- `nrw_content_analytics_events`
- `nrw_lead_attribution`
- `nrw_qa_runs`
- `nrw_failure_queue`
- `nrw_daily_digest`

Security rules:

- Enable RLS on every table.
- No anonymous public reads by default.
- Automation writes should use server-side credentials only.
- Admin access must be role-gated.
- Customer data must not be exposed through public routes.

## API And Worker Plan

Current routes:

- `/api/content-ops/dry-run`
- `/api/content-ops/daily-digest`

Both routes are token-gated in production.

Next routes to build:

- `/api/content-ops/assets`
- `/api/content-ops/ideas`
- `/api/content-ops/posts`
- `/api/content-ops/approvals`
- `/api/content-ops/queue`
- `/api/content-ops/analytics`
- `/api/content-ops/qa`

Future cron routes:

- `/api/content-ops/cron/asset-audit`
- `/api/content-ops/cron/discovery`
- `/api/content-ops/cron/draft-generation`
- `/api/content-ops/cron/analytics`
- `/api/content-ops/cron/daily-digest`
- `/api/content-ops/cron/recovery`

All cron routes must be token-gated.

## Governance

Autonomous without approval:

- Inspect source folders.
- Draft content.
- Score opportunities.
- Create dry-run queue rows.
- Generate reports.
- Create approval requests.
- Analyze approved analytics.

Approval required:

- Public publishing
- Paid ads
- Bulk email/SMS
- Customer-identifying content
- Pricing/warranty/safety/certification claims
- Production deploys
- Supabase migrations
- Credential/env mutation

Blocked unless explicitly enabled:

- Auto-spend ad budget
- Auto-publish to unverified accounts
- Use copyrighted third-party assets without rights
- Expose customer personal data
- Change infrastructure or database policies without review

## Runtime Environment Contract

Required for dry run:

- `CONTENT_OPS_DRY_RUN_TOKEN`

Required for cron workers:

- `CONTENT_OPS_CRON_TOKEN`
- `CONTENT_OPS_WORKERS_ENABLED`

Required for Supabase writes:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`

Required for Drive audit:

- verified Drive connector or server OAuth
- `DRIVE_ASSET_AUDIT_ENABLED`

Required for browser QA:

- Playwright
- Chromium/Chrome executable
- outbound network access to preview/production

Required for lead QA:

- outbound POST access to Vercel production
- Supabase query access

Required for publishing:

- per-platform credential
- per-platform account verification
- `SOCIAL_PUBLISHING_ENABLED=true`
- platform-specific allow flag
- approved publishing queue

Forbidden in client bundles:

- Supabase service role key
- social platform secrets
- cron tokens
- publishing tokens

## Validation And QA

Required validation:

- Drive folder audit
- Asset availability check
- Schema validation
- API route access guard test
- Dry-run queue generation
- Daily digest generation
- Supabase migration sandbox test
- Browser desktop screenshot
- Browser mobile screenshot
- Live lead form submission
- Supabase row confirmation
- Publishing dry run
- Analytics dry run
- Rollback test

## Implementation Backlog

### Phase 1 - Builder Docs And Scaffold

- [x] Create sandbox package.
- [x] Add repo branch scaffold.
- [x] Add dry-run routes.
- [x] Add access guard.
- [x] Add migration draft.
- [x] Add full AUTO BUILDER system docs.

### Phase 2 - Data Layer

- [ ] Review SQL migration.
- [ ] Add rollback SQL.
- [ ] Apply migration to Supabase branch/sandbox.
- [ ] Verify RLS and table access.
- [ ] Add typed data access helpers.

### Phase 3 - Asset Intake

- [ ] Populate Drive folders.
- [ ] Add Drive audit worker.
- [ ] Generate asset manifest.
- [ ] Write asset records.
- [ ] Flag missing usage rights.

### Phase 4 - Content Engine

- [ ] Add idea generator.
- [ ] Add scoring model.
- [ ] Add repurposing templates.
- [ ] Add approval queue writer.
- [ ] Add dry-run publishing queue writer.

### Phase 5 - Admin Surface

- [ ] Add protected content-ops admin page.
- [ ] Add asset board.
- [ ] Add draft queue.
- [ ] Add approval queue.
- [ ] Add analytics/digest panel.

### Phase 6 - QA

- [ ] Run desktop screenshot QA.
- [ ] Run mobile screenshot QA.
- [ ] Run live lead form QA.
- [ ] Confirm Supabase lead row.
- [ ] Record QA evidence.

### Phase 7 - Publishing Activation

- [ ] Verify platform credentials.
- [ ] Enable one platform at a time.
- [ ] Run dry-run publish simulation.
- [ ] Approve first 7-day queue.
- [ ] Activate scheduled posting only after approval.

## Daily Ops Runbook

Morning:

1. Audit Drive folders.
2. Review new assets.
3. Generate daily content ideas.
4. Score and prioritize drafts.
5. Produce approval queue.

Midday:

1. Review approvals.
2. Generate platform variants.
3. Refresh publishing queue.
4. Check failure queue.

Evening:

1. Import analytics.
2. Attribute leads.
3. Score winners and losers.
4. Produce daily digest.

Weekly:

1. Review top-performing topics.
2. Kill weak content patterns.
3. Scale winning formats.
4. Update content calendar.
5. Review asset gaps.

## Release Gates

Do not merge or activate live automation until:

- Code review passes.
- Migration is approved.
- Preview build passes.
- Dry-run route is protected.
- Asset folders are populated.
- Browser QA passes.
- Lead/Supabase QA passes.
- Platform credentials are verified.
- Publishing policy is approved.
