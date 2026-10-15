import { useState, useReducer } from 'react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import FeaturedCollection from './components/FeaturedCollection';
import ShoppingCart from './components/ShoppingCart';
import CategoryHighlights from './components/CategoryHighlights';
import CustomerTrust from './components/CustomerTrust';
import Footer from './components/Footer';
import { initialCartState, cartReducer } from './reducers/cartReducer';
import { sampleProducts } from './data/products';
import './App.css';

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);
    const [cartNotification, setCartNotification] = useState('');

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    // Derive enriched cart items and financial totals directly during render
    const cartItems = cart
        .map((entry) => {
            const product = sampleProducts.find((p) => p.id === entry.id);
            if (!product) return null;
            return {
                ...product,
                quantity: entry.quantity,
                subtotal: product.price * entry.quantity
            };
        })
        .filter(Boolean);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const grandTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Cart Action Handlers
    const handleAddToCart = (product) => {
        if (!product || !product.id) return;
        dispatch({ type: 'ADD_ITEM', payload: product });
        setCartNotification(`Added ${product.name} to shopping cart.`);
    };

    const handleIncrement = (productId) => {
        const item = sampleProducts.find((p) => p.id === productId);
        dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
        if (item) {
            setCartNotification(`Increased quantity for ${item.name}.`);
        }
    };

    const handleDecrement = (productId) => {
        const item = sampleProducts.find((p) => p.id === productId);
        dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
        if (item) {
            setCartNotification(`Decreased quantity for ${item.name}.`);
        }
    };

    const handleRemoveItem = (productId) => {
        const item = sampleProducts.find((p) => p.id === productId);
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
        if (item) {
            setCartNotification(`Removed ${item.name} from shopping cart.`);
        }
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        setCartNotification('Shopping cart cleared.');
    };

    return (
        <>
            {/* Polite screen reader live region for cart updates */}
            <div
                className="visually-hidden"
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                {cartNotification}
            </div>

            <Header
                isMenuOpen={isMenuOpen}
                onToggleMenu={handleToggleMenu}
                onCloseMenu={handleCloseMenu}
                totalItems={totalItems}
            />
            <main>
                <WelcomeSection />
                <FeaturedCollection onAddToCart={handleAddToCart} />
                <ShoppingCart
                    cartItems={cartItems}
                    totalItems={totalItems}
                    grandTotal={grandTotal}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemoveItem={handleRemoveItem}
                    onClearCart={handleClearCart}
                />
                <CategoryHighlights />
                <CustomerTrust />
            </main>
            <Footer />
        </>
    );
}
