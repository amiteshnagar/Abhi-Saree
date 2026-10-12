// =============================================================================
// ProductCard Component — Abhi Saree Collection (React Practice)
// Phase 6.9: Product Props, Modal Selection & Cart Addition
// =============================================================================

// CONCEPT: What are Props?
// Props (short for "properties") are how parent components pass data down to
// child components, just like passing arguments to a JavaScript function.
//
// Here, we destructure `{ name, category, price, onSelect, onAddToCart }`:
//   - name: The saree product title (e.g., "Royal Crimson Banarasi Saree")
//   - category: The fabric or style category (e.g., "Banarasi Silk")
//   - price: The illustrative sample price (e.g., "₹8,499")
//   - onSelect: Callback function invoked when opening product details in modal
//   - onAddToCart: Callback function invoked when adding this saree to the cart
function ProductCard({ name, category, price, onSelect, onAddToCart }) {
  return (
    <article
      className="practice-product-card"
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      {/* Category Tag */}
      <span className="practice-product-category">{category}</span>

      {/* Product Name */}
      <h3 className="practice-product-name">{name}</h3>

      {/* Illustrative Price */}
      <p className="practice-product-price">{price}</p>

      {/* Accessible Action Buttons: View Details & Add to Cart */}
      <div className="card-actions-row">
        <button
          type="button"
          className="view-details-btn"
          onClick={(e) => {
            e.stopPropagation() // Avoid redundant trigger on article click
            if (onSelect) onSelect()
          }}
          aria-label={`View details for ${name}`}
        >
          View Details
        </button>

        <button
          type="button"
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation() // Prevent opening the modal when adding to cart
            if (onAddToCart) onAddToCart()
          }}
          aria-label={`Add ${name} to cart`}
        >
          Add to Cart
        </button>
      </div>

      {/* Sample Learning Data Notice */}
      <span className="practice-product-badge">Sample Learning Data</span>
    </article>
  )
}

// Export ProductCard so parent components (like App.jsx) can import and render it
export default ProductCard
