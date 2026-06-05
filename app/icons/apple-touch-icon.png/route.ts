import { pwaIconResponse } from "@/lib/pwa-icons";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  return pwaIconResponse("apple-touch-icon.png");
}
