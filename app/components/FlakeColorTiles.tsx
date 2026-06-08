"use client";

import { useEffect } from "react";

type ColorTile = {
  name: string;
  code?: string;
  image: string;
};

type ColorCollection = {
  label: string;
  selectedText: string;
  colors: ColorTile[];
};

const colorCollections: Record<string, ColorCollection> = {
  flake: {
    label: "Flake",
    selectedText: "epoxy flake color",
    colors: [
      { name: "Gravel", code: "FB-414", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-gravel.webp?v=1780953437" },
      { name: "Outback", code: "FB-517", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-outback.webp?v=1780953443" },
      { name: "Quicksilver", code: "FB-424", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-quicksilver.webp?v=1780953450" },
      { name: "Safari", code: "FB-504", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-safari.webp?v=1780953457" },
      { name: "Wombat", code: "FB-616", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-wombat.webp?v=1780953472" },
      { name: "Stonehenge", code: "FB-427", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-stonehenge.webp?v=1780953479" },
      { name: "Rapids", code: "FB-506", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-rapids.webp?v=1780953486" },
      { name: "Creekbed", code: "FB-716", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-creekbed.webp?v=1780953494" },
      { name: "Domino", code: "FB-411", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-domino.webp?v=1780953515" },
      { name: "Shoreline", code: "FB-421", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-shoreline.webp?v=1780953508" },
      { name: "Orbit", code: "FB-310", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-orbit.webp?v=1780953521" },
      { name: "Snowfall", code: "FB-602", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-color-snowfall.webp?v=1780953530" }
    ]
  },
  metallic: {
    label: "Metallic Epoxy",
    selectedText: "metallic epoxy color",
    colors: [
      { name: "Arizona Gold", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-arizona-gold.webp?v=1780954176" },
      { name: "Autumn Blaze", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-autumn-blaze.webp?v=1780954188" },
      { name: "Cappuccino", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-cappuccino.webp?v=1780954203" },
      { name: "Caribbean Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-caribbean-blue.webp?v=1780954214" },
      { name: "Chestnut", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-chestnut.webp?v=1780954227" },
      { name: "Copper", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-copper.webp?v=1780954242" },
      { name: "Galaxy Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-galaxy-blue.webp?v=1780954284" },
      { name: "Merlot", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-merlot.webp?v=1780954296" },
      { name: "Purple Haze", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-purple-haze.webp?v=1780954311" },
      { name: "Quick Silver", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-quick-silver.webp?v=1780954325" },
      { name: "Sterling", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-sterling.webp?v=1780954337" },
      { name: "Tuscan Sun", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-tuscan-sun.webp?v=1780954353" },
      { name: "Blurple", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-blurple.webp?v=1780954392" },
      { name: "Burlywood", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-burlywood.webp?v=1780954406" },
      { name: "Celestial Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-celestial-blue.webp?v=1780954422" },
      { name: "Cerulean Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-cerulean-blue.webp?v=1780954435" },
      { name: "Cinnabar", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-cinnabar.webp?v=1780954447" },
      { name: "Mango Tango", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-mango-tango.webp?v=1780954462" },
      { name: "Mayan Gold", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-mayan-gold.webp?v=1780954516" },
      { name: "Onyx", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-onyx.webp?v=1780954501" },
      { name: "Perfect Storm", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-perfect-storm.webp?v=1780954528" },
      { name: "Sequoia", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-color-sequoia.webp?v=1780954546" }
    ]
  },
  stain: {
    label: "Concrete Stain",
    selectedText: "stained concrete dye color",
    colors: [
      { name: "Gold", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-gold.webp?v=1780954576" },
      { name: "Raw Sienna", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-raw-sienna.webp?v=1780954605" },
      { name: "Caramel", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-caramel.webp?v=1780954590" },
      { name: "Sand", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-sand.webp?v=1780954632" },
      { name: "Terra Cotta", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-terra-cotta.webp?v=1780954619" },
      { name: "Mahogany", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-mahogany.webp?v=1780954647" },
      { name: "Saddle Brown", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-saddle-brown.webp?v=1780954688" },
      { name: "Chocolate Brown", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-chocolate-brown.webp?v=1780954700" },
      { name: "Walnut", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-walnut.webp?v=1780954715" },
      { name: "Burnt Sienna", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-burnt-sienna.webp?v=1780954728" },
      { name: "Chestnut", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-chestnut.webp?v=1780954743" },
      { name: "Red", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-red.webp?v=1780954757" },
      { name: "Maroon", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-maroon.webp?v=1780954810" },
      { name: "Sepia", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-sepia.webp?v=1780954798" },
      { name: "Eggplant", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-eggplant.webp?v=1780954824" },
      { name: "Turquoise", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-turquoise.webp?v=1780954851" },
      { name: "Slate Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-slate-blue.webp?v=1780954838" },
      { name: "Patriot Blue", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-patriot-blue.webp?v=1780954872" },
      { name: "Green", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-green.webp?v=1780954918" },
      { name: "Pine Green", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-pine-green.webp?v=1780954906" },
      { name: "Forest Green", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-forest-green.webp?v=1780954932" },
      { name: "Gray", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-gray.webp?v=1780954945" },
      { name: "Black", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-black.webp?v=1780954958" },
      { name: "Midnight Black", image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-stained-concrete-color-midnight-black.webp?v=1780954977" }
    ]
  }
};

type CollectionKey = "flake" | "metallic" | "stain";

export function FlakeColorTiles() {
  useEffect(() => {
    const chipGrid = document.querySelector<HTMLElement>(".chip-grid");
    const tabs = document.querySelector<HTMLElement>(".color-panel .tabs");
    if (!chipGrid || !tabs) return;

    const visualizerText = document.querySelector<HTMLElement>(".visualizer-block p");
    let activeCollection: CollectionKey = "flake";

    const selectColor = (tile: HTMLElement, color: ColorTile, collectionKey: CollectionKey) => {
      chipGrid.querySelectorAll<HTMLElement>(".flake-image-tile").forEach((item) => item.setAttribute("aria-pressed", "false"));
      tile.setAttribute("aria-pressed", "true");
      const detail = color.code ? `${color.name} ${color.code}` : color.name;
      if (visualizerText) {
        visualizerText.textContent = `${detail} selected for ${colorCollections[collectionKey].selectedText}. Bring this color into the visualizer or estimate request.`;
      }
    };

    const renderTiles = (collectionKey: CollectionKey) => {
      activeCollection = collectionKey;
      const collection = colorCollections[collectionKey];
      chipGrid.dataset.collection = collectionKey;
      chipGrid.innerHTML = "";

      collection.colors.forEach((color, index) => {
        const tile = document.createElement("button");
        const detail = color.code ? `${color.name} ${color.code}` : color.name;
        tile.type = "button";
        tile.className = `flake-chip flake-image-tile color-chart-tile color-chart-tile--${collectionKey}`;
        tile.setAttribute("aria-label", `Select ${detail} ${collection.selectedText}`);
        tile.setAttribute("aria-pressed", index === 0 ? "true" : "false");
        tile.innerHTML = `<img src="${color.image}" alt="${detail} ${collection.selectedText} sample" loading="lazy" />`;
        tile.addEventListener("click", () => selectColor(tile, color, collectionKey));
        chipGrid.appendChild(tile);
      });
    };

    const renderTabs = () => {
      tabs.setAttribute("role", "tablist");
      tabs.innerHTML = "";
      (Object.keys(colorCollections) as CollectionKey[]).forEach((collectionKey) => {
        const collection = colorCollections[collectionKey];
        const tab = document.createElement("button");
        tab.type = "button";
        tab.className = "color-chart-tab";
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", collectionKey === activeCollection ? "true" : "false");
        tab.textContent = collection.label;
        tab.addEventListener("click", () => {
          activeCollection = collectionKey;
          tabs.querySelectorAll<HTMLElement>(".color-chart-tab").forEach((item) => item.setAttribute("aria-selected", "false"));
          tab.setAttribute("aria-selected", "true");
          renderTiles(collectionKey);
        });
        tabs.appendChild(tab);
      });
    };

    renderTabs();
    renderTiles(activeCollection);
  }, []);

  return null;
}
