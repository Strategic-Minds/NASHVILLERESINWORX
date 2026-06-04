const defaultSupabaseUrl = "https://prhppuuwcnmfdhwsagug.supabase.co";
const defaultSupabasePublishableKey = "sb_publishable_kGj9PTt1biObaT6q1uOTHw_nEJI1Rov";

export type SupabaseInsertResult =
  | { ok: true; mode: "supabase" }
  | { ok: false; mode: "supabase"; error: string };

export function getSupabaseRuntimeConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || defaultSupabaseUrl;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    defaultSupabasePublishableKey;

  return { url, key };
}

export async function insertSupabaseRow(table: string, payload: Record<string, unknown>): Promise<SupabaseInsertResult> {
  const { url, key } = getSupabaseRuntimeConfig();

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { ok: false, mode: "supabase", error: `Supabase insert failed for ${table} with status ${response.status}.` };
  }

  return { ok: true, mode: "supabase" };
}
