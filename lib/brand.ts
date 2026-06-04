export const brand = {
  name: "Nashville Resin Worx",
  tagline: "Epoxy | Wood | Metal | Concrete | Stone",
  cta: "Get My Free Estimate",
  leadEmail: "info@epoxywillchangeyourlife.com",
  visualizerUrl: "https://torginol.com/design",
  colors: {
    metallicResinBlue: "#16B7D9",
    deepMetallicBlue: "#0A6F8E",
    glowBlue: "#42D9FF",
    copper: "#C57B3A",
    steelSilver: "#D8D8D8",
    white: "#FFFFFF",
    black: "#050505"
  },
  services: [
    "Metallic Epoxy",
    "Flake Systems",
    "Concrete Staining",
    "Polished Concrete",
    "Countertops",
    "River Tables",
    "Decorative Concrete",
    "Stone Surfaces"
  ],
  gallery: [
    { title: "Metallic Epoxy", src: "/images/resin-surface-hero.svg" },
    { title: "Flake Floors", src: "/images/flake-floor.svg" },
    { title: "River Tables", src: "/images/river-table.svg" },
    { title: "Countertops", src: "/images/countertop.svg" },
    { title: "Polished Concrete", src: "/images/polished-concrete.svg" },
    { title: "Concrete Stain", src: "/images/concrete-stain.svg" }
  ],
  routes: ["/", "/services", "/gallery", "/products", "/color-charts", "/about", "/contact", "/customer-portal", "/visualizer", "/admin"]
};

export type LeadScore = "hot" | "warm" | "cold";

export function scoreLead(timeline: string, hasPhotos: boolean, hasBudget: boolean): LeadScore {
  const normalized = timeline.toLowerCase();
  if ((normalized.includes("30") || normalized.includes("asap")) && hasPhotos && hasBudget) return "hot";
  if (normalized.includes("90") || hasPhotos || hasBudget) return "warm";
  return "cold";
}
