import { brand, scoreLead } from "@/lib/brand";

export type LeadScore = "hot" | "warm" | "cold";

export type LeadPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  project_type: string;
  square_footage: string | null;
  timeline: string | null;
  project_address: string | null;
  surface_condition: string | null;
  desired_finish: string | null;
  budget_range: string | null;
  notes: string | null;
  lead_score: LeadScore;
  source: "website";
  status: "new";
};

export type LeadPersistenceResult =
  | { ok: true; mode: "preview" | "supabase" }
  | { ok: false; mode: "supabase"; error: string };

export function buildLeadPayload(formData: FormData): LeadPayload {
  const timeline = cleanOptional(formData.get("timeline"));
  const budgetRange = cleanOptional(formData.get("budgetRange"));

  return {
    first_name: cleanRequired(formData.get("firstName")),
    last_name: cleanRequired(formData.get("lastName")),
    phone: cleanRequired(formData.get("phone")).replace(/[^0-9+]/g, ""),
    email: cleanRequired(formData.get("email")).toLowerCase(),
    project_type: cleanRequired(formData.get("projectType")),
    square_footage: cleanOptional(formData.get("squareFootage")),
    timeline,
    project_address: cleanOptional(formData.get("projectAddress")),
    surface_condition: cleanOptional(formData.get("surfaceCondition")),
    desired_finish: cleanOptional(formData.get("desiredFinish")),
    budget_range: budgetRange,
    notes: cleanOptional(formData.get("notes")),
    lead_score: scoreLead(timeline || "", Boolean(formData.get("photos")), Boolean(budgetRange)) as LeadScore,
    source: "website",
    status: "new"
  };
}

export async function persistLeadIfEnabled(payload: LeadPayload): Promise<LeadPersistenceResult> {
  if (process.env.NRW_ENABLE_SUPABASE_LEADS !== "true") {
    return { ok: true, mode: "preview" };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseSecret) {
    return { ok: false, mode: "supabase", error: "Supabase lead persistence is enabled but server credentials are missing." };
  }

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/nrw_leads`, {
    method: "POST",
    headers: {
      apikey: supabaseSecret,
      Authorization: `Bearer ${supabaseSecret}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      ...payload,
      notification_destination: brand.leadEmail
    })
  });

  if (!response.ok) {
    return { ok: false, mode: "supabase", error: `Supabase lead insert failed with status ${response.status}.` };
  }

  return { ok: true, mode: "supabase" };
}

function cleanRequired(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

function cleanOptional(value: FormDataEntryValue | null) {
  const cleaned = cleanRequired(value);
  return cleaned.length ? cleaned : null;
}
