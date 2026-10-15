import { useRef } from 'react';
import { inrCurrencyFormatter } from '../data/products';

export default function ProductCard({ product, onSelectProduct }) {
    const viewButtonRef = useRef(null);

    const handleViewDetails = () => {
        if (typeof onSelectProduct === 'function') {
            onSelectProduct(product, viewButtonRef.current);
        }
    };

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
                <button
                    ref={viewButtonRef}
                    type="button"
                    className="view-details-btn"
                    onClick={handleViewDetails}
                    aria-label={`View details for ${product.name}`}
                >
                    View Details
                </button>
            </div>
        </article>
    );
}
