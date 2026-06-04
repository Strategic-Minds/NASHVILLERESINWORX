import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        resin: {
          blue: "#16B7D9",
          deep: "#0A6F8E",
          glow: "#42D9FF",
          copper: "#C57B3A",
          steel: "#D8D8D8",
          black: "#050505"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial Narrow", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
