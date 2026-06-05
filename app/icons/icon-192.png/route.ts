import { pwaIconResponse } from "@/lib/pwa-icons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const isProbe = new URL(request.url).searchParams.get("probe") === "1";

  if (isProbe) {
    return Response.json({
      name: "icon-192.png",
      contentType: "image/png",
      bytes: 1862,
      route: "/icons/icon-192.png"
    });
  }

  return pwaIconResponse("icon-192.png");
}
