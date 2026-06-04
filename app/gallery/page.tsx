import { brand } from "@/lib/brand";

export default function GalleryPage() {
  return <main className="site-shell"><section className="section-black"><p className="eyebrow">Gallery</p><h1>Surface Gallery</h1><p className="hero-copy">Category-ready gallery slots. Replace temporary assets when approved Drive project photos are available.</p></section><section className="section-black"><div className="gallery-grid">{brand.gallery.map((item) => <div className="gallery-tile" key={item.title}><img src={item.src} alt={`${item.title} visual slot`} /><span className="gallery-label">{item.title}</span></div>)}</div></section></main>;
}
