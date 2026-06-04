import { insertSupabaseRow } from "@/lib/supabase";

export type TelemetryPayload = {
  event_name: string;
  path: string | null;
  referrer: string | null;
  session_id: string | null;
  metadata: Record<string, unknown>;
};

export function buildTelemetryPayload(input: Record<string, unknown>): TelemetryPayload {
  return {
    event_name: clean(String(input.event_name || input.eventName || "page_view")).slice(0, 120),
    path: cleanOptional(input.path),
    referrer: cleanOptional(input.referrer),
    session_id: cleanOptional(input.session_id || input.sessionId),
    metadata: typeof input.metadata === "object" && input.metadata !== null ? (input.metadata as Record<string, unknown>) : {}
  };
}

export async function persistTelemetryIfEnabled(payload: TelemetryPayload) {
  if (process.env.NRW_ENABLE_SUPABASE_TELEMETRY === "false") {
    return { ok: true, mode: "disabled" as const };
  }

  return insertSupabaseRow("nrw_telemetry_events", payload);
}

function clean(value: string) {
  return value.trim();
}

function cleanOptional(value: unknown) {
  const cleaned = clean(String(value || ""));
  return cleaned.length ? cleaned : null;
}
