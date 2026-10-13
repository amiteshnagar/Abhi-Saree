// =============================================================================
// CartSummary Component — Abhi Saree Collection (React Practice)
// Phase 6.9: Shopping Cart State & Array.prototype.reduce()
// =============================================================================

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN')
}

// CONCEPT: Reusable Cart Presentation (Phase 6.12: Driven by useReducer)
// Receives:
//   - `cart`: Array of items currently in the cart
//   - `onUpdateQuantity`: Function to increase (+1) or decrease (-1) an item's count
//   - `onIncrement`: Function to dispatch INCREMENT action
//   - `onDecrement`: Function to dispatch DECREMENT action
//   - `onRemoveItem`: Function to dispatch REMOVE_ITEM action
//   - `onClearCart`: Function to dispatch CLEAR_CART action
function CartSummary({
  cart,
  onUpdateQuantity,
  onIncrement,
  onDecrement,
  onRemoveItem,
  onClearCart,
}) {
  // CONCEPT 1: Calculating Totals with Array.prototype.reduce()
  // .reduce() accumulates an entire array into a single computed value during render.
  // It takes:
  //   1. A callback function: (accumulator, currentItem) => updatedAccumulator
  //   2. An initial value: 0
  //
  // Total Items Count:
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Total Sample Price:
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.numericPrice,
    0
  )

  return (
    <section className="cart-summary-section" aria-label="Shopping Cart Summary">
      <div className="cart-header">
        <h3 className="cart-title">
          Shopping Cart Demonstration
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </h3>
        <p className="cart-subtitle">
          * Managed with React useReducer. Totals calculated dynamically with Array.prototype.reduce().
        </p>
      </div>

      {cart.length === 0 ? (
        // CONCEPT 2: Empty Cart State
        <div className="empty-cart-notice" role="status">
          <p>Your shopping cart is currently empty.</p>
          <p className="empty-cart-hint">
            Click &ldquo;Add to Cart&rdquo; on any saree card above to add items to this cart demo.
          </p>
        </div>
      ) : (
        // Cart Items List
        <div className="cart-content">
          <div className="cart-items-list" role="list">
            {cart.map((item) => {
              const lineTotal = item.quantity * item.numericPrice

              return (
                <div key={item.id} className="cart-item-row" role="listitem">
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-unit-price">
                      {item.price} each
                    </span>
                  </div>

                  {/* Quantity & Item Controls */}
                  <div className="cart-item-controls">
                    <div className="quantity-button-group">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => {
                          if (onDecrement) onDecrement(item.id)
                          else if (onUpdateQuantity) onUpdateQuantity(item.id, -1)
                        }}
                        aria-label={`Decrease quantity of ${item.name}`}
                        title="Decrease quantity"
                      >
                        −
                      </button>

                      <span
                        className="qty-display"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => {
                          if (onIncrement) onIncrement(item.id)
                          else if (onUpdateQuantity) onUpdateQuantity(item.id, 1)
                        }}
                        aria-label={`Increase quantity of ${item.name}`}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="cart-item-line-total">
                      <span className="line-total-label">Total: </span>
                      <strong className="line-total-amount">
                        {formatINR(lineTotal)}
                      </strong>
                    </div>

                    {/* Dedicated Remove Item Button */}
                    <button
                      type="button"
                      className="cart-remove-item-btn"
                      onClick={() => onRemoveItem && onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      title={`Remove ${item.name}`}
                      data-testid={`remove-item-${item.id}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cart Grand Total & Actions */}
          <div className="cart-footer">
            <div className="cart-totals-summary">
              <div className="cart-total-row">
                <span>Total Items:</span>
                <strong>{totalItems} {totalItems === 1 ? 'saree' : 'sarees'}</strong>
              </div>
              <div className="cart-total-row grand-total">
                <span>Sample Order Total:</span>
                <strong className="grand-total-amount">
                  {formatINR(totalPrice)}
                </strong>
              </div>
              <p className="cart-disclaimer">
                * Illustrative learning demonstration — prices are sample values.
              </p>
            </div>

            <div className="cart-actions">
              <button
                type="button"
                className="cart-clear-btn"
                onClick={onClearCart}
                aria-label="Clear all items from shopping cart"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CartSummary
