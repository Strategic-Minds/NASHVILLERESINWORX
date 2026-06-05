# NRW Autonomous Content Ops Launch Checklist

## Asset Gates

- [ ] Approved Drive folders populated.
- [ ] Asset audit complete.
- [ ] Every asset has source folder, service category, usage rights, and approval status.
- [ ] Customer-identifying assets have explicit approval.

## Data Gates

- [ ] Supabase migration reviewed.
- [ ] RLS enabled on all new tables.
- [ ] Admin/service access rules verified.
- [ ] Sample records inserted in sandbox or branch.
- [ ] Query tests pass.

## Workflow Gates

- [ ] Discovery dry run complete.
- [ ] Draft generation dry run complete.
- [ ] Compliance review dry run complete.
- [ ] Publishing dry run creates queue rows without posting.
- [ ] Analytics dry run records events.
- [ ] Daily digest generated.

## Production QA Gates

- [ ] Desktop screenshot QA passed.
- [ ] Mobile screenshot QA passed.
- [ ] Live lead form submitted.
- [ ] Matching row confirmed in `public.nrw_leads`.
- [ ] Rollback plan confirmed.

## Publishing Gates

- [ ] Platform accounts verified.
- [ ] Posting permissions documented.
- [ ] Approval policy active.
- [ ] First 7-day content queue approved.
- [ ] Failure/retry queue monitored.
