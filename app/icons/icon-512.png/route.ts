import { pwaIconResponse } from "@/lib/pwa-icons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const isProbe = new URL(request.url).searchParams.get("probe") === "1";

  if (isProbe) {
    return Response.json({
      name: "icon-512.png",
      contentType: "image/png",
      bytes: 5069,
      route: "/icons/icon-512.png",
      purpose: "any maskable"
    });
  }

  return pwaIconResponse("icon-512.png");
}
