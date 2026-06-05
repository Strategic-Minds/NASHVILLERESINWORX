"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type GalleryItem = {
  title: string;
  src: string;
};

export function GalleryModal({ items }: { items: GalleryItem[] }) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const tileStyle: CSSProperties = {
    display: "grid",
    gap: 10,
    padding: 0,
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 5,
    background: "#090d0f",
    color: "#ffffff",
    cursor: "pointer",
    overflow: "hidden",
    textAlign: "center"
  };

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button className="gallery-tile" type="button" key={item.title} onClick={() => setActiveItem(item)} style={tileStyle}>
            <img src={item.src} alt={`${item.title} visual slot`} style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <span className="gallery-label" style={{ padding: "0 12px 16px" }}>{item.title}</span>
          </button>
        ))}
      </div>
      {activeItem ? (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeItem.title} gallery preview`} style={{ position: "fixed", inset: 0, zIndex: 80, display: "grid", placeItems: "center", padding: 20 }}>
          <button className="gallery-modal-backdrop" type="button" aria-label="Close gallery preview" onClick={() => setActiveItem(null)} style={{ position: "absolute", inset: 0, border: 0, background: "rgba(0,0,0,.78)", cursor: "pointer" }} />
          <div className="gallery-modal-panel" style={{ position: "relative", width: "min(920px,100%)", maxHeight: "92vh", overflow: "auto", padding: 18, border: "1px solid rgba(33,214,255,.45)", borderRadius: 6, background: "#050505", color: "#ffffff", boxShadow: "0 30px 80px rgba(0,0,0,.6)" }}>
            <button className="gallery-modal-close" type="button" onClick={() => setActiveItem(null)} style={{ position: "absolute", top: 14, right: 14, minHeight: 38, padding: "0 14px", border: "1px solid rgba(255,255,255,.24)", borderRadius: 4, background: "#ffffff", color: "#101214", fontWeight: 900, cursor: "pointer" }}>Close</button>
            <img src={activeItem.src} alt={`${activeItem.title} expanded preview`} style={{ width: "100%", maxHeight: "68vh", objectFit: "contain", borderRadius: 4, background: "#111" }} />
            <h2>{activeItem.title}</h2>
            <p>Approved category slot. Replace with canonical project photography when the Drive asset folder is populated.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
