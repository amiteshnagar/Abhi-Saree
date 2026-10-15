import { useState, useRef, useEffect } from 'react';
import { sampleProducts } from '../data/products';
import ProductSearch from './ProductSearch';
import CategoryFilter from './CategoryFilter';
import ProductGrid from './ProductGrid';
import ProductDetailModal from './ProductDetailModal';

export default function FeaturedCollection({ onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const searchInputRef = useRef(null);
    const triggerButtonRef = useRef(null);

    const trimmedQuery = searchQuery.trim().toLowerCase();

    // Derive filtered products directly during render without useEffect
    const filteredProducts = sampleProducts.filter((product) => {
        const matchesCategory =
            selectedCategory === 'all' || product.fabricType === selectedCategory;
        const matchesSearch =
            !trimmedQuery ||
            product.name.toLowerCase().includes(trimmedQuery) ||
            product.category.toLowerCase().includes(trimmedQuery);
        return matchesCategory && matchesSearch;
    });

    const handleClearSearch = () => {
        setSearchQuery('');
        searchInputRef.current?.focus();
    };

    const handleOpenModal = (product, triggerButton) => {
        triggerButtonRef.current = triggerButton;
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    // Safe focus restoration after modal unmount
    useEffect(() => {
        if (!selectedProduct && triggerButtonRef.current) {
            if (typeof triggerButtonRef.current.focus === 'function') {
                triggerButtonRef.current.focus();
            }
            triggerButtonRef.current = null;
        }
    }, [selectedProduct]);

    return (
        <section
            id="collections"
            className="featured-section"
            aria-labelledby="collections-heading"
        >
            <div className="section-header">
                <h2 id="collections-heading" className="section-title">
                    Featured Saree Collection
                </h2>
                <p className="section-subtitle">
                    A curated preview of our finest handloom weaves, celebratory silks, and lightweight party wear.
                </p>
                <p className="sample-notice">
                    <em>* Sample showcase: items and reference prices are displayed for design demonstration.</em>
                </p>
            </div>

            {/* Product Search Control */}
            <ProductSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={handleClearSearch}
                filteredCount={filteredProducts.length}
                totalCount={sampleProducts.length}
                inputRef={searchInputRef}
            />

            {/* Product Category Filter Controls */}
            <CategoryFilter
                activeFilter={selectedCategory}
                onSelectFilter={setSelectedCategory}
            />

            {/* Product Grid */}
            <ProductGrid
                products={filteredProducts}
                searchQuery={searchQuery}
                onClearSearch={handleClearSearch}
                onSelectProduct={handleOpenModal}
                onAddToCart={onAddToCart}
            />

            {/* Product Detail Modal */}
            <ProductDetailModal
                product={selectedProduct}
                onClose={handleCloseModal}
                onAddToCart={onAddToCart}
            />
        </section>
    );
}
