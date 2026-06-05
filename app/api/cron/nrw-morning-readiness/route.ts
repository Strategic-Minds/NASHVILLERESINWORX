import { assertCronAuthorized } from "@/lib/nrw/cron-auth";
import { runNrwWorkflow } from "@/lib/nrw/workflow";

export async function GET(request: Request) {
  const unauthorized = assertCronAuthorized(request);
  if (unauthorized) return unauthorized;

  const result = await runNrwWorkflow("morning_readiness");
  return Response.json(result);
}
