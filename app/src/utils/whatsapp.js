// =============================================================================
// whatsapp.js — WhatsApp Click-to-Chat Utilities
// Phase 8.2.4: Product Enquiry & Cart Order Generation
// =============================================================================

import { inrCurrencyFormatter } from '../data/products';

export const WHATSAPP_PHONE_NUMBER = '919340263875';

export const WHATSAPP_DEFAULT_GREETING =
    'Namaste! I’m interested in a saree from Abhi Saree Collection. Please share more details.';

/**
 * Builds the official WhatsApp click-to-chat URL for an individual product enquiry.
 *
 * @param {Object} product - Product object from catalogue.
 * @returns {string} Fully encoded WhatsApp URL.
 */
export function buildProductEnquiryUrl(product) {
    if (!product || !product.name) {
        return '';
    }

    const formattedPrice = inrCurrencyFormatter.format(product.price);

    const message = `${WHATSAPP_DEFAULT_GREETING}

Store: Abhi Saree Collection
Product: ${product.name}
Category: ${product.category}
Price: ${formattedPrice}

Please confirm if this saree is currently available in stock and let me know the delivery details.`;

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the official WhatsApp click-to-chat URL for the current cart contents.
 *
 * @param {Array<Object>} cartItems - Enriched cart items array with prices and subtotals.
 * @param {number} totalItems - Total count of pieces in cart.
 * @param {number} grandTotal - Calculated grand total amount in INR.
 * @returns {string} Fully encoded WhatsApp URL, or empty string if cart is empty.
 */
export function buildCartOrderUrl(cartItems = [], totalItems = 0, grandTotal = 0) {
    if (!cartItems || cartItems.length === 0) {
        return '';
    }

    const itemsList = cartItems
        .map((item, index) => {
            const unitPrice = inrCurrencyFormatter.format(item.price);
            const subtotal = inrCurrencyFormatter.format(item.subtotal || item.price * item.quantity);
            return `${index + 1}. ${item.name} (${item.category})\n   Quantity: ${item.quantity} | Unit Price: ${unitPrice} | Subtotal: ${subtotal}`;
        })
        .join('\n\n');

    const totalFormatted = inrCurrencyFormatter.format(grandTotal);
    const pieceSuffix = totalItems === 1 ? 'piece' : 'pieces';

    const message = `${WHATSAPP_DEFAULT_GREETING}

I would like to place an order request with Abhi Saree Collection for the following selected items:

${itemsList}

---
Total Items: ${totalItems} ${pieceSuffix}
Grand Total: ${totalFormatted}

Please confirm product availability, shipping options, and estimated delivery timeline.`;

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
