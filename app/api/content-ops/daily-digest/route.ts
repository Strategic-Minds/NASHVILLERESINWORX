import { NextResponse } from "next/server";
import { generateDailyDigest } from "@/lib/content-ops/dry-run";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(generateDailyDigest());
}
