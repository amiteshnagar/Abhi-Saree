import { useRef, useState } from 'react';
import { inrCurrencyFormatter } from '../data/products';

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
    const viewButtonRef = useRef(null);
    const [isAdded, setIsAdded] = useState(false);

    const handleViewDetails = () => {
        if (typeof onSelectProduct === 'function') {
            onSelectProduct(product, viewButtonRef.current);
        }
    };

    const handleAddToCart = () => {
        if (typeof onAddToCart === 'function') {
            onAddToCart(product);
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 1200);
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
                loading="lazy"
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
                <div className="product-actions">
                    <button
                        ref={viewButtonRef}
                        type="button"
                        className="view-details-btn"
                        onClick={handleViewDetails}
                        aria-label={`View details for ${product.name}`}
                    >
                        View Details
                    </button>
                    <button
                        type="button"
                        className={`add-to-cart-btn ${isAdded ? 'is-added' : ''}`.trim()}
                        onClick={handleAddToCart}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        {isAdded ? '✓ Added' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </article>
    );
}
