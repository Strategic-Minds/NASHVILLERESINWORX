# Nashville Resin Worx Cron + Workflow Scaffold

## Purpose

This scaffold turns the Nashville Resin Worx auto-doc pack into repo-ready route stubs for Next.js 15 on Vercel.

## What It Adds

- `vercel.json` cron definitions
- Protected cron route stubs
- Draft-only workflow route
- NRW source-truth constants
- Metricool draft payload builder
- Governance and blocked-action constants

## Runtime Boundary

This scaffold is not a live launch. It does not publish, schedule, mutate Shopify, apply Supabase schema, change billing, send email/SMS, or run ads.

## Required Before Production

- Add `CRON_SECRET`
- Replace stubs with Vercel Workflow DevKit implementation
- Verify Metricool connector capability
- Implement admin approval gate
- Implement kill switch
- Run Vercel Sandbox validation
- Capture browser QA evidence
- Get final operator approval
