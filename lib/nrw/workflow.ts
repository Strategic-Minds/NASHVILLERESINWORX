import { NRW_SOURCE_TRUTH } from "./source-truth";
import { approvalRequired } from "./governance";
import { buildMetricoolDraftPayload } from "./metricool";
import type { NrwCronJob, NrwWorkflowResult } from "./types";

export async function runNrwWorkflow(job: NrwCronJob): Promise<NrwWorkflowResult> {
  const base = approvalRequired(`NRW ${job} completed as draft-only workflow step.`);

  const evidence = {
    sourceTruth: NRW_SOURCE_TRUTH,
    metricoolDraftSample: buildMetricoolDraftPayload({
      postId: `NRW-${new Date().toISOString().slice(0, 10)}-${job}`,
      caption: "Draft-only Metricool payload. Scheduling and publishing remain disabled.",
    }),
    cronJob: job,
    approvalRequired: true,
  };

  return {
    ...base,
    job,
    evidence,
  };
}
