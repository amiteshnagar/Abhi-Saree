// =============================================================================
// cartReducer.js — Shopping Cart State Reducer
// Phase 6.12: React useReducer State Management
// =============================================================================

// =============================================================================
// 🎓 BEGINNER'S GUIDE TO useReducer:
//
// 1. WHAT IS A REDUCER?
//    A reducer is a pure JavaScript function that calculates the next state:
//      (currentState, action) => nextState
//    It is named after Array.prototype.reduce() because it takes an existing state
//    and an incoming action, and "reduces" them down to a single new state.
//
// 2. THE ACTION OBJECT:
//    An action is a plain JavaScript object describing what happened.
//    Conventionally, it has:
//      - `type`: A string describing the intent (e.g., 'ADD_TO_CART', 'INCREMENT').
//      - `payload`: Any data needed to complete the transition (e.g., the product or its id).
//
// 3. THE SWITCH STATEMENT:
//    The reducer uses a `switch (action.type)` statement to branch to the logic
//    matching the requested action.
//
// 4. IMMUTABLE UPDATES:
//    In React, state must NEVER be mutated directly!
//    - Do NOT: state.push(newItem) or item.quantity++
//    - DO: [...state, newItem] or { ...item, quantity: item.quantity + 1 }
//    Returning new array/object references guarantees that React detects the change
//    and schedules a re-render.
// =============================================================================

/**
 * Initial state for the shopping cart.
 * An empty array representing zero cart items.
 */
export const initialCartState = []

/**
 * Cart reducer function managing all cart transitions.
 *
 * @param {Array} state - The current array of cart items.
 * @param {Object} action - The action dispatched ({ type, payload }).
 * @returns {Array} The next cart state array.
 */
export function cartReducer(state, action) {
  switch (action.type) {
    // -------------------------------------------------------------------------
    // ACTION 1: ADD_TO_CART
    // Adds a new saree with quantity 1, or increments quantity if already present.
    // -------------------------------------------------------------------------
    case 'ADD_TO_CART': {
      const product = action.payload
      if (!product || !product.id) return state

      const existingItem = state.find((item) => item.id === product.id)

      if (existingItem) {
        // Product already exists: return a new array with updated quantity
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // New product: append a new cart item object with quantity = 1
      return [
        ...state,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          numericPrice: product.numericPrice,
          quantity: 1,
        },
      ]
    }

    // -------------------------------------------------------------------------
    // ACTION 2: INCREMENT
    // Increases the quantity of a selected item by 1.
    // -------------------------------------------------------------------------
    case 'INCREMENT': {
      const targetId = action.payload?.id || action.payload
      return state.map((item) =>
        item.id === targetId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    // -------------------------------------------------------------------------
    // ACTION 3: DECREMENT
    // Decreases quantity by 1; automatically removes item when quantity reaches 0.
    // -------------------------------------------------------------------------
    case 'DECREMENT': {
      const targetId = action.payload?.id || action.payload
      return state
        .map((item) => {
          if (item.id === targetId) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter((item) => item.quantity > 0) // Automatically remove when quantity hits zero
    }

    // -------------------------------------------------------------------------
    // ACTION 4: REMOVE_ITEM
    // Removes the specified cart item immediately, regardless of its quantity.
    // -------------------------------------------------------------------------
    case 'REMOVE_ITEM': {
      const targetId = action.payload?.id || action.payload
      return state.filter((item) => item.id !== targetId)
    }

    // -------------------------------------------------------------------------
    // ACTION 5: CLEAR_CART
    // Empties the cart completely.
    // -------------------------------------------------------------------------
    case 'CLEAR_CART': {
      return []
    }

    // Default: if an unknown action is received, return current state unchanged
    default: {
      return state
    }
  }
}
