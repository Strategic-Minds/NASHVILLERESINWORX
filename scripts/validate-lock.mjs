import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = ["app/page.tsx", "app/layout.tsx", "app/globals.css", "app/api/leads/route.ts", "app/admin/page.tsx", "app/robots.ts", "app/sitemap.ts", "public/manifest.webmanifest", "lib/brand.ts"];
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
console.log("NRW lock validation passed.");
