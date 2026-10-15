export default function Navigation({ isOpen, onClose }) {
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
