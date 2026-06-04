import { NextResponse } from "next/server";
import { buildLeadPayload, persistLeadIfEnabled } from "@/lib/leads";

const requiredFields = ["phone", "email", "projectType"];
const rateWindowMs = 60_000;
const maxRequestsPerWindow = 5;
const recentRequests = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return respond(request, { ok: false, error: "Too many estimate attempts. Please try again in a minute." }, 429);
  }

  const formData = await request.formData();
  if (String(formData.get("website") || "").trim()) {
    return respond(request, { ok: true, leadScore: "cold" }, 200, "/thank-you");
  }

  const missing = requiredFields.filter((field) => !String(formData.get(field) || "").trim());
  const hasSplitName = String(formData.get("firstName") || "").trim() && String(formData.get("lastName") || "").trim();
  const hasFullName = String(formData.get("fullName") || "").trim();
  if (!hasSplitName && !hasFullName) {
    missing.unshift("fullName");
  }

  if (missing.length > 0) {
    return respond(request, { ok: false, error: "Missing required lead fields.", missing }, 400);
  }

  const email = String(formData.get("email") || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(request, { ok: false, error: "A valid email is required." }, 400);
  }

  const phone = String(formData.get("phone") || "").replace(/[^0-9+]/g, "");
  if (phone.length < 7) {
    return respond(request, { ok: false, error: "A valid phone number is required." }, 400);
  }

  const lead = buildLeadPayload(formData);
  const persistence = await persistLeadIfEnabled(lead);
  if (!persistence.ok) {
    return respond(request, { ok: false, error: "Estimate request could not be saved." }, 502, "/estimate-error");
  }

  return respond(request, { ok: true, message: "Estimate request received.", leadScore: lead.lead_score }, 200, "/thank-you");
}

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = recentRequests.get(clientKey);
  if (!current || current.resetAt <= now) {
    recentRequests.set(clientKey, { count: 1, resetAt: now + rateWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

function respond(request: Request, body: Record<string, unknown>, status: number, redirectPath?: string) {
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  if (redirectPath && !wantsJson) {
    return NextResponse.redirect(new URL(redirectPath, request.url), { status: 303 });
  }

  return NextResponse.json(body, { status });
}
