export default function CategoryHighlights() {
    return (
        <section
            id="categories"
            className="categories-section"
            aria-labelledby="categories-heading"
        >
            <div className="section-header">
                <h2 id="categories-heading" className="section-title">
                    Explore by Category
                </h2>
                <p className="section-subtitle">
                    Discover our complete boutique offerings curated for timeless elegance.
                </p>
            </div>

            <div className="categories-grid">
                {/* Category 1: Sarees (links to active showcase) */}
                <a
                    href="#collections"
                    className="category-card"
                    aria-label="Explore Sarees category"
                >
                    <h3 className="category-name">Sarees</h3>
                    <p className="category-desc">
                        Banarasi, Kanjeevaram, Chanderi, and party-wear festive drapes.
                    </p>
                    <span className="category-status active-status">
                        Featured Showcase &uarr;
                    </span>
                </a>

                {/* Category 2: Suits (documented future catalog) */}
                <a
                    href="#categories"
                    className="category-card"
                    aria-label="Suits category - in preparation"
                >
                    <h3 className="category-name">Suits</h3>
                    <p className="category-desc">
                        Handcrafted Anarkalis, straight suits, and festive salwar sets.
                    </p>
                    <span className="category-status">
                        Catalog In Preparation
                    </span>
                </a>

                {/* Category 3: Blouses (documented future catalog) */}
                <a
                    href="#categories"
                    className="category-card"
                    aria-label="Blouses category - in preparation"
                >
                    <h3 className="category-name">Blouses</h3>
                    <p className="category-desc">
                        Designer embroidered, brocade, and tailored festive blouses.
                    </p>
                    <span className="category-status">
                        Catalog In Preparation
                    </span>
                </a>

                {/* Category 4: Other Clothing (documented future catalog) */}
                <a
                    href="#categories"
                    className="category-card"
                    aria-label="Other Clothing category - in preparation"
                >
                    <h3 className="category-name">Other Clothing</h3>
                    <p className="category-desc">
                        Artisanal dupattas, festive lehengas, and curated ethnic wear.
                    </p>
                    <span className="category-status">
                        Catalog In Preparation
                    </span>
                </a>
            </div>
        </section>
    );
}
