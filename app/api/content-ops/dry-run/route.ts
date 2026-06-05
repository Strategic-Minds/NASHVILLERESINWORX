import { NextResponse } from "next/server";
import { generateDryRunContentQueue } from "@/lib/content-ops/dry-run";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(generateDryRunContentQueue());
}
