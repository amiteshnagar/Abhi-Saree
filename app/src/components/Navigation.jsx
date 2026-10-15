export default function Navigation({ isOpen, onClose, totalItems = 0 }) {
    return (
        <nav
            className={`main-nav ${isOpen ? 'is-open' : ''}`.trim()}
            id="primary-nav"
            aria-label="Main Navigation"
        >
            <ul className="nav-list" id="nav-list">
                <li>
                    <a href="#welcome" className="nav-link" onClick={onClose}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#collections" className="nav-link" onClick={onClose}>
                        Collections
                    </a>
                </li>
                <li>
                    <a href="#cart" className="nav-link" onClick={onClose}>
                        Cart {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
                    </a>
                </li>
                <li>
                    <a href="#about" className="nav-link" onClick={onClose}>
                        About Us
                    </a>
                </li>
                <li>
                    <a href="#contact" className="nav-link" onClick={onClose}>
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}
