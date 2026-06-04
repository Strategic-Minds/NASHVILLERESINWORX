const products = ["Deep Pour Epoxy", "Table Epoxy", "Metallic Pigments", "Polyaspartic", "Primer", "Topcoat", "Accessories"];

export default function ProductsPage() {
  return <main className="site-shell"><section className="section-black"><p className="eyebrow">Products</p><h1>Product Interest</h1><p className="hero-copy">Product structure without unverified pricing, inventory, shipping, or warranty claims.</p></section><section className="section-white"><div className="product-grid">{products.map((product) => <div className="product-item" key={product}><h3>{product}</h3></div>)}</div></section></main>;
}
