export const NRW_BLOCKED_ACTIONS = [
  "production_vercel_deployment",
  "production_cron_enablement",
  "shopify_mutation",
  "metricool_schedule_or_publish",
  "supabase_schema_apply",
  "stripe_billing_checkout_or_pricing",
  "paid_ads",
  "public_launch",
];

export function denyByDefault(reason: string) {
  return {
    ok: false,
    mode: "draft_only" as const,
    state: "blocked" as const,
    message: reason,
    blockedActions: NRW_BLOCKED_ACTIONS,
  };
}

export function approvalRequired(message = "Operator approval required before live mutation.") {
  return {
    ok: true,
    mode: "draft_only" as const,
    state: "needs_review" as const,
    message,
    blockedActions: NRW_BLOCKED_ACTIONS,
  };
}
