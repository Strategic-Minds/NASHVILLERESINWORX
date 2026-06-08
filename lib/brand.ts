const generatedAssets = {
  logo: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-logo.webp?v=1780952450",
  flakeHero: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-epoxy-garage-hero.webp?v=1780952458",
  metallicMarble: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-marble-epoxy-floor.webp?v=1780952466",
  metallicBlue: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-blue-metallic-epoxy-garage-floor.webp?v=1780952473",
  flakeCloseup: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-epoxy-closeup.webp?v=1780952482",
  flakeColorChart: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-12-epoxy-flake-color-chart.webp?v=1780952839",
  concreteCountertop: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-concrete-countertop-outdoor-kitchen.webp?v=1780955836"
};

const approvedAssets = {
  logo: generatedAssets.logo,
  brandPackBoard: generatedAssets.flakeHero,
  websiteMockup: generatedAssets.metallicMarble,
  visualMockup: generatedAssets.metallicBlue,
  premiumSceneA: generatedAssets.flakeCloseup,
  premiumSceneB: generatedAssets.metallicMarble,
  countertop: generatedAssets.concreteCountertop,
  countertopOutdoorKitchen: generatedAssets.concreteCountertop
};

export const brand = {
  name: "Nashville Resin Worx",
  tagline: "Epoxy | Wood | Metal | Concrete | Stone",
  siteUrl: "https://nashvilleresinworx-strategic-minds-advisory.vercel.app",
  cta: "Get My Free Estimate",
  leadEmail: "info@epoxywillchangeyourlife.com",
  visualizerUrl: "https://torginol.com/design",
  assets: {
    ...approvedAssets,
    ...generatedAssets,
    heroBackground: `linear-gradient(90deg,rgba(3,6,7,.98),rgba(3,6,7,.76) 39%,rgba(3,6,7,.24) 66%,rgba(3,6,7,.88)),radial-gradient(circle at 42% 72%,rgba(33,214,255,.42),transparent 18%),url("${generatedAssets.flakeHero}") center/cover`
  },
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
    { title: "Metallic Epoxy", src: generatedAssets.metallicMarble },
    { title: "Flake Floors", src: generatedAssets.flakeHero },
    { title: "Concrete Stain", src: generatedAssets.flakeCloseup },
    { title: "Polished Concrete", src: generatedAssets.metallicBlue },
    { title: "River Tables", src: generatedAssets.metallicMarble },
    { title: "Countertops", src: generatedAssets.concreteCountertop },
    { title: "Stone Surfaces", src: generatedAssets.metallicBlue }
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
