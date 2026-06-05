import { pwaIconResponse } from "@/lib/pwa-icons";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET(request: Request) {
  const isProbe = new URL(request.url).searchParams.get("probe") === "1";

  if (isProbe) {
    return Response.json({
      name: "apple-touch-icon.png",
      contentType: "image/png",
      bytes: 1686,
      route: "/icons/apple-touch-icon.png"
    });
  }

  return pwaIconResponse("apple-touch-icon.png");
}
