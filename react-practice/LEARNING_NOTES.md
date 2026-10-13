# React useEffect Fundamentals — Learning Guide

Welcome to the **React `useEffect` & Lifecycle Learning Notes** for the Abhi Saree Collection practice application.

This document breaks down how React handles side effects, lifecycle events, dependency tracking, cleanup functions, and common pitfalls in plain, beginner-friendly language.

---

## 1. What is `useEffect` and Why Do We Need It?

In React, the primary job of a component function is to **render UI** based on its current props and state:
```javascript
UI = f(props, state)
```

However, web applications often need to communicate with the world outside the component:
- Changing the browser tab title (`document.title`)
- Running a background interval timer (`setInterval`)
- Listening for global keyboard events (`window.addEventListener('keydown')`)
- Cleaning up resources when a component disappears

These operations are called **Side Effects** because they affect things *outside* the local render output.

### Why do effects run *after* render?
React renders and paints HTML to the screen first so that user interactions feel instant and smooth. Once the DOM has been updated, React runs your effects. This separation prevents slow side effects from blocking the visual interface.

---

## 2. The Dependency Array: Three Essential Patterns

The second argument to `useEffect` is the **dependency array**. It tells React *when* your effect callback should re-run.

### Pattern A: No Dependency Array (Runs after EVERY render)
```javascript
useEffect(() => {
  console.log('Component rendered or updated!')
})
```
- **When it runs:** On initial mount and after **every single state or prop change**.
- **Use sparingly:** Running after every render can easily cause performance issues or accidental loops.

### Pattern B: Empty Dependency Array `[]` (Runs ONCE on Mount)
```javascript
useEffect(() => {
  console.log('Component mounted on screen!')
  // Perfect for one-time initialization
}, [])
```
- **When it runs:** Exactly **once**, immediately after the component's initial mount.
- **Why:** React compares the dependencies between renders. Since the array `[]` has no values, nothing ever changes, so React never re-runs the effect.

### Pattern C: Specific Dependencies `[dep1, dep2]` (Runs when dependencies change)
```javascript
useEffect(() => {
  console.log(`User cart count changed: ${cart.length}`)
}, [cart.length])
```
- **When it runs:** On initial mount, and then **only when one of the listed values changes** (using `Object.is` shallow equality check).
- **Why:** If other state changes (e.g. `searchQuery` or `selectedCategory`), this effect is skipped!

---

## 3. Cleanup Functions: Why and How They Work

When an effect sets up a continuous or external resource, you must return a **cleanup function**:

```javascript
useEffect(() => {
  // 1. Setup phase: create an interval timer
  const timerId = setInterval(() => {
    setSeconds((prev) => prev + 1)
  }, 1000)

  // 2. Cleanup phase: return a function
  return () => {
    // Runs before the effect re-runs, and when the component unmounts
    clearInterval(timerId)
  }
}, [isActive])
```

### When does the cleanup function execute?
1. **Before the effect runs again:** If `isActive` changes, React first cleans up the *old* interval before starting the new one.
2. **When the component unmounts:** If the user closes or removes the component, the cleanup function runs to prevent memory leaks and zombie timers.

---

## 4. Derived Data vs. `useEffect` Anti-Pattern

### ❌ The Common Mistake (Redundant State & Effect Sync)
Many beginners think they need `useEffect` to update counts or filtered lists:
```javascript
// AVOID THIS:
const [displayedCount, setDisplayedCount] = useState(0)

useEffect(() => {
  setDisplayedCount(filteredProducts.length) // ⚠️ Causes an extra re-render and can desync!
}, [filteredProducts])
```

### ✅ The Recommended React Pattern (Calculate Directly in Render)
If a value can be derived directly from existing props or state, compute it directly during rendering:
```javascript
// RECOMMENDED:
const displayedCount = filteredProducts.length
const totalCount = products.length
```
**Why this is better:**
1. **Zero extra renders:** React doesn't need to finish rendering, run the effect, and then trigger a second re-render.
2. **Never out of sync:** `displayedCount` is guaranteed to match `filteredProducts` at all times.
3. **Simpler code:** No extra state, no effect callback, and no dependency array to maintain.

---

## 5. Summary of Files Changed in Phase 6.10

| File | Purpose |
| :--- | :--- |
| [`src/components/LifecycleDemo.jsx`](file:///d:/Abhi_Sareee/react-practice/src/components/LifecycleDemo.jsx) | Educational component demonstrating mount `[]`, dependency triggering `[actionCount]`, and verifiable timer cleanup (`clearInterval`). |
| [`src/App.jsx`](file:///d:/Abhi_Sareee/react-practice/src/App.jsx) | Calculates live product count during render (no redundant effect), renders `<LifecycleDemo />`, and manages the single `document.title` effect with cleanup. |
| [`src/App.css`](file:///d:/Abhi_Sareee/react-practice/src/App.css) | Ivory, maroon, and gold styling for the lifecycle demo cards, mount indicator, timer controls, and live product count banner. |
| [`LEARNING_NOTES.md`](file:///d:/Abhi_Sareee/react-practice/LEARNING_NOTES.md) | This reference guide explaining concepts, lifecycles, and best practices. |

---

## 6. How to Test Dependency & Cleanup Behavior

1. **Test Mount Effect:**
   - Look at Card 1 in the Lifecycle Demo. Notice the mount timestamp is recorded once and remains constant.
2. **Test Dependency Effect:**
   - Click **"Trigger Dependency Effect (+1)"**.
   - Watch the log box update immediately with the new `actionCount` and timestamp.
3. **Test Verifiable Cleanup:**
   - Notice the timer seconds ticking every 1 second.
   - Click **"Pause Timer"**. The status switches to `⏸️ Paused (cleared)`.
   - Observe that `clearInterval()` runs immediately; seconds stop incrementing completely.
   - Click **"Resume Timer"** to re-activate the timer.
4. **Test Live Product Count (Derived State):**
   - Type `"Crimson"` into the search box: live count updates instantly to `Showing 1 of 3 sarees`.
   - Click category `"Cotton"`: live count updates to `Showing 1 of 3 sarees`.
   - Click category `"Georgette"`: live count updates to `Showing 0 of 3 sarees`.
   - Click **"Add Sample Saree"**: live count and total count update to `Showing 1 of 4 sarees` (or all 4 if "All" is active).
5. **Test Document Title Synchronization:**
   - Look at the browser tab title: it reads `Abhi Saree Collection (3 Sarees)`.
   - Click **"Add to Cart"** on any card: the tab title immediately switches to `Abhi Saree Collection (1 in cart)`.

---

## 7. React Forms, Controlled Inputs & Validation (Phase 6.11)

### What is a Controlled Input?
In vanilla HTML, form elements manage their own state internally inside the DOM:
```html
<!-- DOM manages this value directly -->
<input id="saree-name" type="text" />
```
In React, a **Controlled Input** delegates state management entirely to React:
```jsx
const [name, setName] = useState('')

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```
1. **`value={name}`**: The input displays what React state says. React is the single source of truth.
2. **`onChange={(e) => setName(e.target.value)}`**: Every keystroke fires an event that updates React state, triggering a re-render that displays the updated value.

### Why `event.preventDefault()` is Essential
When an HTML form is submitted (`<form onSubmit={handleSubmit}>`), the default browser action is to reload the page or navigate away.
Calling `event.preventDefault()` stops this reload:
```javascript
function handleSubmit(event) {
  event.preventDefault() // Keeps the user on the page!
  // Perform validation and state updates here
}
```

### Client-Side Validation Without Browser Alerts
Instead of disruptive `window.alert()` dialogs, React validates input state directly and stores error messages in component state:
```javascript
const newErrors = {}

if (!name.trim()) {
  newErrors.name = 'Please enter a saree name.'
}

if (!category || !supportedCategories.includes(category)) {
  newErrors.category = 'Please select a valid fabric category from the list.'
}

if (!price || isNaN(Number(price)) || Number(price) <= 0) {
  newErrors.price = 'Please enter a valid price greater than ₹0.'
}

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors)
  return // Halt submission
}
```
Errors are rendered accessibly with `role="alert"` and `aria-invalid="true"`.

### Adding New Products with Collision-Safe Unique IDs
To avoid ID collisions when adding or removing products, we use `crypto.randomUUID()`:
```javascript
function generateUniqueId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `saree-${crypto.randomUUID()}`
  }
  return `saree-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
```
The new item is added to React state using an immutable functional update:
```javascript
setProducts((prevProducts) => [...prevProducts, newSaree])
```

### Summary of Files in Phase 6.11

| File | Purpose |
| :--- | :--- |
| [`src/components/AddProductForm.jsx`](file:///d:/Abhi_Sareee/react-practice/src/components/AddProductForm.jsx) | Controlled form with name, category, and price inputs, inline validation, and accessible feedback alerts. |
| [`src/App.jsx`](file:///d:/Abhi_Sareee/react-practice/src/App.jsx) | Manages `supportedCategories`, `generateUniqueId()`, `handleAddProduct` catalogue updater, and renders the form. |
| [`src/App.css`](file:///d:/Abhi_Sareee/react-practice/src/App.css) | Ivory and gold form styles, input focus states, error pill styles, and responsive mobile layouts. |
| [`LEARNING_NOTES.md`](file:///d:/Abhi_Sareee/react-practice/LEARNING_NOTES.md) | Documentation of controlled forms, validation, and collision-safe unique IDs. |

---

## 8. React useReducer State Management (Phase 6.12)

### What is `useReducer`?
`useReducer` is a built-in React hook for managing complex state transitions:
```javascript
const [state, dispatch] = useReducer(reducer, initialState)
```
Instead of directly modifying state with multiple setter functions, you **dispatch actions** that describe what happened. The reducer function handles the state transition and returns the next state.

### `useState` versus `useReducer`

| Feature | `useState` | `useReducer` |
| :--- | :--- | :--- |
| **Best suited for** | Simple, independent values (e.g. `searchQuery`, `isOpen`, `selectedCategory`) | Complex state with multiple related actions (e.g. Shopping Cart, Multi-step forms) |
| **State updates** | `setState(newValue)` or `setState(prev => ...)` | `dispatch({ type: 'ACTION_TYPE', payload })` |
| **Business logic location** | Scattered across multiple component event handlers | Centralized inside a single pure reducer function |
| **Testability** | Tested through component rendering and user interaction | Reducer can be tested independently as a pure JavaScript function |

### The Reducer Function & Action Object
A reducer is a pure JavaScript function:
```javascript
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      // return new state
    default:
      return state
  }
}
```
- **`state`**: The current cart array `[]`.
- **`action`**: A plain object with a descriptive `type` string and optional `payload` data.
  Example: `{ type: 'ADD_TO_CART', payload: sareeProduct }` or `{ type: 'REMOVE_ITEM', payload: { id: 'saree-1' } }`.

### How Dispatching Actions Updates the Cart
1. A user clicks "Add to Cart" or "Remove".
2. The component calls `dispatch({ type: 'ADD_TO_CART', payload: product })`.
3. React invokes `cartReducer(currentCart, action)`.
4. The reducer executes the matching `switch` case and returns a brand-new array.
5. React compares references (`Object.is`), detects the change, and re-renders the component with the new cart.

### Why Reducers Must Not Mutate Existing State
React uses shallow reference comparison to know when to re-render.
- If you call `state.push(item)` or `item.quantity++`, the array reference in memory does not change. React thinks nothing happened and will **not** update the screen.
- By returning a new array (`[...state, newItem]` or `state.map(...)`), the reference changes and React updates the DOM predictably.

### How the Cart Total is Derived Using `reduce()`
Rather than storing a redundant `total` property in reducer state (which could fall out of sync), the total price and total item count are computed **during rendering**:
```javascript
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.numericPrice, 0)
```
This guarantees that totals are always 100% synchronized with the cart contents.

### Step-by-Step Walkthrough of `cartReducer.js`
1. **`ADD_TO_CART`**:
   - Checks if `action.payload.id` already exists in `state`.
   - If found: returns `state.map(...)` incrementing `quantity` by 1.
   - If new: returns `[...state, { ...product, quantity: 1 }]`.
2. **`INCREMENT`**:
   - Maps over cart, matching by `id`, and returns `{ ...item, quantity: item.quantity + 1 }`.
3. **`DECREMENT`**:
   - Maps over cart, decrementing `quantity - 1`.
   - Chains `.filter(item => item.quantity > 0)` to automatically drop items when quantity reaches 0.
4. **`REMOVE_ITEM`**:
   - Filters out the item matching `action.payload.id` regardless of its current quantity.
5. **`CLEAR_CART`**:
   - Returns an empty array `[]`.
6. **`default`**:
   - Returns current `state` unchanged for unhandled action types.

### Beginner Practice Questions & Answers

**Q1: Can a reducer perform an API call or `setTimeout`?**
*Answer:* **No.** A reducer must be a **pure function**. It must only calculate and return the next state based on `(state, action)`. Side effects like API calls or timers belong in `useEffect` or event handlers, never in a reducer.

**Q2: What happens if `action.type` does not match any `case` in the reducer?**
*Answer:* The `default` branch runs and returns the current `state` unchanged. This prevents crashes and ensures state integrity.

**Q3: When should you choose `useReducer` over `useState`?**
*Answer:* Choose `useReducer` when you have multiple related state transitions (like adding, incrementing, decrementing, and removing items), when next state depends on complex logic from previous state, or when you want to centralize and test business logic outside of UI components.

### Summary of Files in Phase 6.12

| File | Purpose |
| :--- | :--- |
| [`src/reducers/cartReducer.js`](file:///d:/Abhi_Sareee/react-practice/src/reducers/cartReducer.js) | Pure reducer function handling `ADD_TO_CART`, `INCREMENT`, `DECREMENT`, `REMOVE_ITEM`, and `CLEAR_CART` with immutable updates. |
| [`src/components/ReducerLearningSection.jsx`](file:///d:/Abhi_Sareee/react-practice/src/components/ReducerLearningSection.jsx) | Educational demonstration card explaining `useState` vs `useReducer`, `dispatch`, pure reducer functions, immutability, and action blueprints. |
| [`src/components/CartSummary.jsx`](file:///d:/Abhi_Sareee/react-practice/src/components/CartSummary.jsx) | Displays cart items, line totals, grand total computed with `reduce()`, and controls for increment, decrement, and dedicated item removal. |
| [`src/App.jsx`](file:///d:/Abhi_Sareee/react-practice/src/App.jsx) | Initializes `useReducer(cartReducer, initialCartState)`, dispatches cart actions, and renders `<ReducerLearningSection />`. |
| [`src/App.css`](file:///d:/Abhi_Sareee/react-practice/src/App.css) | Styles for `useReducer` learning cards, action code preview, and the cart remove button. |
| [`LEARNING_NOTES.md`](file:///d:/Abhi_Sareee/react-practice/LEARNING_NOTES.md) | Comprehensive reference guide for `useReducer`, action architecture, practice Q&A, and step-by-step walkthrough. |


