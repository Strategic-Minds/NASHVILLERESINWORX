import { brand } from "@/lib/brand";
import { GalleryModal } from "./GalleryModal";

export default function GalleryPage() {
  return (
    <main className="site-shell">
      <section className="section-black">
        <p className="eyebrow">Gallery</p>
        <h1>Surface Gallery</h1>
        <p className="hero-copy">Browse the approved surface categories. Project photos will expand here as the Drive folders are populated.</p>
      </section>
      <section className="section-black">
        <GalleryModal items={brand.gallery} />
      </section>
    </main>
  );
}
