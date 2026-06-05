import { runNrwWorkflow } from "@/lib/nrw/workflow";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const job = body.job ?? "content_queue";

  const allowedJobs = [
    "morning_readiness",
    "content_queue",
    "metricool_draft_check",
    "analytics_sync",
    "weekly_optimization",
  ];

  if (!allowedJobs.includes(job)) {
    return Response.json({ ok: false, state: "blocked", message: "Unknown NRW workflow job." }, { status: 400 });
  }

  const result = await runNrwWorkflow(job);
  return Response.json(result);
}
