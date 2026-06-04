import { brand } from "@/lib/brand";

const process = ["Project intake and photos", "Surface review and design direction", "Estimate and approval", "Prep, repair, and base system", "Finish build and protection", "Final photos, care, and review"];
const products = ["Deep Pour Epoxy", "Table Epoxy", "Metallic Pigments", "Polyaspartic", "Primer", "Topcoat", "Accessories"];

export default function HomePage() {
  return (
    <main className="site-shell">
      <Navigation />
      <section className="hero" aria-label="Nashville Resin Worx lead generation hero">
        <div className="hero-content">
          <p className="eyebrow">Premium custom decorative surfaces</p>
          <h1>Nashville Resin Worx</h1>
          <p className="hero-copy">Metallic epoxy, flake floors, polished concrete, countertops, river tables, and stone-forward surfaces built for homes, shops, showrooms, and statement spaces.</p>
          <div className="hero-actions"><a className="estimate-button" href="#estimate">{brand.cta}</a><a className="secondary-button" href="#gallery">View Work</a></div>
        </div>
      </section>
      <div className="trust-strip" aria-label="Trust markers"><div><strong>8</strong> Surface categories</div><div><strong>6</strong> Step project path</div><div><strong>90+</strong> QA target scores</div><div><strong>PWA</strong> Mobile-first installable site</div></div>
      <section className="section-white" id="process"><div className="section-head"><h2>From intake to finish.</h2><p>Every section exists to move a visitor toward a qualified estimate while showing the craft, trust, and project path behind the surface.</p></div><div className="process-grid">{process.map((step, index) => <div className="process-step" key={step}><p className="number">0{index + 1}</p><h3>{step}</h3></div>)}</div></section>
      <section className="section-black" id="gallery"><div className="section-head"><h2>Gallery-ready surface categories.</h2><p>These visual slots are wired to the approved category map. Current SVGs are temporary material-style assets until the Drive image folders receive approved project photos.</p></div><div className="gallery-grid">{brand.gallery.map((item) => <a className="gallery-tile" href="/gallery" key={item.title}><img src={item.src} alt={`${item.title} surface example`} /><span className="gallery-label">{item.title}</span></a>)}</div></section>
      <section className="section-white" id="services"><div className="section-head"><h2>Decorative surfaces with a premium finish.</h2><p>Locked service language keeps the brand out of generic contractor territory and points every surface category toward estimate qualification.</p></div><div className="service-grid">{brand.services.map((service) => <div className="service-item" key={service}><h3>{service}</h3><p className="text-measure">Design-led surface systems for residential, commercial, and industrial environments.</p></div>)}</div></section>
      <section className="section-black" id="products"><div className="section-head"><h2>Products and finish systems.</h2><p>Product interest is captured without making unverified pricing, warranty, availability, or inventory claims.</p></div><div className="product-grid">{products.map((product) => <div className="product-item" key={product}><h3>{product}</h3></div>)}</div></section>
      <section className="section-white" id="estimate"><div className="lead-panel"><div><p className="eyebrow">Qualified estimate intake</p><h2>Tell us what you want built.</h2><p className="text-measure">This form is locked to the required lead fields and sends submissions to the backend route for validation, lead scoring, and notification wiring.</p></div><EstimateForm /></div></section>
      <section className="section-black" id="portal"><div className="portal-preview"><div><p className="eyebrow">Customer portal preview</p><h2>Preview only until auth is approved.</h2><p className="text-measure">The portal remains a controlled preview until Supabase Auth, roles, storage, and RLS tests are verified.</p></div><div className="portal-list">{["Projects", "Messages", "Photos", "Invoices", "Warranty", "Care Instructions"].map((item) => <div key={item}><span>{item}</span><span>Phase gated</span></div>)}</div></div></section>
      <footer className="section-white footer"><div><strong>{brand.name}</strong><p>{brand.tagline}</p></div><a className="estimate-button" href="#estimate">{brand.cta}</a></footer>
    </main>
  );
}

function Navigation() {
  return <header className="nav"><a className="brand-mark" href="/"><span className="gear-mark">NRW</span><span>Nashville Resin Worx</span></a><nav className="nav-links" aria-label="Main navigation"><a href="#process">Process</a><a href="#gallery">Gallery</a><a href="#services">Services</a><a href="#products">Products</a><a href="#estimate">Estimate</a></nav></header>;
}

function EstimateForm() {
  return (
    <form className="estimate-form" action="/api/leads" method="post">
      <div className="form-grid"><label>First Name<input name="firstName" required autoComplete="given-name" /></label><label>Last Name<input name="lastName" required autoComplete="family-name" /></label></div>
      <div className="form-grid"><label>Phone<input name="phone" required autoComplete="tel" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label></div>
      <label>Project Type<select name="projectType" required defaultValue=""><option value="" disabled>Select a surface</option>{brand.services.map((service) => <option key={service}>{service}</option>)}</select></label>
      <div className="form-grid"><label>Square Footage<input name="squareFootage" inputMode="numeric" /></label><label>Target Timeline<input name="timeline" placeholder="ASAP, 30 days, 90 days..." /></label></div>
      <label>Project Address<input name="projectAddress" autoComplete="street-address" /></label><label>Current Surface Condition<input name="surfaceCondition" /></label><label>Desired Finish<input name="desiredFinish" /></label><label>Budget Range<input name="budgetRange" /></label><label>Project Notes<textarea name="notes" /></label>
      <button className="estimate-button" type="submit">{brand.cta}</button>
    </form>
  );
}
