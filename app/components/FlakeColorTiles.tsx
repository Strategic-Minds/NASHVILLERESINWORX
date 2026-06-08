"use client";

import { useEffect } from "react";

const flakeColors = [
  {
    name: "Gravel",
    code: "FB-414",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-gravel.webp?v=1780953437"
  },
  {
    name: "Outback",
    code: "FB-517",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-outback.webp?v=1780953443"
  },
  {
    name: "Quicksilver",
    code: "FB-424",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-quicksilver.webp?v=1780953450"
  },
  {
    name: "Safari",
    code: "FB-504",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-safari.webp?v=1780953457"
  },
  {
    name: "Wombat",
    code: "FB-616",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-wombat.webp?v=1780953472"
  },
  {
    name: "Stonehenge",
    code: "FB-427",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-stonehenge.webp?v=1780953479"
  },
  {
    name: "Rapids",
    code: "FB-506",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-rapids.webp?v=1780953486"
  },
  {
    name: "Creekbed",
    code: "FB-716",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-creekbed.webp?v=1780953494"
  },
  {
    name: "Domino",
    code: "FB-411",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-domino.webp?v=1780953515"
  },
  {
    name: "Shoreline",
    code: "FB-421",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-shoreline.webp?v=1780953508"
  },
  {
    name: "Orbit",
    code: "FB-310",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-orbit.webp?v=1780953521"
  },
  {
    name: "Snowfall",
    code: "FB-602",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-snowfall.webp?v=1780953530"
  }
];

export function FlakeColorTiles() {
  useEffect(() => {
    const tiles = Array.from(document.querySelectorAll<HTMLElement>(".chip-grid .flake-chip"));
    if (!tiles.length) return;

    const visualizerText = document.querySelector<HTMLElement>(".visualizer-block p");

    const selectColor = (tile: HTMLElement, color: (typeof flakeColors)[number]) => {
      tiles.forEach((item) => item.setAttribute("aria-pressed", "false"));
      tile.setAttribute("aria-pressed", "true");
      if (visualizerText) {
        visualizerText.textContent = `${color.name} ${color.code} selected. Bring this color into the visualizer or estimate request.`;
      }
    };

    tiles.forEach((tile, index) => {
      const color = flakeColors[index];
      if (!color) return;

      tile.className = "flake-chip flake-image-tile";
      tile.setAttribute("role", "button");
      tile.setAttribute("tabIndex", "0");
      tile.setAttribute("aria-label", `Select ${color.name} ${color.code} epoxy flake color`);
      tile.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      tile.innerHTML = `<img src="${color.image}" alt="${color.name} ${color.code} epoxy flake color sample" loading="lazy" />`;
      tile.onclick = () => selectColor(tile, color);
      tile.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectColor(tile, color);
        }
      };
    });
  }, []);

  return null;
}
