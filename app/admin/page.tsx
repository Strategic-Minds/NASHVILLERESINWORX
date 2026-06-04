import { notFound } from "next/navigation";

const modules = ["Dashboard", "Leads", "Customers", "Projects", "Gallery", "Products", "Content", "QR Campaigns", "Reviews", "Settings"];

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (process.env.ADMIN_PREVIEW_UNLOCK !== "true") {
    notFound();
  }

  return <main className="admin-shell"><p className="eyebrow">Protected Route Placeholder</p><h1>/admin</h1><p className="hero-copy">Hidden from public navigation. Real admin mutation remains disabled until Supabase Auth, roles, and RLS are approved and tested.</p><div className="admin-grid">{modules.map((module) => <div className="admin-cell" key={module}><h3>{module}</h3><p>Phase gated</p></div>)}</div></main>;
}
