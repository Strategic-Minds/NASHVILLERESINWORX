import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Nashville Resin Worx | Premium Epoxy, Concrete, Countertops & River Tables",
  description:
    "Premium custom decorative surfaces in Nashville: metallic epoxy, flake systems, polished concrete, stained concrete, countertops, river tables, stone surfaces, and decorative concrete.",
  manifest: "/manifest.webmanifest",
  applicationName: brand.name,
  openGraph: {
    title: "Nashville Resin Worx",
    description: "Premium custom epoxy, concrete, wood, metal, and stone surfaces.",
    type: "website",
    images: ["/images/resin-surface-hero.svg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
