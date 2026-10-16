import { useState } from 'react';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_DEFAULT_GREETING } from '../utils/whatsapp';

export default function WelcomeSection() {
    const [isUpdated, setIsUpdated] = useState(false);

    const handleCheckStatus = () => {
        setIsUpdated(true);
    };

    const heroWhatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_GREETING)}`;

    return (
        <section id="welcome" className="welcome-section hero-section" aria-labelledby="welcome-heading">
            <div className="hero-container">
                <div className="hero-badge">
                    <span className="hero-badge-dot" aria-hidden="true"></span>
                    <span className="hero-badge-text">Handloom &amp; Festive Collection Showcase</span>
                </div>

                <h2 id="welcome-heading" className="hero-title">
                    Welcome to Abhi Saree Collection
                </h2>

                <p className="hero-subtitle">
                    Handcrafted Sarees for Special Occasions &amp; Celebrations
                </p>

                <p className="hero-description">
                    Explore our exquisite range of handcrafted sarees, traditional weaves, and contemporary designs for every special occasion. Browse selected pieces online or connect directly with our boutique for personalised assistance.
                </p>

                {/* Primary Dual Call-to-Actions */}
                <div className="hero-cta-group">
                    <a href="#collections" className="hero-btn hero-primary-btn">
                        Explore Collection
                    </a>
                    <a
                        href={heroWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn hero-whatsapp-btn"
                        aria-label="Enquire on WhatsApp with Abhi Saree Collection"
                    >
                        <svg
                            className="hero-btn-svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.41-1.39-.575-2.26-1.996-2.327-2.086-.067-.09-1.54-2.051-1.54-3.91 0-1.86.974-2.776 1.32-3.136.345-.36.753-.45.1004-.45.252 0 .468.012.671.02.217.01.507-.082.793.603.296.708 1.012 2.47 1.101 2.651.09.182.15.395.03.636-.12.242-.18.393-.359.605-.18.213-.377.474-.539.636-.18.18-.368.375-.158.735.21.36.934 1.54 2.003 2.492 1.378 1.226 2.54 1.606 2.9 1.786.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.09 1.01 2.45 1.19.36.18.6.27.69.42.09.15.09.87-.21 1.275z" />
                        </svg>
                        <span>Enquire on WhatsApp</span>
                    </a>
                </div>

                {/* Stated Boutique Schedule & Interactive Status (Phase 5.1 Parity) */}
                <div className="hero-schedule-card interactive-test-box">
                    <div className="schedule-header">
                        <span className="schedule-badge">Boutique Visiting Schedule</span>
                        <p className="schedule-timing">Monday – Sunday: 8:00 AM – 8:00 PM</p>
                        <p className="schedule-subtext">Consultations and orders available during boutique hours.</p>
                    </div>

                    <div className="status-interactive-wrapper">
                        <button
                            type="button"
                            id="test-interaction-btn"
                            className="test-btn"
                            onClick={handleCheckStatus}
                        >
                            Check Boutique Status
                        </button>
                        <p
                            id="test-interaction-msg"
                            className={`test-msg ${isUpdated ? 'updated' : ''}`.trim()}
                            aria-live="polite"
                        >
                            {isUpdated
                                ? '✨ Welcome to Abhi Saree Collection! Our boutique is open today for festive inquiries and personal consultations.'
                                : "Click the button above to check today's boutique status."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
