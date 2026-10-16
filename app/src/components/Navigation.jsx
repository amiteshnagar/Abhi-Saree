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
                    <a href="#cart" className="nav-link nav-link-cart" onClick={onClose}>
                        <span className="nav-cart-label-wrap">
                            <svg
                                className="nav-cart-svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span>Cart</span>
                        </span>
                        {totalItems > 0 && <span className="nav-cart-badge">{totalItems}</span>}
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
