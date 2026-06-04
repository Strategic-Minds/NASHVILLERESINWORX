import { NextResponse } from "next/server";
import { brand, scoreLead } from "@/lib/brand";

const requiredFields = ["firstName", "lastName", "phone", "email", "projectType"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const missing = requiredFields.filter((field) => !String(formData.get(field) || "").trim());

  if (missing.length > 0) {
    return NextResponse.json({ ok: false, error: "Missing required lead fields.", missing }, { status: 400 });
  }

  const email = String(formData.get("email") || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }

  const lead = {
    projectType: String(formData.get("projectType") || ""),
    timeline: String(formData.get("timeline") || ""),
    budgetRange: String(formData.get("budgetRange") || ""),
    destination: brand.leadEmail,
    score: scoreLead(String(formData.get("timeline") || ""), Boolean(formData.get("photos")), Boolean(formData.get("budgetRange")))
  };

  // Production notification/storage remains approval-gated until env vars,
  // provider credentials, spam controls, and data retention rules are verified.
  console.info("NRW_LEAD_INTAKE_DRAFT", lead);

  return NextResponse.json({ ok: true, message: "Estimate request received.", leadScore: lead.score });
}
