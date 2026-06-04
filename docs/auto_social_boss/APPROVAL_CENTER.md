# AUTO SOCIAL - RESIN WORX APPROVAL CENTER

Status: approval-controlled
Purpose: single human-readable gate for all public-facing or business-impacting actions.

## Approval Center Rule
No agent may publish, send, spend, change pricing, mutate schema, modify environment variables, or make public claims unless an approval record exists.

## Approval Queues

### Content Approval
Review: thumbnail, script, caption, hashtags, platform, avatar, asset links, CTA, scheduled date.
Actions: approve, reject, revise.

### Email/SMS Approval
Review: subject, preview text, body, audience segment, send time, CTA.
Actions: approve test only, approve live send, reject, revise.

### Ads Approval
Review: creative, copy, budget, targeting, dates, landing page, offer.
Actions: approve, reject, revise.

### Website Approval
Review: proposed file, change summary, screenshot, risk level, rollback plan.
Actions: approve, reject, revise.

### Shopify/Product Approval
Review: product title, description, price, images, video, inventory, offer.
Actions: approve, reject, revise.

### Data/Infrastructure Approval
Review: Supabase schema changes, Vercel env changes, GitHub workflows, API keys, webhooks.
Actions: approve, reject, revise.

## Approval Fields
approval_id, item_type, item_id, requested_by_agent, request_summary, risk_level, current_status, reviewer, decision, decision_time, notes, rollback_required, evidence_link

## Risk Levels
Low: draft content, internal docs, topic scoring.
Medium: scheduled drafts, website copy, email drafts.
High: publishing, email/SMS sending, paid ads, product changes.
Critical: billing, schema, env variables, governance, API keys.

## Escalation
High and Critical approvals require Jeremy approval.

## Digital Page Spec
Future page: /admin/approvals
Protected by Supabase Auth.
Cards grouped by queue: content, email, ads, website, Shopify, infrastructure.
Buttons: Approve, Reject, Request Revision, View Evidence, Rollback.

## Default State
Autonomous posting disabled.
Autonomous email/SMS disabled.
Autonomous ad spend disabled.
