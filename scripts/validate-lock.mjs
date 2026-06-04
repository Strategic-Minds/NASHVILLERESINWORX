import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "app/api/leads/route.ts",
  "app/api/telemetry/route.ts",
  "app/components/TelemetryBeacon.tsx",
  "app/admin/page.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/thank-you/page.tsx",
  "app/estimate-error/page.tsx",
  "public/manifest.webmanifest",
  "public/images/drive-assets.json",
  "lib/brand.ts",
  "lib/leads.ts",
  "lib/supabase.ts",
  "lib/telemetry.ts",
  "supabase/sql/001_nrw_leads_approval_gated.sql"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Missing required lock files:", missing.join(", "));
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8").toLowerCase();
const forbidden = ["lime", "rustic", "#84cc16", "#65a30d"];
const violations = forbidden.filter((term) => css.includes(term));
if (violations.length) {
  console.error("Forbidden visual terms detected:", violations.join(", "));
  process.exit(1);
}

const brand = fs.readFileSync(path.join(root, "lib/brand.ts"), "utf8");
for (const token of ["#16B7D9", "#0A6F8E", "#42D9FF", "#C57B3A", "#D8D8D8", "#050505"]) {
  if (!brand.includes(token)) {
    console.error(`Missing brand color ${token}`);
    process.exit(1);
  }
}

const admin = fs.readFileSync(path.join(root, "app/admin/page.tsx"), "utf8");
if (!admin.includes("ADMIN_PREVIEW_UNLOCK") || !admin.includes("notFound")) {
  console.error("Admin route must be gated by default.");
  process.exit(1);
}

const leads = fs.readFileSync(path.join(root, "app/api/leads/route.ts"), "utf8");
if (leads.includes("console.info") || leads.includes("console.log") || !leads.includes("isRateLimited") || !leads.includes("website") || !leads.includes("persistLeadIfEnabled")) {
  console.error("Lead intake route must avoid lead logging and include spam/rate safeguards.");
  process.exit(1);
}

const leadModule = fs.readFileSync(path.join(root, "lib/leads.ts"), "utf8");
const supabaseModule = fs.readFileSync(path.join(root, "lib/supabase.ts"), "utf8");
if (!leadModule.includes("insertSupabaseRow") || !leadModule.includes("nrw_leads") || supabaseModule.includes("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE")) {
  console.error("Lead persistence must use the approved Supabase insert helper without exposing service-role keys.");
  process.exit(1);
}

const telemetryRoute = fs.readFileSync(path.join(root, "app/api/telemetry/route.ts"), "utf8");
const telemetryModule = fs.readFileSync(path.join(root, "lib/telemetry.ts"), "utf8");
const telemetryBeacon = fs.readFileSync(path.join(root, "app/components/TelemetryBeacon.tsx"), "utf8");
if (!telemetryRoute.includes("persistTelemetryIfEnabled") || !telemetryModule.includes("nrw_telemetry_events") || !telemetryBeacon.includes("/api/telemetry") || telemetryBeacon.includes("console.log")) {
  console.error("Telemetry must be wired through the approved API route without client logging.");
  process.exit(1);
}

const driveAssets = fs.readFileSync(path.join(root, "public/images/drive-assets.json"), "utf8");
for (const token of ["16IyWvLI6x3YtvuziSr4_G7Vu7iysexg1", "ChatGPT Image Jun 3, 2026", "galleryPortfolio", "productImages", "processImages"]) {
  if (!driveAssets.includes(token)) {
    console.error(`Drive asset manifest missing approved inventory token: ${token}`);
    process.exit(1);
  }
}

if (supabaseModule.includes("service_role")) {
  console.error("Supabase helper must not hard-code or expose service-role credentials.");
  process.exit(1);
}

const sql = fs.readFileSync(path.join(root, "supabase/sql/001_nrw_leads_approval_gated.sql"), "utf8").toLowerCase();
for (const token of ["enable row level security", "public.nrw_leads", "public.nrw_telemetry_events", "public.nrw_user_roles", "website can submit leads", "website can submit telemetry"]) {
  if (!sql.includes(token)) {
    console.error(`Supabase SQL missing required safety token: ${token}`);
    process.exit(1);
  }
}

console.log("NRW lock validation passed.");
