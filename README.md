# Abhi Saree Collection — Website Project

Welcome to the **Abhi Saree Collection** website codebase! This project is being built step-by-step from scratch using clean, standard web technologies.

---

## Project Status & Progress Report

| Phase | Milestone | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Phase 1** | HTML Foundation | **Approved** | Core semantic structure established. |
| **Phase 2** | CSS Foundation | **Complete** | Brand color tokens, typography, box model reset, layout structure, and responsive mobile rules implemented and verified. |
| **Phase 3** | Header, Navigation & Logo Integration | **Complete** | Semantic header, official `logo.png` integration, semantic `<nav>`, accessible hover/focus states, and tested responsive layouts across 1440px, 768px, 375px, and 320px. |
| **Phase 4** | Product Showcase & UI | **Complete** | 4 sample saree cards with INR pricing, fabric categories, neutral boutique SVG placeholders, category highlights grid, customer trust section, and full responsive multi-device verification. |
| **Phase 5.1** | First JavaScript Interaction | **Complete** | DOM selection via `querySelector()`, `addEventListener('click')`, safe text update, and verified with zero console errors. |
| **Phase 5.2** | Responsive Mobile Navigation | **Complete** | Accessible `#menu-toggle` button, `aria-expanded` and `aria-controls` synchronization, class toggling (`.is-open`), auto-closing upon link selection, keyboard support, and zero horizontal overflow across 320px, 375px, 768px, and 1440px. |
| **Phase 5.3** | Dynamic Product Cards | **Complete** | Sample product data array, `Intl.NumberFormat` INR currency formatting, safe DOM generation (`createElement`, `textContent`), loop rendering (`forEach`), duplicate clearing, and verified with zero console errors. |
| **Phase 5.4** | Product Category Filtering | **Complete** | Accessible category filter buttons (All, Silk, Cotton, Georgette), `Array.prototype.filter()` immutable filtering, `aria-pressed` and `.active` state synchronization, zero card duplication on rapid switching, and multi-device verification (320px, 375px, 768px, 1440px). |
| **Phase 6.1** | First React App (Vite) | **Complete** | Standalone `react-practice/` project initialized with Vite + React (JSX), warm ivory & deep maroon styling, single `App.jsx` component with `useState` and `onClick`, verified in browser with 0 console errors. Root website preserved 100% intact. |
| **Phase 6.2** | React Components & JSX | **Complete** | Decomposed `App.jsx` into modular `Header.jsx` and `WelcomeSection.jsx` child components, demonstrated JSX composition, component capitalization conventions, ES module `import`/`export`, and preserved `useState` button interaction with 0 console errors. |
| **Phase 6.3** | React Props & Reusability | **Complete** | Created reusable `ProductCard.jsx` accepting `name`, `category`, and `price` props, rendered two distinct sample saree cards from `App.jsx`, verified responsive card layout and interactive `useState` button with 0 console errors. Root website preserved 100% intact. |
| **Phase 6.4** | Rendering Lists with map() | **Complete** | Rendered 3 sample saree cards from a data array using `.map()` and stable `key={product.id}`, verified props passing, verified 0 React key warnings, 0 console errors, and preserved `useState` button interaction. Root website preserved 100% intact. |
| **Phase 6.5** | Dynamic React State (useState) | **Complete** | Managed product list in React state with `useState(initialProducts)`, implemented functional state update `setProducts(prev => [...prev, newSaree])` via "Add Sample Saree" button, guaranteed unique sequential IDs (`saree-4`, `saree-5`), verified independent "Click Me" button, 0 React key warnings, and 0 console errors. Root website preserved 100% intact. |
| **Phase 6.6** | React Category Filtering & Derived State | **Complete** | Added `selectedCategory` state (`useState('All')`), calculated `filteredProducts` on-the-fly with `Array.prototype.filter()`, accessible filter buttons (All, Silk, Cotton, Georgette) with `aria-pressed` synchronization, graceful empty-state handling, seamless participation of newly added items in filtering, and 22/22 browser tests passed with 0 console errors. |
| **Phase 6.7** | React Product Search & Combined Multi-Criteria Filtering | **Complete** | Added `searchQuery` state (`useState('')`), real-time controlled search input, case-insensitive matching across name and category, combined multi-criteria filtering with category pills, accessible clear-search button, dynamic empty-state notices, lint (oxlint 0 errors) & build verified, and 27/27 browser CDP tests passed with 0 console errors. |
| **Phase 6.8** | Product Detail Modal & Dialog Accessibility | **Complete** | Created modular `ProductDetailModal.jsx`, `selectedProduct` state in `App.jsx`, accessible "View Details" buttons and card click triggers, backdrop click dismissal with `stopPropagation`, Escape key listener, body scroll locking via `useEffect`, full compatibility with search/filter/addition, oxlint (0 errors) & vite build verified, and 26/26 browser CDP tests passed with 0 console errors. |
| **Phase 6.9** | React Shopping Cart Fundamentals & reduce() | **Complete** | Added "Add to Cart" action to cards, cart state in `App.jsx`, modular `CartSummary.jsx`, immutable addition & quantity updates (+ / −), auto-removal at zero quantity, line & grand totals computed with `Array.prototype.reduce()`, empty-cart notice, Clear Cart button, lint (oxlint 0 errors) & build verified, and 33/33 browser CDP tests passed with 0 console errors. |
| **Phase 6.10** | React useEffect & Lifecycle Fundamentals | **Complete** | Added `LifecycleDemo.jsx` demonstrating mount (`[]`), dependency updates (`[actionCount]`), verifiable `clearInterval` timer cleanup on pause/unmount, derived live product count banner calculated directly in render, single `document.title` effect with cleanup restoring previous title, oxlint (0 errors) & vite build verified, and 36/36 browser CDP tests passed with 0 console errors. |
| **Phase 6.11+** | Catalog Expansion & Architecture | *Pending* | Saree sorting (by price/name), checkout flow simulation, and full boutique migration. |

---

## Project Structure

```text
Abhi_Sareee/
├── index.html          # Main webpage structure (header, responsive nav, welcome, filter controls, dynamic product grid, categories, trust, footer)
├── css/                # Stylesheets for main website
│   └── style.css       # Plain CSS stylesheet (tokens, layout, filter pills, card grids, responsive breakpoints, mobile menu)
├── js/                 # Client-side scripts for main website
│   └── script.js       # Plain JavaScript file (status interaction, mobile nav drawer, dynamic product cards, category filtering)
├── logo/               # Original brand assets
│   └── logo.png        # Existing brand logo (preserved intact)
├── react-practice/     # (Phase 6) Standalone React learning workspace
│   ├── index.html      # React mount HTML (<div id="root">)
│   ├── vite.config.js  # Vite build configuration (port 5173 / 5174)
│   ├── package.json    # React dependencies & scripts (npm run dev)
│   └── src/
│       ├── main.jsx    # React DOM entry point (createRoot)
│       ├── App.jsx     # Parent orchestrator component (composes Header + WelcomeSection + ProductCards + useState)
│       ├── App.css     # Practice card ivory & maroon styling + responsive product cards grid
│       ├── index.css   # Font imports & base root layout
│       └── components/ # (Phase 6.2, 6.3, 6.8, 6.9 & 6.10) Reusable child components
│           ├── Header.jsx              # Modular header component (brand title)
│           ├── WelcomeSection.jsx      # Modular welcome component (greeting & learning note)
│           ├── LifecycleDemo.jsx       # (Phase 6.10) Mount, dependency, and timer cleanup demonstration
│           ├── ProductCard.jsx         # (Phase 6.3) Reusable card (props, modal select, add to cart)
│           ├── ProductDetailModal.jsx  # (Phase 6.8) Accessible modal with backdrop blur & scroll locking
│           └── CartSummary.jsx         # (Phase 6.9) Cart summary, quantity controls, reduce() totals
│   └── LEARNING_NOTES.md # (Phase 6.10) Guide for useEffect, lifecycles, and anti-patterns
└── README.md           # Project guide and progress documentation
```

---

## Brand Design System Tokens

- **Warm Ivory (`#FAF6F0`)**: Page background and soft neutral canvas.
- **Deep Maroon (`#6B1E2B`)**: Primary brand color for headings, buttons, and signature typography.
- **Antique Gold (`#C9A15C`)**: Accent borders and boutique framing.
- **Warm Charcoal (`#2B2523`)**: Body text for comfortable, high-contrast reading.
- **Headings Font**: *Playfair Display* (with serif fallbacks).
- **Body Font**: *Poppins* (with system sans-serif fallbacks).

---

## How to View and Test in a Browser

1. In VS Code, locate [index.html](file:///d:/Abhi_Sareee/index.html) in the file explorer on the left.
2. Right-click on `index.html` and choose **"Open with Live Server"** or **"Reveal in File Explorer"**.
3. **Category Filtering Test**: Scroll to the **"Featured Saree Collection"** section.
   - Click **"Silk"**: Only the 2 silk sarees (Royal Crimson Banarasi and Golden Temple Kanjeevaram) are shown.
   - Click **"Cotton"**: Only the 1 cotton saree (Blush Ivory Chanderi) is shown.
   - Click **"Georgette"**: Only the 1 georgette saree (Midnight Maroon) is shown.
   - Click **"All"**: Restores all 4 sarees immediately.
   - Notice the active pill styling (`#6B1E2B` background with white text) and `aria-pressed="true"`.
4. **Mobile Navigation Test**: Resize your browser window to mobile width or use DevTools (`F12`). Click the **"☰ Menu"** button to open the mobile drawer, and click any navigation link to verify smooth scrolling and auto-closing.
5. In the Welcome section, click **"Check Boutique Status"** to verify that the Phase 5.1 interaction remains active.

---

## How to View and Test the React Practice App (Phase 6)

1. Open a terminal in VS Code and change directory into `react-practice`:
   ```bash
   cd react-practice
   npm run dev
   ```
2. Open the URL shown in the terminal (e.g. `http://localhost:5174/`).
3. **Category Filtering Test**:
   - Click **"Silk"**: Only the 2 silk sarees (Royal Crimson Banarasi & Golden Temple Border) are shown.
   - Click **"Cotton"**: Only the 1 cotton saree (Blush Ivory Handwoven) is shown.
   - Click **"Georgette"**: Shows an informative empty-state notice explaining that no sarees currently match this category.
   - Click **"Add Sample Saree"**: Appends the *Midnight Maroon Embellished Saree* (`Georgette Zari`) to the underlying `products` state. Notice how it immediately populates the Georgette view and dismisses the empty-state notice!
4. **Product Search & Combined Multi-Criteria Filtering (Phase 6.7)**:
   - **Search by Name**: Type `"Crimson"` into the search box. The catalog immediately filters to *Royal Crimson Banarasi Saree*.
   - **Case-Insensitive Match**: Type `"CRIMSON"` or `"cRiMsOn"` to verify case-insensitivity.
   - **Search by Fabric**: Type `"Cotton"` to find *Blush Ivory Handwoven Saree*.
   - **Combined Category + Search**: Select the **"Silk"** category pill, then type `"Temple"`. Only the *Golden Temple Border Saree* is shown.
   - **Clear Search**: Click the accessible **"✕"** button on the right of the search box to immediately clear the query and restore category results.
   - **No Results (Empty State)**: Type `"Velvet"` to see the friendly empty-state notice explaining that no sarees match the query.
   - **Add & Search Dynamic Saree**: Click **"Add Sample Saree"** (adds *Midnight Maroon Embellished Saree*), then type `"Midnight"` or `"Georgette"` to verify that dynamically added items participate in search instantly.
5. **Product Detail Modal Test (Phase 6.8)**:
   - Click **"View Details"** or anywhere on any saree card.
   - Verify the modal appears with the saree's name, category, illustrative price, craft description, and brand styling.
   - Verify page scrolling is locked (`overflow: hidden`) while the modal is open.
   - **Close Button Test**: Click the **"✕"** button or the **"Close Details"** button to close the modal.
   - **Escape Key Test**: Open a modal and press the **Escape** key on your keyboard to dismiss it.
   - **Backdrop Click Test**: Open a modal and click outside on the darkened backdrop to dismiss it. Verify that clicking inside the modal content does not dismiss it.
   - **Dynamic Saree Modal**: Click "Add Sample Saree" and inspect the newly added saree to confirm dynamic modal population.
6. **Shopping Cart Fundamentals Test (Phase 6.9)**:
   - **Add to Cart**: Click **"Add to Cart"** on any saree card. Notice the empty-cart notice disappears and the cart summary displays the item with quantity `1` and line total.
   - **Increment Existing Item**: Click **"Add to Cart"** on the same saree again. Notice that no duplicate row is created—the quantity increments to `2` and the line total doubles.
   - **Add Multiple Different Sarees**: Click **"Add to Cart"** on a different saree. Notice a second row appears, the cart badge updates, and the sample grand total recalculates via `reduce()`.
   - **Quantity Controls (`+` and `−`)**: Click `+` to increase quantity. Click `−` to decrease quantity.
   - **Automatic Removal at Zero**: Decrease quantity to `0` by clicking `−`. The item is immediately removed from the cart!
   - **Clear Cart**: Click **"Clear Cart"** to reset the cart back to the friendly empty-state notice.
7. **React useEffect & Lifecycle Fundamentals Test (Phase 6.10)**:
   - **Mount Effect (`[]`)**: Observe Card 1 in the Lifecycle Demo. The mount timestamp is recorded once on initial render and never changes.
   - **Dependency Effect (`[actionCount]`)**: Click **"Trigger Dependency Effect (+1)"**. The dependency log updates immediately with the incremented count and timestamp.
   - **Verifiable Cleanup (`clearInterval`)**: Observe the timer seconds ticking every 1s. Click **"Pause Timer"**: status switches to `⏸️ Paused (cleared)` and background ticks halt immediately. Click **"Resume Timer"**: ticks resume cleanly. Click **"Reset"**: seconds return to `0s`.
   - **Live Product Count Banner**: Notice the banner reads `Showing 3 of 3 sarees`. Filter by category (`Silk`, `Cotton`, `Georgette`) or search by query (`Crimson`): notice the count updates instantaneously because it is derived directly during render without redundant effects. Click **"Add Sample Saree"** to see total count increment to `4 sarees`.
   - **Single Document Title Synchronization**: Observe the browser tab title: changes from `Abhi Saree Collection (3 Sarees)` to `Abhi Saree Collection (1 in cart)` when adding items to the cart, with cleanup restoring the prior title on unmount.
8. **Independent Interaction Test**: Click **"Click Me"** to verify that the original greeting status updates independently without affecting the filtered saree catalog or cart.
9. Open Browser DevTools (`F12`) to verify zero console errors and zero React key warnings.
