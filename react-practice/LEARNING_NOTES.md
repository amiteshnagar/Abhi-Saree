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

---

## 9. React Context API Fundamentals (Phase 6.13)

### What Context Solves: The Problem of Prop Drilling
In a hierarchical React application, data normally flows top-down via `props`. When a deeply nested component needs a value that originates several levels above it, every intermediate component along the way must accept that prop and pass it down:

```
Without Context (Prop Drilling):
App (holds theme state)
  └── Dashboard (doesn't care about theme, but must receive & pass theme prop)
        └── CardWrapper (doesn't care about theme, but must receive & pass theme prop)
              └── ThemeBadge (uses theme prop!)
```

This causes several issues:
1. **Component Coupling**: Intermediate components become tightly coupled to props they do not consume or care about.
2. **Refactoring Friction**: Renaming or reshaping a prop requires modifying every single intermediate component.
3. **Boilerplate**: Repetitive prop passing clutters JSX and increases the risk of omissions.

### How React Context Works: Direct Teleportation
React Context acts like a broadcast tower. A provider broadcasts values down its component subtree, and any descendant component can tap into that broadcast directly:

```
With React Context:
App (wraps subtree in <PracticeProvider>)
  └── IntermediateContainer (receives ZERO theme props!)
        └── NestedThemeBadge (calls usePracticeContext() directly!)
```

### The Three Core Building Blocks of React Context

#### 1. `createContext(defaultValue)`
Creates the Context object.
```javascript
const PracticeContext = createContext(undefined)
```
- We pass `undefined` as the default value to detect whether a component calls the context hook outside of its provider.

#### 2. `<Context.Provider value={...}>`
Wraps the component tree (or a specific subtree) and provides the current value to all descendant consumers:
```jsx
export function PracticeProvider({ children }) {
  const [theme, setTheme] = useState('classic')

  return (
    <PracticeContext.Provider value={{ theme, setTheme }}>
      {children}
    </PracticeContext.Provider>
  )
}
```
Whenever `theme` changes, every descendant component subscribed to this context re-renders with the latest value.

#### 3. `useContext(Context)` (or Custom Hook)
Reads the current context value from the nearest matching `<Context.Provider>` up the tree:
```javascript
const { theme, setTheme } = useContext(PracticeContext)
```

### Why Create a Custom Context Hook (`usePracticeContext`)?
Instead of exporting `PracticeContext` directly and having components import both `useContext` and the context object, we encapsulate access in a dedicated custom hook:
```javascript
export function usePracticeContext() {
  const context = useContext(PracticeContext)
  if (context === undefined) {
    throw new Error('usePracticeContext must be used within a <PracticeProvider>')
  }
  return context
}
```

**Key Benefits:**
1. **Fails Fast & Informatively**: If a developer forgets to wrap a component with `<PracticeProvider>`, instead of failing silently with an obscure `Cannot read property 'theme' of undefined`, it immediately throws a clear, actionable error.
2. **Cleaner Imports**: Consumers only import one hook (`usePracticeContext()`) rather than multiple tokens.
3. **Encapsulation**: The internal context object and default values remain hidden from consumer components.

### When to Use Context vs. When Ordinary Props are Simpler

| Criteria | Use React Context | Use Standard Props |
| :--- | :--- | :--- |
| **Scope** | Global or subtree-wide values (Themes, Auth user, Locale/Language). | Local, component-specific data (Card title, button text, image URL). |
| **Component Depth** | Passing data down 3+ levels through oblivious intermediaries. | Passing data to direct children or 1–2 levels down. |
| **Reusability** | Consumer components are expected to operate within the specific context. | Components need to be highly reusable in different parent contexts without assuming a provider. |
| **Frequency of Updates** | Low to moderate update frequency (theme changes, user sign-in/out). | High-frequency updates (keystrokes, animations, scroll coordinates). |

> [!TIP]
> **Rule of Thumb**: Start with standard props. If passing props through 3 or more intermediate components feels cumbersome and repetitive, consider Context. Never reach for Context prematurely for simple parent-to-child data flows.

### Beginner Practice Questions & Answers

**Q1: If a component is rendered outside of `<PracticeProvider>`, what does `useContext(PracticeContext)` return?**
*Answer:* It returns whatever default value was passed to `createContext(defaultValue)`. If `createContext(undefined)` was used, it returns `undefined`. Our custom hook `usePracticeContext()` checks for this and throws an informative error message.

**Q2: Does React Context replace `useState` or `useReducer`?**
*Answer:* **No.** Context is merely a **transport mechanism** (a broadcast vehicle). The state itself is still managed by `useState` or `useReducer` inside the Provider component. Context simply shares that state across the tree without prop drilling.

**Q3: Does changing a Context value re-render all components inside the Provider?**
*Answer:* Only components that actually call `useContext()` (or our custom hook) to subscribe to that context will re-render when the context value changes. Intermediate components that do not subscribe to the context will not re-render solely due to the context change.

### Summary of Files in Phase 6.13

| File | Purpose |
| :--- | :--- |
| [`src/context/PracticeContext.jsx`](file:///d:/Abhi_Sareee/react-practice/src/context/PracticeContext.jsx) | Declares `PracticeContext`, `PracticeProvider` managing theme state, and the custom `usePracticeContext()` hook with guard checks. |
| [`src/components/ContextDemo.jsx`](file:///d:/Abhi_Sareee/react-practice/src/components/ContextDemo.jsx) | Interactive demonstration with theme switcher buttons, zero-prop intermediate container, nested child badge, and educational cards. |
| [`src/App.jsx`](file:///d:/Abhi_Sareee/react-practice/src/App.jsx) | Imports `PracticeProvider` and `ContextDemo`, rendering the scoped provider beneath the reducer learning section. |
| [`src/App.css`](file:///d:/Abhi_Sareee/react-practice/src/App.css) | Styles for context badges, theme preview box variations (Classic vs Festive), zero-prop hierarchy container, and responsive mobile layouts. |
| [`LEARNING_NOTES.md`](file:///d:/Abhi_Sareee/react-practice/LEARNING_NOTES.md) | In-depth reference on prop drilling, context mechanics, custom hooks, context vs props criteria, and practice Q&A. |

---

## 10. React Custom Hooks (Phase 6.14)

### What is a Custom Hook?
A **custom hook** is a standard JavaScript function whose name starts with `"use"` and that can call other React hooks (like `useState`, `useEffect`, `useMemo`, `useRef`, `useReducer`, or `useContext`).

Custom hooks allow developers to extract stateful and lifecycle logic out of UI components into reusable, modular functions.

### Why Must Custom Hooks Begin with `use`?
1. **React Convention & Lint Enforcement**: The React compiler and ESLint/Oxlint rules use the `"use"` prefix to recognize that a function is a hook.
2. **Rules of Hooks Enforcement**: React verifies that hooks are only called at the top level of React functions, not inside loops, conditions, or event callbacks. Without the `"use"` prefix, React cannot automatically check if your code follows these rules.

### How Custom Hooks Reuse Logic Without Sharing State
A crucial concept for beginners:
> **Custom hooks share *stateful logic*, NOT the state itself.**

When two different components call the same custom hook:
```jsx
function SearchBoxA() {
  const results = useProductSearch(products, queryA) // isolated execution
}

function SearchBoxB() {
  const results = useProductSearch(products, queryB) // independent execution
}
```
Each component gets its own independent instance of the hook's internal state, effects, and memoized values. They do **not** share state unless the hook internally reads from a shared React Context.

### How `useProductSearch` Works
The `useProductSearch(products, searchQuery)` hook encapsulates search filtering:
```javascript
export function useProductSearch(products, searchQuery) {
  return useMemo(() => {
    if (!Array.isArray(products)) return []
    const normalizedQuery = (searchQuery || '').trim().toLowerCase()
    if (!normalizedQuery) return products

    return products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(normalizedQuery)
      const categoryMatch = product.category?.toLowerCase().includes(normalizedQuery)
      return Boolean(nameMatch || categoryMatch)
    })
  }, [products, searchQuery])
}
```
- **Inputs**: The product list array and user query string.
- **`useMemo` Optimization**: Caches the filtered array reference so it only recalculates when `products` or `searchQuery` changes, preventing wasteful filtering on unrelated re-renders.
- **Normalization**: Trims leading/trailing whitespace and normalizes to lowercase for reliable case-insensitive matching across both saree names and fabric categories.
- **Graceful Fallback**: Returns the full products array when the query is empty or whitespace-only.

### How `useDocumentTitle` Uses `useEffect`
The `useDocumentTitle(title, restoreOnUnmount)` hook manages the browser tab title:
```javascript
export function useDocumentTitle(title, restoreOnUnmount = true) {
  const originalTitleRef = useRef(typeof document !== 'undefined' ? document.title : '')

  // Title Update Effect
  useEffect(() => {
    if (typeof document !== 'undefined' && title) {
      document.title = title
    }
  }, [title])

  // Unmount Restoration Effect
  useEffect(() => {
    const originalTitle = originalTitleRef.current
    return () => {
      if (restoreOnUnmount && typeof document !== 'undefined' && originalTitle) {
        document.title = originalTitle
      }
    }
  }, [restoreOnUnmount])
}
```
- **Avoiding Stale Title Restoration**: In naive implementations, developers write `return () => { document.title = prevTitle }` inside the title updater effect. This causes React to restore the previous title *between every single render*, causing title flicker or stale values.
- **The Solution**: We separate the updater effect (runs whenever `title` changes) from the cleanup effect (runs strictly when the component unmounts).
- **Consolidation**: By replacing the raw inline `useEffect` in `App.jsx` with `useDocumentTitle`, we eliminate duplicate title effects.

### The Rules of Hooks & Common Mistakes
1. **Only Call Hooks at the Top Level**:
   - ❌ Never call hooks inside `if` statements, loops (`for`, `while`), or nested functions.
   - ✅ Always call hooks at the top level of your component or custom hook before any early returns.
   - *Why?* React relies on the exact call order of hooks across renders to match state with the correct hook index.
2. **Only Call Hooks from React Functions**:
   - ❌ Do not call hooks in regular utility functions (functions not named `use...`).
   - ✅ Call hooks from React functional components or other custom hooks.

### Beginner Practice Questions & Answers

**Q1: Can a custom hook return JSX?**
*Answer:* Yes, but typically hooks return data, state, or updater functions (like arrays or objects). If a hook returns JSX elements, it is often better designed as a regular React component.

**Q2: What is the difference between a custom hook and a regular helper function?**
*Answer:* A helper function only executes standard JavaScript logic (math, formatting, string manipulation). A custom hook can invoke React hooks (`useState`, `useEffect`, `useMemo`, `useRef`), tying into React's lifecycle and reactivity system.

**Q3: Does calling `useProductSearch` create a new copy of the products in memory?**
*Answer:* When the search query is empty, it returns the exact same `products` reference. When a query is present, `.filter()` creates a new array of references to the matching product objects without mutating the original products state.

### Summary of Files in Phase 6.14

| File | Purpose |
| :--- | :--- |
| [`src/hooks/useProductSearch.js`](file:///d:/Abhi_Sareee/react-practice/src/hooks/useProductSearch.js) | Custom hook encapsulating case-insensitive product search matching with `useMemo`. |
| [`src/hooks/useDocumentTitle.js`](file:///d:/Abhi_Sareee/react-practice/src/hooks/useDocumentTitle.js) | Reusable hook synchronizing browser window/tab title with React state, with clean unmount restoration. |
| [`src/App.jsx`](file:///d:/Abhi_Sareee/react-practice/src/App.jsx) | Integrated `useProductSearch` and `useDocumentTitle`, removing the duplicate title effect and consolidating multi-criteria filtering. |
| [`LEARNING_NOTES.md`](file:///d:/Abhi_Sareee/react-practice/LEARNING_NOTES.md) | Added Section 10 explaining custom hooks, Rules of Hooks, `useMemo` caching, lifecycle encapsulation, and practice Q&A. |
| [`README.md`](file:///d:/Abhi_Sareee/README.md) | Updated Phase 6.14 progress table, directory tree, and test verification guide. |




