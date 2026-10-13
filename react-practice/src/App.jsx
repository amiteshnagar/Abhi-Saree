// =============================================================================
// Abhi Saree Collection — React Practice App
// Phase 6.9: Shopping Cart State & Array.prototype.reduce()
// =============================================================================

// 1. Import React's useState, useEffect, and useReducer hooks
import { useState, useEffect, useReducer } from 'react'

// 2. Import child components
import Header from './components/Header.jsx'
import WelcomeSection from './components/WelcomeSection.jsx'
import LifecycleDemo from './components/LifecycleDemo.jsx'
import ReducerLearningSection from './components/ReducerLearningSection.jsx'
import AddProductForm from './components/AddProductForm.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import CartSummary from './components/CartSummary.jsx'

// 3. Import Cart Reducer (Phase 6.12)
import { cartReducer, initialCartState } from './reducers/cartReducer.js'

// 4. Import CSS styles for the practice card
import './App.css'

// Categories available for filtering
const categories = ['All', 'Silk', 'Cotton', 'Georgette']

// Supported product categories based on actual existing product data (Phase 6.11)
const supportedCategories = [
  'Banarasi Silk',
  'Kanjeevaram Silk',
  'Chanderi Cotton',
  'Georgette Zari',
]

// Helper for generating collision-safe unique product IDs
function generateUniqueId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `saree-${crypto.randomUUID()}`
  }
  return `saree-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Initial data array containing the three established demonstration products with numeric prices
const initialProducts = [
  {
    id: 'saree-1',
    name: 'Royal Crimson Banarasi Saree',
    category: 'Banarasi Silk',
    price: '₹8,499',
    numericPrice: 8499,
    description: 'Handwoven pure Banarasi silk adorned with intricate floral brocade and rich zari border work.',
  },
  {
    id: 'saree-2',
    name: 'Golden Temple Border Saree',
    category: 'Kanjeevaram Silk',
    price: '₹11,999',
    numericPrice: 11999,
    description: 'Traditional Kanjeevaram silk featuring gold-dipped temple border motifs and a richly woven contrast pallu.',
  },
  {
    id: 'saree-3',
    name: 'Blush Ivory Handwoven Saree',
    category: 'Chanderi Cotton',
    price: '₹4,250',
    numericPrice: 4250,
    description: 'Lightweight handwoven Chanderi cotton with subtle gold buttis, ideal for graceful daytime wear.',
  },
]

// Pool of additional sample demonstration sarees for "Add Sample Saree" clicks.
// Newly added products participate in search, filtering, modal detail, and cart addition!
const additionalSampleSarees = [
  {
    name: 'Midnight Maroon Embellished Saree',
    category: 'Georgette Zari',
    price: '₹6,800',
    numericPrice: 6800,
    description: 'Flowing lightweight georgette saree adorned with delicate scalloped zari borders and sequin highlights.',
  },
  {
    name: 'Emerald Green Katan Silk Saree',
    category: 'Katan Silk',
    price: '₹9,200',
    numericPrice: 9200,
    description: 'Lustrous katan silk saree handloom-woven with regal floral buttas and antique gold borders.',
  },
  {
    name: 'Pastel Mint Mulmul Saree',
    category: 'Mulmul Cotton',
    price: '₹3,850',
    numericPrice: 3850,
    description: 'Ultra-soft breathable mulmul cotton saree with hand-blocked botanical motifs and soft pallu.',
  },
  {
    name: 'Sunset Coral Organza Saree',
    category: 'Organza Silk',
    price: '₹7,450',
    numericPrice: 7450,
    description: 'Sheer translucent organza saree with delicate hand-embroidered border detailing and soft sheen.',
  },
]

// 4. Main App Component
function App() {
  // Underlying product list state (preserved from Phase 6.5)
  const [products, setProducts] = useState(initialProducts)

  // Selected Category State (preserved from Phase 6.6)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Search Query State (preserved from Phase 6.7)
  const [searchQuery, setSearchQuery] = useState('')

  // Selected Product State for Modal (preserved from Phase 6.8)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // CONCEPT 1: Shopping Cart State with useReducer (Phase 6.12)
  // Replaced useState([]) with useReducer(cartReducer, initialCartState).
  // All state transitions (ADD_TO_CART, INCREMENT, DECREMENT, REMOVE_ITEM, CLEAR_CART)
  // are consolidated inside cartReducer.js rather than scattered across event handlers.
  const [cart, dispatchCart] = useReducer(cartReducer, initialCartState)

  // Independent status message state (preserved from Phase 6.1)
  const [statusMessage, setStatusMessage] = useState('Welcome to React!')

  // Multi-Criteria Filtering with Derived State (preserved from Phase 6.7)
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())

    const matchesSearch =
      normalizedQuery === '' ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesSearch
  })

  // ===========================================================================
  // 🎓 DERIVED DATA vs useEffect ANTI-PATTERN:
  // We calculate `displayedCount` and `totalCount` directly during render.
  // DO NOT use a `useState` + `useEffect` to synchronize this!
  // Direct render calculations are instant, synchronous, and never fall out of sync.
  // ===========================================================================
  const displayedCount = filteredProducts.length
  const totalCount = products.length

  // ===========================================================================
  // 🎓 SINGLE DOCUMENT TITLE EFFECT (Lifecycle & Dependency Demonstration):
  // Syncs the browser page title with the active cart count and saree count.
  // - Dependency array [cart, displayedCount]: runs on mount and whenever
  //   either cart or displayedCount changes.
  // - Meaningful Cleanup: restores previousTitle when component unmounts or before re-run.
  // ===========================================================================
  useEffect(() => {
    const previousTitle = document.title
    const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    document.title =
      totalCartQuantity > 0
        ? `Abhi Saree Collection (${totalCartQuantity} in cart)`
        : `Abhi Saree Collection (${displayedCount} Sarees)`

    return () => {
      document.title = previousTitle
    }
  }, [cart, displayedCount])

  // Adding custom saree from controlled form (Phase 6.11)
  function handleAddProduct(newSareeData) {
    const newId = generateUniqueId()
    const newSaree = {
      id: newId,
      name: newSareeData.name,
      category: newSareeData.category,
      price: `₹${Number(newSareeData.price).toLocaleString('en-IN')}`,
      numericPrice: Number(newSareeData.price),
      description: `Handcrafted ${newSareeData.category} saree with traditional boutique detailing.`,
    }

    setProducts((prevProducts) => [...prevProducts, newSaree])
  }

  // Appending to Products State with Functional Updates (preserved from Phase 6.5)
  function handleAddSaree() {
    setProducts((prevProducts) => {
      const nextIndex = prevProducts.length
      const template = additionalSampleSarees[(nextIndex - 3) % additionalSampleSarees.length]

      const newId = generateUniqueId()

      const newSaree = {
        id: newId,
        name: template.name,
        category: template.category,
        price: template.price,
        numericPrice: template.numericPrice,
        description: template.description,
      }

      return [...prevProducts, newSaree]
    })
  }

  // Clear search helper function
  function handleClearSearch() {
    setSearchQuery('')
  }

  // Selecting and Closing the Modal (preserved from Phase 6.8)
  function handleSelectProduct(product) {
    setSelectedProduct(product)
  }

  function handleCloseModal() {
    setSelectedProduct(null)
  }

  // ===========================================================================
  // 🎓 DISPATCHING ACTIONS TO THE REDUCER (Phase 6.12):
  // Instead of calling setCart(prevCart => ...), we send action objects to the reducer.
  // The reducer receives (state, action) and returns the updated state immutably.
  // ===========================================================================

  // ACTION 1: ADD_TO_CART
  function handleAddToCart(product) {
    dispatchCart({ type: 'ADD_TO_CART', payload: product })
  }

  // ACTION 2: INCREMENT
  function handleIncrement(productId) {
    dispatchCart({ type: 'INCREMENT', payload: { id: productId } })
  }

  // ACTION 3: DECREMENT
  function handleDecrement(productId) {
    dispatchCart({ type: 'DECREMENT', payload: { id: productId } })
  }

  // ACTION 4: REMOVE_ITEM
  function handleRemoveItem(productId) {
    dispatchCart({ type: 'REMOVE_ITEM', payload: { id: productId } })
  }

  // ACTION 5: CLEAR_CART
  function handleClearCart() {
    dispatchCart({ type: 'CLEAR_CART' })
  }

  // Backward-compatible helper for existing tests & quantity buttons
  function handleUpdateQuantity(productId, delta) {
    if (delta > 0) {
      dispatchCart({ type: 'INCREMENT', payload: { id: productId } })
    } else {
      dispatchCart({ type: 'DECREMENT', payload: { id: productId } })
    }
  }

  // Event handler for original test interaction button (preserved)
  function handleButtonClick() {
    setStatusMessage('Your first React interaction works!')
  }

  return (
    <div className="app-container">
      <div className="practice-card">
        {/* Child Component 1: Header */}
        <Header />

        {/* Child Component 2: Welcome Section */}
        <WelcomeSection />

        {/* Child Component 3: React useEffect & Lifecycle Demonstration (Phase 6.10) */}
        <LifecycleDemo />

        {/* Child Component: React useReducer Learning Demonstration (Phase 6.12) */}
        <ReducerLearningSection />

        {/* Child Component 4: Dynamic Product List with Search, Filter, Modal & Cart */}
        <section className="practice-products-section">
          <h2 className="practice-section-heading">Sample Saree Collection (Cart Demo)</h2>
          <p className="practice-section-subtext">
            * Search, filter, inspect details, and click &ldquo;Add to Cart&rdquo; to test shopping cart state. Illustrative sample prices.
          </p>

          {/* Child Component: Add Sample Saree Form (Phase 6.11) */}
          <AddProductForm
            supportedCategories={supportedCategories}
            onAddProduct={handleAddProduct}
          />

          {/* Quick Action Button: Add Sample Saree (Preserved) */}
          <div className="add-saree-action">
            <button
              type="button"
              className="add-saree-btn"
              onClick={handleAddSaree}
            >
              Add Sample Saree
            </button>
          </div>

          {/* Live Product Count Badge (Derived directly during render - No useEffect needed) */}
          <div
            className="product-count-summary"
            role="status"
            aria-live="polite"
            data-testid="product-count-summary"
          >
            Showing <strong className="count-highlight">{displayedCount}</strong> of{' '}
            <strong className="count-highlight">{totalCount}</strong> sarees
            {selectedCategory !== 'All' && (
              <span> in <em>{selectedCategory}</em></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;<em>{searchQuery}</em>&rdquo;</span>
            )}
          </div>

          {/* Category Filter Controls */}
          <div
            className="category-filter-group"
            role="group"
            aria-label="Filter sample sarees by fabric category"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-filter-btn ${isSelected ? 'active' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Input Control */}
          <div className="search-control-group">
            <label htmlFor="saree-search-input" className="search-label">
              Search Sarees
            </label>
            <div className="search-input-wrapper">
              <input
                id="saree-search-input"
                type="search"
                className="search-input"
                placeholder="Search by saree name or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search sarees by name or fabric"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/*
            Conditional Rendering:
            Empty notice vs Product Grid
          */}
          {filteredProducts.length === 0 ? (
            <div className="empty-category-notice" role="status">
              <p>
                {searchQuery ? (
                  <>
                    No sarees match &ldquo;<strong>{searchQuery}</strong>&rdquo;
                    {selectedCategory !== 'All' ? ` in the ${selectedCategory} category.` : '.'}
                  </>
                ) : (
                  <>
                    No sarees found in the <strong>{selectedCategory}</strong> category at the moment.
                  </>
                )}
              </p>
              <p className="empty-category-hint">
                {searchQuery ? (
                  <>Try clearing your search query or selecting a different category.</>
                ) : (
                  <>Try selecting another category or click &ldquo;Add Sample Saree&rdquo; above.</>
                )}
              </p>
            </div>
          ) : (
            <div className="practice-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  onSelect={() => handleSelectProduct(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Child Component 5: Shopping Cart Summary (Phase 6.9 & Phase 6.12: useReducer) */}
        <CartSummary
          cart={cart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Interactive Practice Box (useState & onClick preserved) */}
        <div className="interactive-box">
          <button
            type="button"
            className="practice-btn"
            onClick={handleButtonClick}
          >
            Click Me
          </button>

          {/* Dynamic state display */}
          <p className="status-display">{statusMessage}</p>
        </div>
      </div>

      {/* Modal Dialog for Selected Product (Phase 6.8 preserved) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App
