import { brand } from "@/lib/brand";

const processSteps = [
  { title: "Sign Up & Schedule Job", image: "/images/countertop.svg", points: ["Free estimate", "Floor visualizer", "Digital contract"] },
  { title: "Prep Work", image: "/images/polished-concrete.svg", points: ["Grind and clean concrete", "Crack repair and patching", "Dust-free finish"] },
  { title: "Base Coat", image: "/images/concrete-stain.svg", points: ["Moisture tolerant", "Anti-crack membrane", "Flexible and durable"] },
  { title: "Beauty Coat", image: "/images/resin-surface-hero.svg", points: ["Flake, metallic, or stain", "Faux concrete stains", "Natural concrete look"] },
  { title: "Topcoat Finish", image: "/images/flake-floor.svg", points: ["Satin or high gloss", "Maximum durability", "Final clean walkthrough"] },
  { title: "Final Inspection", image: "/images/river-table.svg", points: ["Quality inspection", "Touch-up if needed", "100% satisfaction"] }
];

const colorChips = ["Domino", "Nightfall", "Gravel", "Tuxedo", "Shoreline", "Wombat", "Saddle Tan", "Cabin Fever", "Outback", "Biscuit", "Custom Blend", "Chestnut"];
const products = [
  { name: "Epoxy Floor Kit", price: "$249.99", image: "/images/concrete-stain.svg" },
  { name: "Metallic Epoxy Kit", price: "$299.99", image: "/images/resin-surface-hero.svg" },
  { name: "Flake Broadcast Kit", price: "$99.99", image: "/images/flake-floor.svg" },
  { name: "Polyaspartic Topcoat", price: "$129.99", image: "/images/polished-concrete.svg" }
];
const trustItems = ["Navy Seal Museum", "Johnson & Johnson", "Walgreens", "Public Storage"];
const iconBar = ["Premium Materials", "Expert Craftsmanship", "Built To Last", "Locally Owned", "Industry Certified", "Satisfaction Guaranteed", "20+ Years Experience"];

export default function HomePage() {
  return (
    <main className="mockup-shell">
      <TopBar />
      <Navigation />
      <section className="mock-hero" aria-label="Nashville Resin Worx estimate hero">
        <div className="hero-stage">
          <div className="hero-left">
            <p className="brand-services">Epoxy • Wood • Metal • Concrete • Stone</p>
            <h1>Premium Surfaces<span>Built For Life.</span></h1>
            <p className="hero-services">Garage Floors • Metallic Epoxy • Concrete Stain<br />Countertops • River Tables • Custom Surfaces</p>
            <div className="hero-badges" aria-label="Project proof">
              {["15+ Years Experience", "Industry Certified", "Locally Owned & Operated", "Premium Materials"].map((item) => <div key={item}><span aria-hidden="true">◇</span>{item}</div>)}
            </div>
            <div className="offer-card"><div><strong>Unlock <span>15% Off</span></strong><p>Scan the QR code or submit the form to qualify.</p></div><Qr /></div>
          </div>
          <EstimateForm />
        </div>
      </section>

      <section className="trust-band" aria-label="Trusted by and estimate benefits">
        <div className="trusted-by"><span>Trusted By</span>{trustItems.map((item) => <strong key={item}>{item}</strong>)}</div>
        <div className="trust-benefits">
          <p><strong>Digital proposals provided</strong><span>Send pics, measurements, and current floor details.</span></p>
          <p><strong>Rough estimates fast</strong><span>We provide rough estimates from your info.</span></p>
          <p><strong>Easy. Convenient. Accurate.</strong><span>Save time and get the info you need.</span></p>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="center-head"><h2>Our <span>6-Step</span> Process</h2><p>A seamless experience from start to finish.</p></div>
        <div className="step-row">
          {processSteps.map((step, index) => (
            <article className="step-card" key={step.title}><span className="step-number">{index + 1}</span><img src={step.image} alt={`${step.title} surface stage`} /><h3>{step.title}</h3><ul>{step.points.map((point) => <li key={point}>{point}</li>)}</ul></article>
          ))}
        </div>
        <a className="blue-button" href="/services">See The Full Process</a>
      </section>

      <section className="work-section" id="gallery">
        <div className="center-head dark"><h2>Our Work Speaks For Itself</h2></div>
        <div className="work-strip">
          {brand.gallery.slice(0, 5).map((item) => <a href="/gallery" key={item.title}><img src={item.src} alt={`${item.title} project example`} /><span>{item.title}</span></a>)}
        </div>
        <a className="blue-button" href="/gallery">View Full Gallery</a>
      </section>

      <section className="market-section">
        <div className="color-panel">
          <h2>Explore Color Charts</h2>
          <div className="tabs"><span>Flake</span><span>Metallic Epoxy</span><span>Concrete Stain</span><span>Polished Concrete</span></div>
          <div className="chip-grid">{colorChips.map((chip, index) => <div className={`flake-chip chip-${index % 6}`} key={chip}><span>{chip}</span></div>)}</div>
          <a className="blue-button" href="/color-charts">View Full Color Charts</a>
          <div className="visualizer-block"><strong>Floor Visualizer by Torginol</strong><p>See your space before you build it.</p><a className="blue-button outline" href="/visualizer">Try Floor Visualizer</a></div>
        </div>
        <div className="product-panel">
          <h2>Epoxy Products</h2>
          <div className="product-list">{products.map((product) => <article key={product.name}><img src={product.image} alt={`${product.name} product`} /><strong>{product.name}</strong><span>{product.price}</span></article>)}</div>
          <a className="blue-button" href="/products">Shop All Products</a>
        </div>
        <div className="proof-panel">
          <h2><span>15+</span> Years Of Experience</h2>
          <p>We have completed hundreds of residential, commercial, and industrial projects across the Ozarks and beyond.</p>
          <ul><li>Licensed & Insured</li><li>Industry Certified</li><li>Top Quality Materials</li><li>Satisfaction Guaranteed</li></ul>
          <div className="experience-seal">15+<small>Years Experience</small></div>
          <h3>Industry Certifications</h3>
          <div className="cert-row"><span>Polished Concrete University</span><span>RetroPlate</span><span>EpoxyU</span><span>SureCrete</span></div>
        </div>
      </section>

      <section className="icon-band" aria-label="Brand guarantees">{iconBar.map((item) => <div key={item}><span>◎</span>{item}</div>)}</section>

      <section className="portal-section" id="portal">
        <div className="portal-copy"><h2>The Nashville Resin Worx <span>Customer Portal</span></h2><p>Your project. In your pocket.</p><ul>{["Track project progress", "View proposals & contracts", "Upload photos & messages", "Secure payments", "Access warranty & care guides"].map((item) => <li key={item}>{item}</li>)}</ul><div className="store-buttons"><span>Download on the App Store</span><span>Get it on Google Play</span></div></div>
        <div className="phone-preview"><div className="phone-screen"><strong>Good afternoon, Jeremy!</strong>{["Timeline", "Messages", "Documents", "Payments", "Warranty"].map((item) => <p key={item}>{item}<span>›</span></p>)}</div></div>
        <div className="laptop-preview"><div className="timeline-box"><h3>Project Timeline</h3>{["Consultation", "Prep Work", "Base Coat", "Beauty Coat", "Topcoat Finish", "Final Inspection"].map((item, index) => <p key={item}><span>{index + 1}</span>{item}</p>)}</div><div className="appointment-box"><strong>Upcoming Appointment</strong><p>May 29, 2026 • 10:00 AM</p><div className="mini-gallery">{brand.gallery.slice(0, 3).map((item) => <img src={item.src} alt="" key={item.title} />)}</div></div></div>
        <a className="blue-button portal-cta" href="#estimate">{brand.cta}</a>
      </section>

      <Footer />
    </main>
  );
}

function TopBar() {
  return <div className="top-bar"><span>⌖ Nashville, Tennessee</span><a href="tel:16151234567">(615) 123-4567</a><a href={`mailto:${brand.leadEmail}`}>{brand.leadEmail}</a><span className="socials">● ● ● ●</span></div>;
}

function Navigation() {
  return (
    <header className="mock-nav">
      <a className="logo-lockup" href="/"><span className="logo-emblem">NRW</span><span>Nashville<strong>Resin Worx</strong><small>{brand.tagline}</small></span></a>
      <nav aria-label="Main navigation"><a href="/">Home</a><a href="/services">Services</a><a href="#process">Our Process</a><a href="/gallery">Gallery</a><a href="/products">Products</a><a href="/color-charts">Color Charts</a><a href="/about">About Us</a><a href="/contact">Contact</a></nav>
      <a className="nav-cta" href="#estimate">{brand.cta}</a>
    </header>
  );
}

function EstimateForm() {
  return (
    <form className="mock-estimate-form" id="estimate" action="/api/leads" method="post">
      <h2>Get Your Free Estimate</h2><p>Fast. Easy. No obligation.</p>
      <input name="fullName" placeholder="Full Name" required autoComplete="name" />
      <input name="phone" placeholder="Phone Number" required autoComplete="tel" />
      <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
      <select name="projectType" required defaultValue=""><option value="" disabled>Project Type</option>{brand.services.map((service) => <option key={service}>{service}</option>)}</select>
      <select name="squareFootage" defaultValue=""><option value="" disabled>Approx. Square Footage</option><option>Under 250 sq ft</option><option>250-500 sq ft</option><option>500-1,000 sq ft</option><option>1,000+ sq ft</option></select>
      <select name="surfaceCondition" defaultValue=""><option value="" disabled>Current Floor Condition</option><option>New concrete</option><option>Existing coating</option><option>Cracked or patched</option><option>Not sure</option></select>
      <label className="upload-box">Upload Photos Optional<span>Drag & Drop or Click to Upload JPG, PNG up to 25MB</span><input name="photos" type="file" accept="image/png,image/jpeg" multiple /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden-field" />
      <button className="blue-button" type="submit">{brand.cta}</button><small>♙ We respect your privacy.</small>
    </form>
  );
}

function Qr() {
  return <div className="qr" aria-label="QR code placeholder"><span /><span /><span /></div>;
}

function Footer() {
  return (
    <footer className="mock-footer">
      <div className="footer-brand"><a className="logo-lockup" href="/"><span className="logo-emblem">NRW</span><span>Nashville<strong>Resin Worx</strong><small>{brand.tagline}</small></span></a><p>Transforming concrete, wood, and metal into stunning durable surfaces built for life.</p></div>
      <div><h3>Services</h3>{brand.services.slice(0, 6).map((service) => <a href="/services" key={service}>{service}</a>)}</div>
      <div><h3>Quick Links</h3><a href="tel:16151234567">(615) 123-4567</a><a href={`mailto:${brand.leadEmail}`}>{brand.leadEmail}</a><a href="#estimate">{brand.cta}</a></div>
      <div><h3>The Nashville Resin Worx App</h3><div className="footer-icons"><span>Track Progress</span><span>Send Messages</span><span>Pay Securely</span><span>Care Guides</span></div></div>
      <div className="footer-qr"><h3>Download The App</h3><Qr /><small>Scan QR code to install</small></div>
    </footer>
  );
}
