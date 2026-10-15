# Abhi Saree Collection — Phase 7: React Migration Architecture Plan

**Date:** October 15, 2026  
**Scope:** Architectural blueprint for migrating the Abhi Saree Collection website from static HTML/CSS/JS to a production React application.

---

## 1. Migration Goals & Principles

1. **Pixel-Perfect Fidelity**: Replicate the exact visual layout, color palette (ivory, maroon, gold), typography (*Playfair Display*, *Poppins*), and responsive breakpoints established in `css/style.css`.
2. **Behavioral Parity**: Preserve all existing interactions (mobile drawer, boutique status announcement, dynamic category filtering, smooth in-page anchor navigation).
3. **Progressive Enhancement**: Architecture should naturally accommodate features practiced in `react-practice/` (search, product detail modal, shopping cart, WhatsApp order generation) without disrupting the core website layout.
4. **Zero Overhead**: Avoid external state libraries (Redux, Zustand) or UI component libraries (Bootstrap, Tailwind). The existing custom CSS system is already lightweight, fully responsive, and bespoke.

---

## 2. Proposed Component Architecture

The component hierarchy directly reflects the verified structure of the live website, decomposed into clean, single-responsibility React functional components:

```text
App (Root Component & Layout Orchestrator)
├── Header (Sticky Boutique Banner)
│   ├── Brand (Logo <img> + <h1> Title)
│   ├── MenuToggle (Mobile Hamburger Button)
│   └── Navigation (Primary Nav Links: Home, Collections, About, Contact)
├── main (Semantic Main Landmark)
│   ├── WelcomeSection (Greeting & Boutique Status Interaction)
│   │   └── StatusChecker (Interactive Status Button & Live Region)
│   ├── FeaturedCollection (Saree Showcase Section)
│   │   ├── SectionHeader (Title, Subtitle, Sample Disclaimer)
│   │   ├── CategoryFilter (All, Silk, Cotton, Georgette Buttons)
│   │   └── ProductGrid (Responsive Grid Layout)
│   │       └── ProductCard (Individual Saree Card with Price & Fabric)
│   ├── CategoryHighlights (Explore by Category Grid)
│   │   └── CategoryCard (Sarees, Suits, Blouses, Other Clothing)
│   └── CustomerTrust (Why Choose Abhi Saree Collection)
│       └── TrustCard (Quality Promise, Reviews Placeholder, Care Commitment)
└── Footer (Copyright & Anchor Target #contact)
```

### Component Responsibility & State Mapping

| Component | Classification | Props Received | State Strategy | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`App`** | `[Proposed React implementation]` | *None* | Top-level state orchestrator | Mounts layout, passes product data to `FeaturedCollection`, orchestrates global page settings. |
| **`Header`** | `[Proposed React implementation]` | *None* | `isMenuOpen` (`useState(false)`) | Renders brand lockup and manages mobile drawer toggling state. |
| **`Navigation`** | `[Proposed React implementation]` | `isOpen`, `onClose` | *None (controlled via props)* | Renders navigation anchor links; triggers `onClose` when any link is clicked on mobile. |
| **`WelcomeSection`** | `[Proposed React implementation]` | *None* | `statusText`, `isUpdated` (`useState`) | Renders welcome text; clicking button updates status message and applies `.updated` styling. |
| **`FeaturedCollection`**| `[Proposed React implementation]` | `products` | `selectedCategory` (`useState('all')`) | Holds the active category filter; derives `filteredProducts` using `Array.prototype.filter()`. |
| **`CategoryFilter`** | `[Proposed React implementation]` | `activeCategory`, `onSelectCategory` | *None (controlled via props)* | Renders 4 filter buttons; synchronizes visual active class and accessible `aria-pressed`. |
| **`ProductGrid`** | `[Proposed React implementation]` | `products` | *None (stateless list)* | Maps `products` array to `<ProductCard>` components using stable unique `key={product.id}`. |
| **`ProductCard`** | `[Proposed React implementation]` | `product`, `onSelect` *(future)* | *None (pure presentation)* | Formats INR currency using `Intl.NumberFormat`; renders image, category, name, description, and price. |
| **`CategoryHighlights`**| `[Proposed React implementation]` | *None* | *None (static data)* | Renders the 4 category exploration cards with preparation status tags. |
| **`CustomerTrust`** | `[Proposed React implementation]` | *None* | *None (static data)* | Renders the 3 customer trust commitment articles. |
| **`Footer`** | `[Proposed React implementation]` | *None* | *None (static markup)* | Semantic footer with copyright notice and `#contact` target. |

---

## 3. State Management & Hooks Strategy

### 3.1 Local State (`useState`)
- **`isMenuOpen` (Header)**: Boolean flag controlling the mobile navigation drawer.
- **`boutiqueStatus` (WelcomeSection)**: String and boolean flag tracking today's boutique consultation status.
- **`selectedCategory` (FeaturedCollection)**: String (`'all'`, `'silk'`, `'cotton'`, `'georgette'`) determining which sarees are rendered.

### 3.2 Derived State (No Redundant `useEffect`)
- **`filteredProducts`**: Calculated on-the-fly during render:
  ```javascript
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.fabricType === selectedCategory)
  ```
  *Lesson from Phase 6.6*: Direct render derivation is instant, synchronous, and never desynchronizes.

### 3.3 Custom Hooks (From Phase 6.14)
- **`useDocumentTitle(title)`**:
  - Dynamically synchronizes the tab title (e.g. `"Abhi Saree Collection — Silk Sarees"`).
  - Implements unmount restoration to prevent stale title bugs. `[Proposed React implementation]`
- **`useProductSearch(products, searchQuery)`**:
  - Ready for integration when search is introduced to the live site. `[Proposed React implementation]`

### 3.4 Context API & `useReducer` (Reserved for Future Phases)
- **`CartContext` / `CartReducer` (Phase 6.9 & 6.12)**:
  - If online inquiry bagging or cart ordering is migrated to the main site, `useReducer(cartReducer)` will manage cart state cleanly. `[Proposed React implementation]`
- **Theme / Consultation Context**:
  - Reserved if multi-page routing or boutique consultation booking is introduced. `[Proposed React implementation]`

---

## 4. Proposed Production Directory Structure

A clean, maintainable structure built with Vite, React, and JavaScript (no TypeScript):

```text
abhi-saree-react/
├── index.html                   # HTML mount point with SEO metadata
├── vite.config.js               # Fast Vite configuration
├── package.json                 # Standard React 19 dependencies
├── public/
│   └── favicon.ico
└── src/
    ├── main.jsx                 # Entry point: createRoot(document.getElementById('root'))
    ├── App.jsx                  # Main application orchestrator
    ├── App.css                  # Reusable styling adapted from style.css
    ├── index.css                # Base reset, typography, and CSS variables
    ├── assets/
    │   └── logo.png             # Official brand logo asset (preserved)
    ├── data/
    │   ├── products.js          # Master product array with INR pricing and descriptions
    │   └── categories.js        # Category definitions and placeholder data
    ├── hooks/
    │   ├── useDocumentTitle.js  # Document title synchronization hook
    │   └── useProductSearch.js  # Search matching hook
    └── components/
        ├── Header.jsx           # Site header and brand lockup
        ├── Navigation.jsx       # Responsive navigation list and drawer
        ├── WelcomeSection.jsx   # Welcome greeting and status interaction
        ├── FeaturedCollection.jsx # Saree showcase wrapper
        ├── CategoryFilter.jsx   # Fabric category filter pills
        ├── ProductGrid.jsx      # Product grid container
        ├── ProductCard.jsx      # Reusable individual saree card
        ├── CategoryHighlights.jsx # 4 category exploration cards
        ├── CustomerTrust.jsx    # Artisanal commitment and trust cards
        ├── Footer.jsx           # Copyright and contact anchor
        └── [Future Enhancements]
            ├── ProductDetailModal.jsx  # Detail modal (from Phase 6.8)
            └── WhatsAppOrderButton.jsx # WhatsApp ordering trigger
```

---

## 5. Phased Migration Sequence

To prevent regressions and ensure zero downtime, the migration should follow a strict step-by-step order:

1. **Step 1: Scaffolding & Asset Preparation**
   - Initialize Vite React project structure.
   - Copy brand CSS tokens (`--color-warm-ivory`, `--color-deep-maroon`, etc.) and Google Font imports into `index.css`.
   - Copy official `logo/logo.png` into assets.
2. **Step 2: Static Layout & Semantic Landmarks**
   - Build `Header`, `Navigation`, and `Footer`.
   - Verify smooth anchor jumping to `#welcome`, `#collections`, `#about`, `#contact`.
3. **Step 3: Interactive Header & Mobile Navigation**
   - Implement `isMenuOpen` state in `Header.jsx`.
   - Verify mobile drawer toggling and auto-close behavior across 320px–768px viewports.
4. **Step 4: Welcome Section & Boutique Status Interaction**
   - Build `WelcomeSection.jsx` with `aria-live="polite"` status button.
5. **Step 5: Data Separation & Product Showcase**
   - Extract `sampleProducts` into `src/data/products.js`.
   - Build `ProductCard.jsx`, `ProductGrid.jsx`, and `FeaturedCollection.jsx`.
   - Verify INR currency formatting with `Intl.NumberFormat`.
6. **Step 6: Dynamic Category Filtering**
   - Build `CategoryFilter.jsx` with `aria-pressed` synchronization.
   - Verify instant filtering for All, Silk, Cotton, and Georgette.
7. **Step 7: Category Highlights & Customer Trust Sections**
   - Build `CategoryHighlights.jsx` (preserving "Catalog In Preparation" statuses).
   - Build `CustomerTrust.jsx` (preserving verified review placeholder).
8. **Step 8: Automated Regression & Parity Verification**
   - Run lint, production build, and headless browser CDP test suite matching all original DOM elements.

---

## 6. Testing & Quality Assurance Strategy

| Test Layer | Tool / Scope | Pass Criteria |
| :--- | :--- | :--- |
| **Static Analysis** | `oxlint` | 0 warnings, 0 errors across all JSX/JS files. |
| **Bundle Build** | `vite build` | Clean production build completed in < 1000ms with zero chunking warnings. |
| **Visual Parity** | Headless Chrome CDP screenshots | Side-by-side comparison with original website across 1280px, 768px, and 375px. |
| **Functional Parity**| Automated CDP test script | 100% pass on mobile menu, boutique status, category filters, and smooth anchor links. |
| **Accessibility (a11y)**| Axe / DOM ARIA checks | Valid `aria-expanded`, `aria-pressed`, `aria-live`, `role="group"`, and focus rings. |
| **Mobile Responsiveness**| Emulated 320px–375px viewports | Zero horizontal overflow (`scrollWidth <= clientWidth`). |
