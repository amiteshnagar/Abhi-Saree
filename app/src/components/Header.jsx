import Navigation from './Navigation';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_DEFAULT_GREETING } from '../utils/whatsapp';

export default function Header({
    isMenuOpen,
    onToggleMenu,
    onCloseMenu,
    totalItems = 0
}) {
    const announcementWhatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_GREETING)}`;

    return (
        <header className="site-header">
            {/* Top Announcement Bar */}
            <div className="top-announcement-bar">
                <div className="announcement-content">
                    <span className="announcement-item">
                        Curated Handloom &amp; Festive Saree Showcase
                    </span>
                    <span className="announcement-divider" aria-hidden="true">•</span>
                    <span className="announcement-item announcement-secondary">
                        Personal Consultations
                    </span>
                    <span className="announcement-divider announcement-secondary" aria-hidden="true">•</span>
                    <a
                        href={announcementWhatsappUrl}
                        className="announcement-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Enquire on WhatsApp at 919340263875"
                    >
                        WhatsApp: +91 93402 63875
                    </a>
                </div>
            </div>

            {/* Main Header Container */}
            <div className="header-container">
                {/* Brand Identity: Official Logo, Business Name & Subtitle */}
                <div className="brand">
                    <img
                        src="/logo/logo.png"
                        alt="Abhi Saree Collection Logo"
                        className="brand-logo"
                        width="60"
                        height="60"
                    />
                    <div className="brand-text">
                        <h1 className="brand-name">Abhi Saree Collection</h1>
                        <span className="brand-subtitle">Curated Sarees &amp; Festive Weaves</span>
                    </div>
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

