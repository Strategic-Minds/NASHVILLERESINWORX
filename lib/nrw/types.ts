export type NrwWorkflowMode = "dry_run" | "draft_only" | "approved_route";

export type NrwApprovalState =
  | "draft"
  | "needs_review"
  | "approved"
  | "routed_to_metricool_draft"
  | "blocked"
  | "rejected";

export type NrwCronJob =
  | "morning_readiness"
  | "content_queue"
  | "metricool_draft_check"
  | "analytics_sync"
  | "weekly_optimization";

export type NrwWorkflowResult = {
  ok: boolean;
  mode: NrwWorkflowMode;
  state: NrwApprovalState;
  job: string;
  message: string;
  blockedActions: string[];
  evidence: Record<string, unknown>;
};
