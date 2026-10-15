import { useEffect, useRef } from 'react';
import { inrCurrencyFormatter } from '../data/products';

export default function ProductDetailModal({ product, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!product) return;

        // 1. Save and lock background scroll
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // 2. Focus first focusable element inside dialog, or dialog itself
        const dialogNode = dialogRef.current;
        const getFocusables = () => {
            if (!dialogNode) return [];
            return Array.from(
                dialogNode.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
            ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
        };

        const focusables = getFocusables();
        if (focusables.length > 0) {
            focusables[0].focus();
        } else if (dialogNode) {
            dialogNode.focus();
        }

        // 3. Keydown listener for Escape and Tab focus trap
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const currentFocusables = getFocusables();
                if (currentFocusables.length === 0) {
                    e.preventDefault();
                    if (dialogNode) dialogNode.focus();
                    return;
                }

                const firstEl = currentFocusables[0];
                const lastEl = currentFocusables[currentFocusables.length - 1];

                if (e.shiftKey) {
                    if (
                        document.activeElement === firstEl ||
                        !dialogNode.contains(document.activeElement)
                    ) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (
                        document.activeElement === lastEl ||
                        !dialogNode.contains(document.activeElement)
                    ) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [product, onClose]);

    if (!product) return null;

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="presentation"
        >
            <div
                ref={dialogRef}
                className="modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-product-title"
                tabIndex="-1"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close-btn"
                    onClick={onClose}
                    aria-label="Close product details modal"
                    title="Close"
                >
                    ✕
                </button>

                <div className="modal-content-grid">
                    <div className="modal-media-col">
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="modal-product-image"
                            width="400"
                            height="450"
                        />
                    </div>

                    <div className="modal-info-col">
                        <span className="modal-product-category">
                            {product.category}
                        </span>

                        <h2 id="modal-product-title" className="modal-product-name">
                            {product.name}
                        </h2>

                        <p className="modal-product-price">
                            {inrCurrencyFormatter.format(product.price)}
                        </p>

                        <div className="modal-description-section">
                            <h3 className="modal-description-heading">
                                Fabric &amp; Craft Details
                            </h3>
                            <p className="modal-product-desc">
                                {product.description}
                            </p>
                        </div>

                        <div className="modal-sample-badge">
                            <span className="sample-tag">Sample Reference</span>
                            <span className="modal-sample-note">
                                Curated preview piece from our artisanal handloom collection.
                            </span>
                        </div>

                        <div className="modal-footer-actions">
                            <button
                                type="button"
                                className="modal-dismiss-btn"
                                onClick={onClose}
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
