# NRW Implementation Checklist

## Branch/Sandbox First

- [ ] Confirm import alias `@/` points to project root or adjust imports.
- [ ] Run local typecheck/build.
- [ ] Run route smoke tests with and without `CRON_SECRET`.
- [ ] Validate that unauthorized cron requests return 401.
- [ ] Validate that authorized cron requests return draft-only JSON.

## Workflow Upgrade

- [ ] Replace `lib/nrw/workflow.ts` stub with Vercel Workflow DevKit implementation.
- [ ] Add approval pause/resume.
- [ ] Add evidence receipts.
- [ ] Add retry handling.
- [ ] Add blocked-action logging.

## Metricool

- [ ] Verify Metricool API/connector capability.
- [ ] Confirm draft creation mode.
- [ ] Confirm schedule/publish can remain disabled.
- [ ] Store returned Metricool draft IDs.
- [ ] Do not schedule or publish until final approval.

## Admin Control Plane

- [ ] Build hidden `/admin`.
- [ ] Add content approval queue.
- [ ] Add Metricool draft queue.
- [ ] Add kill switch.
- [ ] Add evidence log.
- [ ] Add workflow health panel.

## Drive/Brand Assets

- [ ] Map exact logo files from `07_Logos_Icons_Fonts`.
- [ ] Map brand kit assets from `00_Brand_Kit`.
- [ ] Map visual assets from hero, gallery, process, product, and before/after folders.
- [ ] Enforce Metallic Resin Blue and approved logo usage.

## Production Gates

- [ ] Operator approves Vercel deployment.
- [ ] Operator approves production cron enablement.
- [ ] Operator approves Shopify mutation.
- [ ] Operator approves Metricool draft route.
- [ ] Operator separately approves any scheduling/publishing.
