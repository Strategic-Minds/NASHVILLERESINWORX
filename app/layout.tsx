import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nashville Resin Worx | Epoxy, Wood, Metal, Concrete & Stone",
  description:
    "Nashville Resin Worx builds premium epoxy floors, polished concrete, stained concrete, overlays, countertops, river tables, and custom surfaces.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
