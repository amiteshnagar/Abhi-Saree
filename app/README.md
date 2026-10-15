# Abhi Saree Collection — Production React Application

A modern, production-grade React application replicating and extending the **Abhi Saree Collection** boutique website.

## Tech Stack & Architecture

- **React 19.2.8**: Functional components with JSX and `StrictMode`.
- **Vite 8.3.4**: Lightning-fast build tool and development server (port `5175`).
- **Oxlint 1.81.0**: Fast JavaScript and JSX static analysis.
- **Pure CSS**: Modular tokens adapted directly from the boutique's original design system.

---

## Features & State Management

### 1. Parity Features (Phase 8.1)
- **Header & Mobile Navigation**:
  - Circular brand logo with verified bit-for-bit cryptographic fidelity.
  - Hamburger menu drawer (`#menu-toggle`) with accessible `aria-expanded` and auto-close on link navigation.
- **Welcome & Interactive Status Checker**:
  - Boutique status inquiry (`#test-interaction-btn`) with `aria-live="polite"` live announcements.
- **Featured Saree Collection**:
  - Curated handloom showcases with fabric category filters: `All`, `Silk`, `Cotton`, `Georgette`.
  - Accessible `aria-pressed` synchronization.
  - Indian numbering standard currency formatting (`Intl.NumberFormat('en-IN')`).
- **Explore by Category & Trust Pillars**:
  - 4 boutique categories and 3 customer trust guarantee cards.

### 2. Product Search & Combined Filtering (Phase 8.2.1)
- **Search Query State**: Managed centrally via `useState('')` in `FeaturedCollection.jsx`.
- **Derived Filtering Without Redundant State**:
  Filtered products are computed synchronously during rendering:
  ```javascript
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = sampleProducts.filter((product) => {
      const matchesCategory =
          selectedCategory === 'all' || product.fabricType === selectedCategory;
      const matchesSearch =
          !trimmedQuery ||
          product.name.toLowerCase().includes(trimmedQuery) ||
          product.category.toLowerCase().includes(trimmedQuery);
      return matchesCategory && matchesSearch;
  });
  ```
  - Eliminates state duplication and avoids error-prone `useEffect` synchronizations.
  - Case-insensitive matching across product `name` and `category` fields.
  - Trims surrounding whitespace automatically.
- **Combined Filtering**:
  - Users can filter by fabric category (e.g., Silk) and simultaneously search by keyword (e.g., Temple).
  - Clearing the search preserves the currently active category filter.
- **Accessibility & Focus Management**:
  - Explicit `<label htmlFor="saree-search-input">` providing accessible naming without duplicate attributes.
  - Clear search buttons (`✕` in search box and `Clear Search` in empty state) return keyboard focus to the search input via `useRef`.
  - Result counts announced via `role="status"` and `aria-live="polite"`.
  - Native WebKit search cancel decorations are suppressed to ensure single, accessible clear controls.

---

## Directory Structure

```text
app/
├── index.html                   # HTML mount point with exact SEO metadata and viewport
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Dev server configuration (port 5175)
├── .gitignore                   # Ignore build artifacts and dependencies
├── public/
│   └── logo/
│       └── logo.png             # Bit-for-bit copy of root logo
├── src/
│   ├── main.jsx                 # StrictMode createRoot entry point
│   ├── App.jsx                  # Main site layout and menu state orchestrator
│   ├── App.css                  # Parity & feature stylesheets
│   ├── index.css                # Global variables, fonts, reset
│   ├── data/
│   │   └── products.js          # Master product array & currency formatter
│   └── components/
│       ├── Header.jsx           # Brand lockup & mobile menu button
│       ├── Navigation.jsx       # Semantic nav list with auto-closing links
│       ├── WelcomeSection.jsx   # Welcome copy and boutique status checker
│       ├── FeaturedCollection.jsx # Featured showcase & search/filter orchestration
│       ├── ProductSearch.jsx    # Controlled search input with clear & live count
│       ├── CategoryFilter.jsx   # Fabric category filter pills
│       ├── ProductGrid.jsx      # Product cards container & contextual empty state
│       ├── ProductCard.jsx      # Saree card with INR formatting & SVG placeholder
│       ├── CategoryHighlights.jsx # 4 category cards
│       ├── CustomerTrust.jsx    # 3 trust cards
│       └── Footer.jsx           # Copyright & contact anchor target
└── docs/
    ├── phase-8-1-implementation-report.md
    ├── phase-8-1-parity-checklist.md
    ├── phase-8-1-visual-comparison.md
    └── phase-8-2-1-search-report.md
```

---

## Development & Verification Commands

```bash
# Run development server (runs on http://localhost:5175/)
npm run dev

# Run static analysis linter (Oxlint)
npm run lint

# Build production bundle
npm run build
```
