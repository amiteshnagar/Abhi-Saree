// =============================================================================
// cartReducer.js — Shopping Cart State Reducer
// Phase 8.2.3: Predictable useReducer Cart State Management
// =============================================================================

/**
 * Initial shopping cart state.
 * Normalized to store only product IDs and whole-number quantities.
 * Product details, subtotals, item counts, and grand totals are derived
 * dynamically during render from the product catalogue.
 */
export const initialCartState = [];

/**
 * Pure cart reducer function managing all shopping cart transitions.
 * Guarantees immutable state updates and returns the existing state
 * if an unrecognized action or invalid payload is dispatched.
 *
 * @param {Array<{id: string, quantity: number}>} state - Current cart items array.
 * @param {{type: string, payload?: any}} action - Dispatched action.
 * @returns {Array<{id: string, quantity: number}>} Next cart items array.
 */
export function cartReducer(state, action) {
    switch (action.type) {
        // ---------------------------------------------------------------------
        // ADD_ITEM
        // Adds a product by ID with quantity 1, or increments if already present.
        // ---------------------------------------------------------------------
        case 'ADD_ITEM': {
            const productId = action.payload?.id || action.payload;
            if (!productId || typeof productId !== 'string') {
                return state;
            }

            const existingIndex = state.findIndex((item) => item.id === productId);
            if (existingIndex !== -1) {
                return state.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...state, { id: productId, quantity: 1 }];
        }

        // ---------------------------------------------------------------------
        // INCREMENT_QUANTITY
        // Increments quantity for the specified product ID by 1.
        // ---------------------------------------------------------------------
        case 'INCREMENT_QUANTITY': {
            const targetId = action.payload?.id || action.payload;
            if (!targetId || typeof targetId !== 'string') {
                return state;
            }

            return state.map((item) =>
                item.id === targetId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }

        // ---------------------------------------------------------------------
        // DECREMENT_QUANTITY
        // Decrements quantity for the specified product ID.
        // If quantity reaches 0, the item is safely removed.
        // ---------------------------------------------------------------------
        case 'DECREMENT_QUANTITY': {
            const targetId = action.payload?.id || action.payload;
            if (!targetId || typeof targetId !== 'string') {
                return state;
            }

            return state
                .map((item) =>
                    item.id === targetId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);
        }

        // ---------------------------------------------------------------------
        // REMOVE_ITEM
        // Removes the specified product ID from the cart immediately.
        // ---------------------------------------------------------------------
        case 'REMOVE_ITEM': {
            const targetId = action.payload?.id || action.payload;
            if (!targetId || typeof targetId !== 'string') {
                return state;
            }

            return state.filter((item) => item.id !== targetId);
        }

        // ---------------------------------------------------------------------
        // CLEAR_CART
        // Empties all items from the cart.
        // ---------------------------------------------------------------------
        case 'CLEAR_CART': {
            return [];
        }

        // ---------------------------------------------------------------------
        // DEFAULT
        // Return existing state unchanged for unknown actions.
        // ---------------------------------------------------------------------
        default: {
            return state;
        }
    }
}
