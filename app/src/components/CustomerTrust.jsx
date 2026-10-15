export default function CustomerTrust() {
    return (
        <section
            id="about"
            className="trust-section"
            aria-labelledby="trust-heading"
        >
            <div className="section-header">
                <h2 id="trust-heading" className="section-title">
                    Why Choose Abhi Saree Collection
                </h2>
                <p className="section-subtitle">
                    Our commitment to artisanal craftsmanship, authentic zari, and dedicated customer care.
                </p>
            </div>

            <div className="trust-grid">
                {/* Trust Card 1 */}
                <article className="trust-card">
                    <span className="trust-badge">Quality Promise</span>
                    <h3 className="trust-title">Handpicked Authenticity</h3>
                    <p className="trust-text">
                        &quot;Every weave in our boutique is individually inspected for fabric purity, authentic zari threadwork, and artisanal finish.&quot;
                    </p>
                    <span className="trust-footer">
                        Boutique Standard • Verified Handloom
                    </span>
                </article>

                {/* Trust Card 2: Documented Sample Placeholder */}
                <article className="trust-card placeholder-trust">
                    <span className="trust-badge">Customer Trust Placeholder</span>
                    <h3 className="trust-title">Verified Buyer Reviews</h3>
                    <p className="trust-text">
                        <em>
                            Sample Testimonial Slot: Customer reviews from verified buyers will be highlighted here in future updates to share authentic shopping experiences.
                        </em>
                    </p>
                    <span className="trust-footer">
                        Sample Placeholder • Real Reviews Coming Soon
                    </span>
                </article>

                {/* Trust Card 3 */}
                <article className="trust-card">
                    <span className="trust-badge">Service Commitment</span>
                    <h3 className="trust-title">Care &amp; Delivery</h3>
                    <p className="trust-text">
                        &quot;Personalized saree styling advisory, secure gift packing, and reliable door-to-door delivery for every celebration.&quot;
                    </p>
                    <span className="trust-footer">
                        Customer Care • Nationwide Support
                    </span>
                </article>
            </div>
        </section>
    );
}
