import { brand, scoreLead } from "@/lib/brand";
import type { DriveUploadedFile } from "@/lib/google-drive";
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

export type LeadPhotoUploadSummary = {
  folderUrl: string | null;
  uploadedFiles: DriveUploadedFile[];
  error: string | null;
};

export type LeadPersistenceResult =
  | { ok: true; mode: "preview" | "supabase" }
  | { ok: false; mode: "supabase"; error: string };

export function buildLeadPayload(formData: FormData, photoUploadSummary?: LeadPhotoUploadSummary): LeadPayload {
  const timeline = cleanOptional(formData.get("timeline")) || cleanOptional(formData.get("desiredStartDate"));
  const budgetRange = cleanOptional(formData.get("budgetRange"));
  const parsedName = parseName(formData);
  const detailNotes = buildDetailNotes(formData, photoUploadSummary);
  const hasPhotos = hasUploadedFiles(formData, "photos") || hasUploadedFiles(formData, "inspirationPhotos");

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
    notes: detailNotes,
    lead_score: scoreLead(timeline || "", hasPhotos, Boolean(budgetRange)) as LeadScore,
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

function buildDetailNotes(formData: FormData, photoUploadSummary?: LeadPhotoUploadSummary) {
  const entries = [
    ["Coupon", cleanOptional(formData.get("couponCode"))],
    ["Total rooms", cleanOptional(formData.get("roomCount"))],
    ["Room sizes", cleanOptional(formData.get("roomSizes"))],
    ["Concrete age", cleanOptional(formData.get("concreteAge"))],
    ["Current floor material", cleanOptional(formData.get("currentFloor"))],
    ["Selected color", cleanOptional(formData.get("selectedColor"))],
    ["Desired start date", cleanOptional(formData.get("desiredStartDate"))],
    ["Customer notes", cleanOptional(formData.get("notes"))],
    ["Existing floor photos", getUploadedFileNames(formData, "photos")],
    ["Inspiration photos", getUploadedFileNames(formData, "inspirationPhotos")],
    ["Google Drive folder", photoUploadSummary?.folderUrl],
    ["Google Drive existing floor photos", formatDriveLinks(photoUploadSummary?.uploadedFiles, "photos")],
    ["Google Drive inspiration photos", formatDriveLinks(photoUploadSummary?.uploadedFiles, "inspirationPhotos")],
    ["Google Drive upload status", photoUploadSummary?.error],
    ["Estimate terms", "Estimate valid for 15 days. Service range is within 1 hour of the Nashville shop. Estimates are provided in 48 hours."]
  ];

  const lines = entries
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  return lines.length ? lines.join("\n") : null;
}

function hasUploadedFiles(formData: FormData, field: string) {
  return formData.getAll(field).some((value) => typeof value !== "string" && value.name && value.size > 0);
}

function getUploadedFileNames(formData: FormData, field: string) {
  const names = formData
    .getAll(field)
    .filter((value): value is File => typeof value !== "string" && value.name.length > 0 && value.size > 0)
    .map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`);

  return names.length ? names.join(", ") : null;
}

function formatDriveLinks(files: DriveUploadedFile[] | undefined, field: DriveUploadedFile["field"]) {
  const links = (files || [])
    .filter((file) => file.field === field)
    .map((file) => `${file.name} (${Math.round(file.size / 1024)} KB): ${file.url}`);

  return links.length ? links.join(" | ") : null;
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
