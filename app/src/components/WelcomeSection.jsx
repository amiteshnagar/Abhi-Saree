import { useState } from 'react';

export default function WelcomeSection() {
    const [isUpdated, setIsUpdated] = useState(false);

    const handleCheckStatus = () => {
        setIsUpdated(true);
    };

    return (
        <section id="welcome" className="welcome-section">
            <h2>Welcome to Abhi Saree Collection</h2>
            <p>
                Explore our exquisite range of handcrafted sarees, traditional weaves, and contemporary designs for every special occasion.
            </p>

            {/* Phase 5.1 Parity: Interactive Boutique Status Checker */}
            <div className="interactive-test-box">
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
        </section>
    );
}
