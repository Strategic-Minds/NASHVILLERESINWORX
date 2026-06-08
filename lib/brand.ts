const driveImage = (id: string) => `https://drive.google.com/uc?export=view&id=${id}`;

const approvedAssets = {
  logo: driveImage("1TIxz4t2mu_NFgZvYMLKJ0uZ6WY3N3lp9"),
  brandPackBoard: driveImage("1OKaxgtblK32U8Ffc16wPKlIDnlW_Eokl"),
  websiteMockup: driveImage("1a0-6OwJwwpnSWqbV8IMKL14HcL0NeTmo"),
  visualMockup: driveImage("16IyWvLI6x3YtvuziSr4_G7Vu7iysexg1"),
  premiumSceneA: driveImage("1p-LhIOmknrhpuuTtyuSJ9-zRy1W0_ApO"),
  premiumSceneB: driveImage("1ALwbWKnq3CUNYOMMG4Yvf4AabeosXE0z")
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
    heroBackground: `linear-gradient(90deg,rgba(3,6,7,.97),rgba(3,6,7,.76) 41%,rgba(3,6,7,.25) 68%,rgba(3,6,7,.92)),radial-gradient(circle at 42% 72%,rgba(33,214,255,.5),transparent 18%),radial-gradient(circle at 72% 42%,rgba(199,116,41,.35),transparent 16%),url("${approvedAssets.brandPackBoard}") center/cover`
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
    { title: "Metallic Epoxy", src: approvedAssets.brandPackBoard },
    { title: "Flake Floors", src: approvedAssets.premiumSceneA },
    { title: "Concrete Stain", src: approvedAssets.websiteMockup },
    { title: "Polished Concrete", src: approvedAssets.visualMockup },
    { title: "River Tables", src: approvedAssets.premiumSceneB },
    { title: "Countertops", src: approvedAssets.websiteMockup },
    { title: "Stone Surfaces", src: approvedAssets.premiumSceneA }
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
