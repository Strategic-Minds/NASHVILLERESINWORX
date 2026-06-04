import { brand } from "@/lib/brand";

export default function ServicesPage() {
  return <main className="site-shell"><section className="section-black"><p className="eyebrow">Services</p><h1>Premium Surface Systems</h1><p className="hero-copy">Locked service categories for estimate-focused decorative surface work.</p></section><section className="section-white"><div className="service-grid">{brand.services.map((service) => <div className="service-item" key={service}><h3>{service}</h3><p className="text-measure">Estimate-ready service path for Nashville Resin Worx.</p></div>)}</div></section></main>;
}
