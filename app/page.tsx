import { brand } from "@/lib/brand";
import type { CSSProperties } from "react";

const approvedSurfaceImage = brand.assets.brandPackBoard;

const processSteps = [
  { title: "Sign Up & Schedule Job", image: approvedSurfaceImage, points: ["Free estimate", "Floor visualizer", "Digital contract"] },
  { title: "Prep Work", image: brand.assets.premiumSceneA, points: ["Grind and clean concrete", "Crack repair and patching", "Dust-free finish"] },
  { title: "Base Coat", image: approvedSurfaceImage, points: ["Moisture tolerant", "Anti-crack membrane", "Flexible and durable"] },
  { title: "Beauty Coat", image: brand.assets.visualMockup, points: ["Flake, metallic, or stain", "Faux concrete stains", "Natural concrete look"] },
  { title: "Topcoat Finish", image: brand.assets.websiteMockup, points: ["Satin or high gloss", "Maximum durability", "Final clean walkthrough"] },
  { title: "Final Inspection", image: brand.assets.premiumSceneB, points: ["Quality inspection", "Touch-up if needed", "100% satisfaction"] }
];

const appSteps = [
  { title: "Pick Your Surface", detail: "Choose epoxy, concrete, countertops, river tables, or custom surfaces.", href: "#estimate" },
  { title: "Send Photos", detail: "Upload photos and rough measurements so we can understand the space.", href: "#estimate" },
  { title: "Get A Proposal", detail: "Receive a rough estimate, finish direction, and next scheduling step.", href: "#process" },
  { title: "Track The Job", detail: "Use the portal flow for timeline, documents, messages, payments, and care guides.", href: "#portal" }
];

const terrainStories = [
  {
    title: "River Tables",
    kicker: "Deep-pour craft",
    image: brand.assets.premiumSceneB,
    detail: "Wood grain, clear depth, metallic blue movement, and countertop-level finish direction for custom statement pieces."
  },
  {
    title: "Mountain Homes",
    kicker: "Cabin to patio",
    image: brand.assets.visualMockup,
    detail: "Surfaces for lodge, basement, porch, and weekend-home spaces that should feel premium, rugged, and clean."
  },
  {
    title: "All-Terrain Shops",
    kicker: "Garage ready",
    image: brand.assets.premiumSceneA,
    detail: "Garage, truck, ATV, tool, and workbench zones with a phone-first estimate path and finish-first planning."
  }
];

const colorChips = ["Domino", "Nightfall", "Gravel", "Tuxedo", "Shoreline", "Wombat", "Saddle Tan", "Cabin Fever", "Outback", "Biscuit", "Custom Blend", "Chestnut"];
const products = [
  { name: "Deep Pour Epoxy", detail: "River table and slab-friendly direction", image: brand.assets.premiumSceneB },
  { name: "Table Epoxy", detail: "Custom surface consultation", image: brand.assets.websiteMockup },
  { name: "Metallic Pigments", detail: "Blue, copper, silver, and custom motion", image: brand.assets.visualMockup },
  { name: "Polyaspartic Topcoats", detail: "Durable finish options", image: approvedSurfaceImage }
];
const trustItems = ["Navy Seal Museum", "Johnson & Johnson", "Walgreens", "Public Storage"];
const iconBar = ["Premium Materials", "Expert Craftsmanship", "Built To Last", "Locally Owned", "Industry Certified", "Satisfaction Guaranteed", "20+ Years Experience"];
const phoneDisplay = "(772) 209-0266";
const phoneHref = "tel:17722090266";
const estimateUrl = `${brand.siteUrl}/#estimate`;
const footerStyle: CSSProperties = { background: "#ffffff", color: "#101214", borderTop: "1px solid #d8d8d8" };
const footerTextStyle: CSSProperties = { color: "#42494c" };
const footerLinkStyle: CSSProperties = { color: "#101214" };

export default function HomePage() {
  return (
    <main className="mockup-shell">
      <TopBar />
      <Navigation />
      <MobileActionRail />
      <section className="mock-hero" style={{ backgroundImage: brand.assets.heroBackground }} aria-label="Nashville Resin Worx estimate hero">
        <div className="hero-stage">
          <div className="hero-left">
            <p className="brand-services">Epoxy • Wood • Metal • Concrete • Stone</p>
            <h1>Premium Surfaces<span>Built For Life.</span></h1>
            <p className="hero-services">Garage Floors • Metallic Epoxy • Concrete Stain<br />Countertops • River Tables • Custom Surfaces</p>
            <div className="mobile-app-status" aria-label="Mobile app workflow status">
              <span>Mobile Estimate Flow</span>
              <strong>4 guided steps</strong>
            </div>
            <div className="hero-badges" aria-label="Project proof">
              {["15+ Years Experience", "Industry Certified", "Locally Owned & Operated", "Premium Materials"].map((item) => <div key={item}><span aria-hidden="true">◇</span>{item}</div>)}
            </div>
            <div className="offer-card"><div><strong>Unlock <span>15% Off</span></strong><p>Open the estimate form to qualify.</p></div><QrLink href={estimateUrl} label="Estimate form" /></div>
          </div>
          <EstimateForm />
        </div>
      </section>

      <MobileStepSection />

      <section className="trust-band" aria-label="Trusted by and estimate benefits">
        <div className="trusted-by"><span>Trusted By</span>{trustItems.map((item) => <strong key={item}>{item}</strong>)}</div>
        <div className="trust-benefits">
          <p><strong>Digital proposals provided</strong><span>Send pics, measurements, and current floor details.</span></p>
          <p><strong>Rough estimates fast</strong><span>We provide rough estimates from your info.</span></p>
          <p><strong>Easy. Convenient. Accurate.</strong><span>Save time and get the info you need.</span></p>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="center-head"><span className="section-kicker">Step by step installation</span><h2>Our <span>6-Step</span> Process</h2><p>A seamless experience from first photos to final walkthrough.</p></div>
        <div className="step-row">
          {processSteps.map((step, index) => (
            <article className="step-card" key={step.title}><span className="step-number">{index + 1}</span><img src={step.image} alt={`${step.title} surface stage`} /><h3>{step.title}</h3><ul>{step.points.map((point) => <li key={point}>{point}</li>)}</ul></article>
          ))}
        </div>
        <a className="blue-button" href="/services">See The Full Process</a>
      </section>

      <section className="work-section" id="gallery">
        <div className="center-head dark"><span className="section-kicker cyan">Project proof</span><h2>Our Work Speaks For Itself</h2></div>
        <div className="work-strip">
          {brand.gallery.map((item) => <a href="/gallery" key={item.title}><img src={item.src} alt={`${item.title} project example`} /><span>{item.title}</span></a>)}
        </div>
        <a className="blue-button" href="/gallery">View Full Gallery</a>
      </section>

      <TerrainStorySection />

      <section className="market-section">
        <div className="color-panel">
          <h2>Explore Color Charts</h2>
          <div className="tabs"><span>Flake</span><span>Metallic Epoxy</span><span>Concrete Stain</span><span>Polished Concrete</span></div>
          <div className="chip-grid">{colorChips.map((chip, index) => <div className={`flake-chip chip-${index % 6}`} key={chip}><span>{chip}</span></div>)}</div>
          <a className="blue-button" href="/color-charts">View Full Color Charts</a>
          <div className="visualizer-block"><strong>Floor Visualizer by Torginol</strong><p>See your space before you build it.</p><a className="blue-button outline" href="/visualizer">Try Floor Visualizer</a></div>
        </div>
        <div className="product-panel">
          <h2>River Tables & Epoxy Products</h2>
          <div className="product-list">{products.map((product) => <article key={product.name}><img src={product.image} alt={`${product.name} product`} /><strong>{product.name}</strong><span>{product.detail}</span></article>)}</div>
          <a className="blue-button" href="/products">Shop All Products</a>
        </div>
        <div className="proof-panel">
          <h2><span>15+</span> Years Of Experience</h2>
          <p>We have completed hundreds of residential, commercial, and industrial projects across Nashville and beyond.</p>
          <ul><li>Licensed & Insured</li><li>Industry Certified</li><li>Top Quality Materials</li><li>Satisfaction Guaranteed</li></ul>
          <div className="experience-seal">15+<small>Years Experience</small></div>
          <h3>Industry Certifications</h3>
          <div className="cert-row"><span>Polished Concrete University</span><span>RetroPlate</span><span>EpoxyU</span><span>SureCrete</span></div>
        </div>
      </section>

      <section className="icon-band" aria-label="Brand guarantees">{iconBar.map((item) => <div key={item}><span>◎</span>{item}</div>)}</section>

      <section className="portal-section" id="portal">
        <div className="portal-copy"><span className="section-kicker cyan">PWA mobile app style</span><h2>The Nashville Resin Worx <span>Customer Portal</span></h2><p>Your project. In your pocket.</p><ul>{["Track project progress", "View proposals & contracts", "Upload photos & messages", "Secure payments", "Access warranty & care guides"].map((item) => <li key={item}>{item}</li>)}</ul><div className="store-buttons"><span>Download on the App Store</span><span>Get it on Google Play</span></div></div>
        <div className="phone-preview"><div className="phone-screen"><strong>Good afternoon, Jeremy!</strong>{["Timeline", "Messages", "Documents", "Payments", "Warranty"].map((item, index) => <p key={item}><em>{index + 1}</em>{item}<span>›</span></p>)}</div></div>
        <div className="laptop-preview"><div className="timeline-box"><h3>Project Timeline</h3>{["Consultation", "Prep Work", "Base Coat", "Beauty Coat", "Topcoat Finish", "Final Inspection"].map((item, index) => <p key={item}><span>{index + 1}</span>{item}</p>)}</div><div className="appointment-box"><strong>Upcoming Appointment</strong><p>May 29, 2026 • 10:00 AM</p><div className="mini-gallery">{brand.gallery.slice(0, 3).map((item) => <img src={item.src} alt="" key={item.title} />)}</div></div></div>
        <a className="blue-button portal-cta" href="#estimate">{brand.cta}</a>
      </section>

      <Footer />
    </main>
  );
}

function MobileStepSection() {
  return (
    <section className="mobile-step-section" aria-label="Mobile estimate steps">
      <div className="mobile-step-head">
        <span className="section-kicker">Start here</span>
        <h2>Four taps to get moving</h2>
        <p>A phone-first path for estimates, photos, proposals, and project tracking.</p>
      </div>
      <div className="app-step-list">
        {appSteps.map((step, index) => (
          <a href={step.href} className="app-step" key={step.title}>
            <span>{index + 1}</span>
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function TerrainStorySection() {
  return (
    <section className="terrain-section" aria-label="River table and terrain surface visual direction">
      <div className="terrain-head">
        <span className="section-kicker cyan">Ultra lifelike visual direction</span>
        <h2>River Tables, Mountain Homes, All-Terrain Shops</h2>
        <p>Premium resin visuals for custom tables, hard-working garages, cabin-style spaces, and the kind of shop floors that need to look sharp after real use.</p>
      </div>
      <div className="terrain-grid">
        {terrainStories.map((story) => (
          <article className="terrain-card" key={story.title}>
            <img src={story.image} alt={`${story.title} visual direction`} />
            <div>
              <span>{story.kicker}</span>
              <h3>{story.title}</h3>
              <p>{story.detail}</p>
            </div>
          </article>
        ))}
      </div>
      <a className="blue-button" href="#estimate">Plan My Surface</a>
    </section>
  );
}

function MobileActionRail() {
  return (
    <nav className="mobile-action-rail" aria-label="Mobile quick actions">
      <a href="#estimate"><span>01</span>Estimate</a>
      <a href={phoneHref}><span>02</span>Call</a>
      <a href="#process"><span>03</span>Process</a>
      <a href="#portal"><span>04</span>Portal</a>
    </nav>
  );
}

function TopBar() {
  return <div className="top-bar"><span>⌖ Nashville, Tennessee</span><a href={phoneHref}>{phoneDisplay}</a><a href={`mailto:${brand.leadEmail}`}>{brand.leadEmail}</a></div>;
}

function LogoLockup() {
  return (
    <a className="logo-lockup" href="/">
      <span className="logo-emblem"><img src={brand.assets.logo} alt="Nashville Resin Worx logo" /></span>
      <span>Nashville<strong>Resin Worx</strong><small>{brand.tagline}</small></span>
    </a>
  );
}

function Navigation() {
  return (
    <header className="mock-nav">
      <LogoLockup />
      <nav aria-label="Main navigation"><a href="/">Home</a><a href="/services">Services</a><a href="#process">Our Process</a><a href="/gallery">Gallery</a><a href="/products">Products</a><a href="/color-charts">Color Charts</a><a href="/about">About Us</a><a href="/contact">Contact</a></nav>
      <a className="nav-cta" href="#estimate">{brand.cta}</a>
    </header>
  );
}

function EstimateForm() {
  return (
    <form className="mock-estimate-form" id="estimate" action="/api/leads" method="post">
      <div className="form-progress"><span>1</span><span>2</span><span>3</span><span>4</span></div>
      <h2>Get Your Free Estimate</h2><p>Fast. Easy. No obligation.</p>
      <label><span>Step 1: Contact</span><input name="fullName" placeholder="Full Name" required autoComplete="name" /></label>
      <input name="phone" placeholder="Phone Number" required autoComplete="tel" />
      <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
      <label><span>Step 2: Project Type</span><select name="projectType" required defaultValue=""><option value="" disabled>Project Type</option>{brand.services.map((service) => <option key={service}>{service}</option>)}</select></label>
      <label><span>Step 3: Size & Condition</span><select name="squareFootage" defaultValue=""><option value="" disabled>Approx. Square Footage</option><option>Under 250 sq ft</option><option>250-500 sq ft</option><option>500-1,000 sq ft</option><option>1,000+ sq ft</option></select></label>
      <select name="surfaceCondition" defaultValue=""><option value="" disabled>Current Floor Condition</option><option>New concrete</option><option>Existing coating</option><option>Cracked or patched</option><option>Not sure</option></select>
      <label className="upload-box">Step 4: Photos Optional<span>Tap to upload JPG or PNG project photos</span><input name="photos" type="file" accept="image/png,image/jpeg" multiple /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden-field" />
      <button className="blue-button" type="submit">{brand.cta}</button><small>♙ We respect your privacy.</small>
    </form>
  );
}

function QrLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={`Open ${label}`}
      style={{
        display: "grid",
        placeItems: "center",
        width: 96,
        height: 96,
        flex: "0 0 auto",
        padding: 10,
        border: "2px solid #21d6ff",
        borderRadius: 5,
        background: "#ffffff",
        color: "#08789b",
        textAlign: "center",
        textTransform: "uppercase",
        boxShadow: "0 12px 26px rgba(0,168,216,.18)"
      }}
    >
      <span style={{ fontSize: ".62rem", fontWeight: 900, lineHeight: 1 }}>Open</span>
      <strong style={{ fontSize: ".74rem", lineHeight: 1.1 }}>{label}</strong>
    </a>
  );
}

function Footer() {
  return (
    <footer className="mock-footer" style={footerStyle}>
      <div className="footer-brand"><FooterLogoLockup /><p style={footerTextStyle}>Transforming concrete, wood, and metal into stunning durable surfaces built for life.</p></div>
      <div><h3>Services</h3>{brand.services.slice(0, 6).map((service) => <a href="/services" key={service} style={footerLinkStyle}>{service}</a>)}</div>
      <div><h3>Quick Links</h3><a href={phoneHref} style={footerLinkStyle}>{phoneDisplay}</a><a href={`mailto:${brand.leadEmail}`} style={footerLinkStyle}>{brand.leadEmail}</a><a href="#estimate" style={footerLinkStyle}>{brand.cta}</a></div>
      <div><h3>The Nashville Resin Worx App</h3><div className="footer-icons"><span style={footerTextStyle}>Track Progress</span><span style={footerTextStyle}>Send Messages</span><span style={footerTextStyle}>Pay Securely</span><span style={footerTextStyle}>Care Guides</span></div></div>
      <div className="footer-qr"><h3>Customer Portal</h3><QrLink href="/customer-portal" label="Portal" /><small style={footerTextStyle}>Open the customer portal</small></div>
    </footer>
  );
}

function FooterLogoLockup() {
  return (
    <a className="logo-lockup" href="/" style={footerLinkStyle}>
      <span className="logo-emblem"><img src={brand.assets.logo} alt="Nashville Resin Worx logo" /></span>
      <span style={{ color: "#101214" }}>Nashville<strong>Resin Worx</strong><small style={{ color: "#42494c" }}>{brand.tagline}</small></span>
    </a>
  );
}
