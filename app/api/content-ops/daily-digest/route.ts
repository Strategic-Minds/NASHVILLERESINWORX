import { NextResponse } from "next/server";
import { canAccessContentOps } from "@/lib/content-ops/access";
import { generateDailyDigest } from "@/lib/content-ops/dry-run";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!canAccessContentOps(request)) {
    return NextResponse.json({ ok: false, error: "Content ops access is not enabled." }, { status: 403 });
  }

  return NextResponse.json(generateDailyDigest());
}
