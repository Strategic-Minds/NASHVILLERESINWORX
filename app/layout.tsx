import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";
import { TelemetryBeacon } from "@/app/components/TelemetryBeacon";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || brand.siteUrl),
  title: "Nashville Resin Worx | Premium Epoxy, Concrete, Countertops & River Tables",
  description:
    "Premium custom decorative surfaces in Nashville: metallic epoxy, flake systems, polished concrete, stained concrete, countertops, river tables, stone surfaces, and decorative concrete.",
  manifest: "/manifest.webmanifest",
  applicationName: brand.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Nashville Resin Worx",
    description: "Premium custom epoxy, concrete, wood, metal, and stone surfaces.",
    type: "website",
    images: [brand.assets.brandPackBoard]
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <TelemetryBeacon />
      </body>
    </html>
  );
}
