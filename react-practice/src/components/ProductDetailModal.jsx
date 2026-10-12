// =============================================================================
// ProductDetailModal Component — Abhi Saree Collection (React Practice)
// Phase 6.8: Product Detail Modal & Dialog Accessibility
// =============================================================================

import { useEffect } from 'react'

// CONCEPT 1: What is a Reusable Modal?
// Instead of creating separate modals for each saree, we create ONE reusable modal!
// It receives two props from App.jsx:
//   - `product`: The currently selected product object (or null)
//   - `onClose`: The callback function that resets selectedProduct back to null
function ProductDetailModal({ product, onClose }) {
  // CONCEPT 2: Managing Side Effects with useEffect (Unconditional Hook Call)
  // According to React's Rules of Hooks, Hooks must always be called at the top level
  // of the component, before any conditional returns.
  useEffect(() => {
    if (!product) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Save previous overflow style and prevent background scrolling
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function: runs when the modal is closed / unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [product, onClose])

  // If no product is selected, render nothing
  if (!product) return null

  return (
    // Backdrop overlay: clicking outside the modal content closes the modal
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      {/*
        Modal Dialog Box:
        - e.stopPropagation() prevents clicks inside the dialog from bubbling to the backdrop
        - role="dialog" and aria-modal="true" provide accessible screen-reader semantics
      */}
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <span className="modal-product-category">{product.category}</span>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close product details modal"
            autoFocus
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-product-title" className="modal-product-name">
            {product.name}
          </h2>

          <p className="modal-product-price">{product.price}</p>

          <div className="modal-description-box">
            <h4 className="modal-description-heading">Fabric & Craft Details:</h4>
            <p className="modal-product-description">
              {product.description || 'Handcrafted demonstration saree from the Abhi Saree Collection catalog.'}
            </p>
          </div>

          <div className="modal-sample-notice">
            * Demonstration Learning Catalog — illustrative details and sample pricing.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="modal-dismiss-btn"
            onClick={onClose}
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
