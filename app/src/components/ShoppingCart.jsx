import { inrCurrencyFormatter } from '../data/products';
import { buildCartOrderUrl } from '../utils/whatsapp';

export default function ShoppingCart({
    cartItems = [],
    totalItems = 0,
    grandTotal = 0,
    onIncrement,
    onDecrement,
    onRemoveItem,
    onClearCart
}) {
    const whatsappOrderUrl = buildCartOrderUrl(cartItems, totalItems, grandTotal);
    return (
        <section
            id="cart"
            className="cart-section"
            aria-labelledby="cart-heading"
        >
            <div className="cart-container">
                <div className="section-header">
                    <h2 id="cart-heading" className="section-title">
                        Shopping Cart
                    </h2>
                    <p className="section-subtitle">
                        Review your selected handloom sarees before ordering
                    </p>
                    {totalItems > 0 && (
                        <p className="cart-count-badge" aria-label={`${totalItems} ${totalItems === 1 ? 'item' : 'items'} in cart`}>
                            {totalItems} {totalItems === 1 ? 'saree' : 'sarees'} selected
                        </p>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart-card" role="status">
                        <span className="empty-cart-icon" aria-hidden="true">
                            🛍️
                        </span>
                        <h3 className="empty-cart-title">Your shopping cart is empty</h3>
                        <p className="empty-cart-text">
                            Explore our curated handloom collection above and click &ldquo;Add to Cart&rdquo; to reserve your favourite sarees.
                        </p>
                        <div className="empty-cart-actions-group">
                            <a href="#collections" className="browse-collection-btn">
                                Browse Saree Collection
                            </a>
                            <div className="empty-cart-whatsapp-box">
                                <button
                                    type="button"
                                    className="cart-whatsapp-order-btn is-disabled"
                                    disabled
                                    aria-disabled="true"
                                    aria-label="Order on WhatsApp (Disabled: cart is empty)"
                                    title="Add a saree to your cart to order via WhatsApp"
                                >
                                    Order on WhatsApp
                                </button>
                                <p className="empty-cart-whatsapp-note">
                                    Please add a saree to your cart before placing an order on WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cart-content-wrapper">
                        {/* List of Cart Items */}
                        <div className="cart-items-list" role="list">
                            {cartItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="cart-item-card"
                                    role="listitem"
                                    data-item-id={item.id}
                                >
                                    <div className="cart-item-info">
                                        <span className="cart-item-category">
                                            {item.category}
                                        </span>
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-unit-price">
                                            Unit Price: {inrCurrencyFormatter.format(item.price)}
                                        </p>
                                    </div>

                                    <div className="cart-item-actions">
                                        {/* Quantity Controls */}
                                        <div
                                            className="cart-qty-controls"
                                            role="group"
                                            aria-label={`Quantity controls for ${item.name}`}
                                        >
                                            <button
                                                type="button"
                                                className="cart-qty-btn cart-qty-minus"
                                                onClick={() => onDecrement && onDecrement(item.id)}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                                title="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span
                                                className="cart-qty-value"
                                                aria-label={`Quantity: ${item.quantity}`}
                                            >
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                className="cart-qty-btn cart-qty-plus"
                                                onClick={() => onIncrement && onIncrement(item.id)}
                                                aria-label={`Increase quantity of ${item.name}`}
                                                title="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Line Subtotal */}
                                        <div className="cart-item-subtotal">
                                            <span className="subtotal-label">Subtotal:</span>
                                            <strong className="subtotal-amount">
                                                {inrCurrencyFormatter.format(item.subtotal)}
                                            </strong>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            className="cart-remove-btn"
                                            onClick={() => onRemoveItem && onRemoveItem(item.id)}
                                            aria-label={`Remove ${item.name} from cart`}
                                            title={`Remove ${item.name}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Cart Summary & Actions */}
                        <div className="cart-summary-footer">
                            <div className="cart-summary-details">
                                <div className="cart-summary-row">
                                    <span className="summary-row-label">Total Sarees:</span>
                                    <span className="summary-row-value">
                                        {totalItems} {totalItems === 1 ? 'piece' : 'pieces'}
                                    </span>
                                </div>
                                <div className="cart-summary-row grand-total-row">
                                    <span className="summary-row-label">Grand Total:</span>
                                    <strong className="summary-row-value grand-total-amount">
                                        {inrCurrencyFormatter.format(grandTotal)}
                                    </strong>
                                </div>
                                <p className="cart-demo-notice">
                                    * Sample showcase order demonstration with pure useReducer state management.
                                </p>
                            </div>

                            <div className="cart-summary-actions">
                                <a
                                    href={whatsappOrderUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cart-whatsapp-order-btn"
                                    aria-label="Order selected sarees on WhatsApp"
                                >
                                    Order on WhatsApp
                                </a>
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
            </div>
        </section>
    );
}
