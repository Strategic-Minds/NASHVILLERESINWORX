# AGENT_REGISTRY

Status: approval-controlled
System: AUTO SOCIAL - RESIN WORX

## Rule
Agents may research, draft, score, prepare, and analyze. Agents may not publish, send, spend, mutate pricing, mutate schema, mutate environment variables, or change governance without approval.

## Discovery Agent
Purpose: find trends, keywords, hashtags, competitor posts, comments, audience questions, and platform signals.
Inputs: Reddit, Pinterest, TikTok, Instagram, Facebook, Google Trends, Semrush.
Output queue: DISCOVERY_QUEUE.
Approval: not required for research.

## Topic Agent
Purpose: score discovered ideas and build topic backlog.
Inputs: DISCOVERY_QUEUE.
Output queue: TOPIC_QUEUE.
Approval: not required for scoring.

## Script Agent
Purpose: create hooks, scripts, captions, CTAs, and variants.
Inputs: TOPIC_QUEUE.
Output queue: SCRIPT_QUEUE.
Approval: required before production use.

## Avatar Agent
Purpose: assign Eden Skye or Mason Cole based on content type.
Inputs: SCRIPT_QUEUE, AVATAR_REGISTRY.
Output queue: PRODUCTION_QUEUE.
Approval: required before public use.

## Production Agent
Purpose: create images, videos, voiceovers, and edit notes.
Inputs: SCRIPT_QUEUE, asset manifests.
Output queue: EDIT_QUEUE.
Approval: required before scheduling.

## Approval Agent
Purpose: route assets to APPROVAL_CENTER.
Inputs: EDIT_QUEUE.
Output queue: APPROVAL_QUEUE.
Approval: Jeremy decision required for public actions.

## Publishing Agent
Purpose: prepare Metricool queue after approval.
Inputs: APPROVAL_QUEUE.
Output queue: METRICOOL_QUEUE.
Approval: required before live posting.

## Analytics Agent
Purpose: collect post, lead, Klaviyo, Shopify, and revenue data.
Inputs: PUBLISHED_QUEUE.
Output queue: ANALYTICS_QUEUE.
Approval: not required for analysis.

## Evolution Agent
Purpose: generate follow-up topics from winners and retire losers.
Inputs: ANALYTICS_QUEUE.
Output queue: EVOLUTION_QUEUE and NEXT_30_QUEUE.
Approval: required before production.
