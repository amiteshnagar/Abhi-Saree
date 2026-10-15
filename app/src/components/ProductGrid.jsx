import ProductCard from './ProductCard';

export default function ProductGrid({
    products,
    searchQuery = '',
    onClearSearch,
    onSelectProduct,
    onAddToCart
}) {
    const trimmedQuery = searchQuery.trim();

    return (
        <div className="product-grid" id="product-grid">
            {products.length === 0 ? (
                trimmedQuery ? (
                    <div className="empty-state-notice">
                        <p className="sample-notice">
                            No sarees match &ldquo;<strong>{trimmedQuery}</strong>&rdquo;.
                        </p>
                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={onClearSearch}
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <p className="sample-notice">
                        No products found in this category at the moment.
                    </p>
                )
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={onSelectProduct}
                        onAddToCart={onAddToCart}
                    />
                ))
            )}
        </div>
    );
}
