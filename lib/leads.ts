import { brand, scoreLead } from "@/lib/brand";
import { insertSupabaseRow } from "@/lib/supabase";

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
  const parsedName = parseName(formData);

  return {
    first_name: parsedName.firstName,
    last_name: parsedName.lastName,
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
  if (process.env.NRW_ENABLE_SUPABASE_LEADS === "false") {
    return { ok: true, mode: "preview" };
  }

  const result = await insertSupabaseRow("nrw_leads", {
    ...payload,
    notification_destination: brand.leadEmail
  });

  if (!result.ok) {
    return { ok: false, mode: "supabase", error: result.error };
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

function parseName(formData: FormData) {
  const firstName = cleanRequired(formData.get("firstName"));
  const lastName = cleanRequired(formData.get("lastName"));
  if (firstName || lastName) {
    return {
      firstName,
      lastName: lastName || "Unknown"
    };
  }

  const fullName = cleanRequired(formData.get("fullName"));
  const [first, ...rest] = fullName.split(/\s+/);
  return {
    firstName: first || "Unknown",
    lastName: rest.join(" ") || "Unknown"
  };
}
