import Navigation from './Navigation';

export default function Header({
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    totalItems = 0
}) {
    return (
        <header className="site-header">
            <div className="header-container">
                {/* Brand Identity: Official Logo and Business Name */}
                <div className="brand">
                    <img
                        src="/logo/logo.png"
                        alt="Abhi Saree Collection Logo"
                        className="brand-logo"
                        width="60"
                        height="60"
                    />
                    <h1 className="brand-name">Abhi Saree Collection</h1>
                </div>

                {/* Mobile Navigation Toggle Button (Phase 5.2 Parity) */}
                <button
                    type="button"
                    id="menu-toggle"
                    className="menu-toggle"
                    aria-label="Toggle navigation menu"
                    aria-controls="primary-nav"
                    aria-expanded={isMenuOpen}
                    onClick={onToggleMenu}
                >
                    <span className="menu-toggle-icon" aria-hidden="true">
                        {isMenuOpen ? '×' : '☰'}
                    </span>
                    <span className="menu-toggle-text">
                        {isMenuOpen ? 'Close' : 'Menu'}
                    </span>
                </button>

                {/* Main Semantic Navigation */}
                <Navigation
                    isOpen={isMenuOpen}
                    onClose={onCloseMenu}
                    totalItems={totalItems}
                />
            </div>
        </header>
    );
}
