import { inrCurrencyFormatter } from '../data/products';

export default function ProductCard({ product }) {
    return (
        <article className="product-card">
            <img
                className="product-image"
                src={product.imageSrc}
                alt={product.imageAlt}
                width="400"
                height="450"
            />
            <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                    <span className="product-price">
                        {inrCurrencyFormatter.format(product.price)}
                    </span>
                    <span className="sample-tag">Sample Reference</span>
                </div>
            </div>
        </article>
    );
}
