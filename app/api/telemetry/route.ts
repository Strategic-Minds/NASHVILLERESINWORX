import { NextResponse } from "next/server";
import { buildTelemetryPayload, persistTelemetryIfEnabled } from "@/lib/telemetry";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Telemetry payload must be JSON." }, { status: 400 });
  }

  const payload = buildTelemetryPayload(body);
  if (!payload.event_name) {
    return NextResponse.json({ ok: false, error: "Telemetry event_name is required." }, { status: 400 });
  }

  const result = await persistTelemetryIfEnabled(payload);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Telemetry could not be saved." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
