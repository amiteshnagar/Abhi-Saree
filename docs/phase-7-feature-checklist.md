# Abhi Saree Collection — Phase 7: Feature Checklist & Migration Mapping

**Date:** October 15, 2026  
**Scope:** Direct mapping of verified live website features and observed placeholders to their future React components, state handlers, and verification test methods.

---

## 1. Feature Mapping & React Component Matrix

Every item below has been verified against the existing website source files (`index.html`, `css/style.css`, `js/script.js`, `logo/logo.png`) and categorized per the audit safeguards:
- `[Verified existing functionality]`
- `[Observed limitation or placeholder]`
- `[Proposed React implementation]`
- `[Unresolved question or blocker]`

| # | Existing Feature / Element | Source Location | Existing Implementation | Future React Component | State Strategy | Proposed Verification Test | Status Classification |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Brand Logo** | `index.html:26`, `logo/logo.png` | `<img>` tag, 60x60, circular border, antique-gold border | `<Header>` / `<Brand>` | Props (`logoSrc`, `altText`) | Visual snapshot & DOM check: `img.brand-logo` loads `logo.png` with correct dimensions. | `[Verified existing functionality]` |
| **2** | **Brand Title** | `index.html:27`, `css/style.css:108` | `h1.brand-name` (*Playfair Display*, deep maroon) | `<Header>` / `<Brand>` | Static JSX | Verify `<h1>` text content equals "Abhi Saree Collection" and heading font applies. | `[Verified existing functionality]` |
| **3** | **Mobile Menu Button** | `index.html:31-34`, `js/script.js:26-55` | `<button id="menu-toggle">`, `aria-expanded`, icon/text switch | `<MenuToggle>` | `isMenuOpen` state (`useState`) | Click test at <= 768px: toggles `aria-expanded="true/false"`, switches icon `☰` / `✕`, text "Menu" / "Close". | `[Verified existing functionality]` |
| **4** | **Mobile Nav Drawer** | `index.html:37-44`, `css/style.css:630` | `<nav id="primary-nav">`, `.is-open` class | `<Navigation>` | Controlled via `isOpen` prop | Viewport test at 375px: drawer hidden by default; revealed when `isMenuOpen === true`. | `[Verified existing functionality]` |
| **5** | **Navigation Auto-Close** | `js/script.js:56-62` | `navLinks.forEach(link => addEventListener('click'))` | `<Navigation>` | Calls `onClose()` prop | Click any nav link inside open mobile drawer: verify drawer closes automatically. | `[Verified existing functionality]` |
| **6** | **In-Page Smooth Anchors**| `index.html:39-42`, `css/style.css:45` | `href="#welcome"`, `#collections`, `#about`, `#contact` | `<Navigation>` | Browser anchor / `scroll-behavior: smooth` | Click each link: verify URL hash updates and page scrolls to matching landmark ID. | `[Verified existing functionality]` |
| **7** | **Welcome Banner** | `index.html:51-54`, `css/style.css:180` | `section#welcome`, `h2`, intro paragraph | `<WelcomeSection>` | Static JSX | Verify heading and introduction copy match original text exactly. | `[Verified existing functionality]` |
| **8** | **Boutique Status Check** | `index.html:56-59`, `js/script.js:13-21` | `button#test-interaction-btn`, `p#test-interaction-msg`, `aria-live="polite"` | `<StatusChecker>` | `statusText`, `isUpdated` (`useState`) | Click button: verify announcement text updates, `.updated` class adds deep maroon color. | `[Verified existing functionality]` |
| **9** | **Featured Showcase Header**| `index.html:64-68` | `h2#collections-heading`, subtitle, sample notice | `<FeaturedCollection>` | Static JSX | Verify `aria-labelledby="collections-heading"` and sample showcase disclaimer are present. | `[Verified existing functionality]` |
| **10**| **Category Filter Pills**| `index.html:71-76`, `js/script.js:283-301` | `.filter-controls`, 4 buttons: All, Silk, Cotton, Georgette | `<CategoryFilter>` | `selectedCategory` (`useState('all')`) | Click each button: verify `aria-pressed="true"`, `.active` class moves, matching sarees render. | `[Verified existing functionality]` |
| **11**| **Dynamic Product Cards**| `js/script.js:79-198` | 4 objects in `sampleProducts`, created via DOM APIs | `<ProductCard>` inside `<ProductGrid>` | Derived `filteredProducts` list | Verify 4 cards render on "All", 2 on "Silk", 1 on "Cotton", 1 on "Georgette". | `[Verified existing functionality]` |
| **12**| **INR Currency Formatter**| `js/script.js:127-131` | `Intl.NumberFormat('en-IN')` (e.g. ₹8,499, ₹11,999) | Utility helper `formatINR(price)` | Pure function | Verify prices display with `₹` symbol, thousands separator, and zero decimal places. | `[Verified existing functionality]` |
| **13**| **Category Highlights** | `index.html:88-123`, `css/style.css:465`| 4 cards: Sarees (active showcase link), Suits, Blouses, Other | `<CategoryHighlights>` | Static data array | Verify Sarees card links to `#collections`; remaining 3 cards display "Catalog In Preparation". | `[Verified existing functionality]` |
| **14**| **Customer Trust Cards** | `index.html:126-157`, `css/style.css:513`| 3 cards: Quality Promise, Reviews Placeholder, Service Commitment | `<CustomerTrust>` | Static data array | Verify Card 1 & 3 display brand commitments; Card 2 displays dashed placeholder style. | `[Verified existing functionality]` |
| **15**| **Footer Copyright** | `index.html:161-163`, `css/style.css:573`| `footer#contact`, `<p>&copy; 2026 Abhi Saree Collection` | `<Footer>` | Static JSX | Verify copyright string and ID `#contact` for anchor targeting. | `[Verified existing functionality]` |
| **16**| **Design System Tokens** | `css/style.css:21-30` | 5 CSS variables (`--color-warm-ivory`, etc.) | `src/index.css` | Global CSS root variables | Computed style test: verify `--color-warm-ivory` is `#FAF6F0`, `--color-deep-maroon` is `#6B1E2B`. | `[Verified existing functionality]` |
| **17**| **Responsive Breakpoints**| `css/style.css:589-768` | 5 media query tiers (992px, 768px, 580px, 480px, 360px-320px) | CSS stylesheets / CSS modules | Responsive CSS rules | Viewport audit at 1280px, 992px, 768px, 580px, 375px, 320px: zero horizontal overflow. | `[Verified existing functionality]` |
| **18**| **Non-Saree Catalog Data**| `index.html:103-121` | "Catalog In Preparation" placeholders | `<CategoryHighlights>` | Static placeholders | Awaiting boutique product photography and pricing for suits and blouses. | `[Observed limitation or placeholder]` |
| **19**| **Customer Reviews Slot** | `index.html:142-147` | Placeholder testimonial slot with dashed border | `<CustomerTrust>` | Static placeholder | Awaiting verified buyer testimonial quotes and customer names. | `[Observed limitation or placeholder]` |
| **20**| **Real Product Photos** | `js/script.js:87,97,107,117` | Inline SVG data URIs with vector icons | `<ProductCard>` | Product image assets | Products currently use sample vector SVGs; high-res camera assets not yet available. | `[Observed limitation or placeholder]` |
| **21**| **Contact Details Form/Info**| `index.html:161-163` | Footer only has copyright text; no contact form or phone | `<Footer>` | Static markup | No telephone, address, email, or contact form currently exists on the website. | `[Observed limitation or placeholder]` |
| **22**| **WhatsApp Order Button** | *None in codebase* | 0 occurrences in HTML/CSS/JS | `<WhatsAppOrderButton>` | Custom hook / URL generator | *Proposed*: Generate `https://wa.me/?text=...` link with prefilled saree name and price. | `[Proposed React implementation]` |
| **23**| **Product Search Bar** | *None in live site* | Practiced in `react-practice/` (Phase 6.7 & 6.14) | `<SearchBar>` | `useProductSearch(products, query)` | *Proposed*: Live search matching saree name and fabric type with clear button. | `[Proposed React implementation]` |
| **24**| **Product Detail Modal** | *None in live site* | Practiced in `react-practice/` (Phase 6.8) | `<ProductDetailModal>` | `selectedProduct` (`useState(null)`) | *Proposed*: Clicking card opens modal dialog with craft details, scroll lock, and Escape dismiss. | `[Proposed React implementation]` |
| **25**| **Inquiry Bag / Cart** | *None in live site* | Practiced in `react-practice/` (Phase 6.9 & 6.12) | `<CartDrawer>` | `useReducer(cartReducer)` | *Proposed*: Add sarees to bag, increment/decrement quantity, and compute `reduce()` total. | `[Proposed React implementation]` |

---

## 2. Unresolved Questions & Potential Blockers

The following items are unresolved architectural decisions that must be clarified prior to implementing Phase 8:

1. **Target Directory for React Production App**:
   - *Question:* Should the production React application replace the root directory (`/`), live in a dedicated new directory (e.g. `client/` or `app/`), or eventually replace `react-practice/`?
   - *Recommendation:* Keep `react-practice/` intact as the educational reference and create `app/` or `src/` for the real site to avoid mixing practice code with production code. `[Unresolved question or blocker]`
2. **WhatsApp Business Number Integration**:
   - *Question:* What official WhatsApp Business phone number and default greeting format should be used for the proposed WhatsApp order button?
   - *Status:* Pending client input. `[Unresolved question or blocker]`
3. **Product Photography Source Assets**:
   - *Question:* Should Phase 8 retain the lightweight SVG placeholders from Phase 5.3, or will real JPEG/WebP photography of Banarasi, Kanjeevaram, and Chanderi sarees be provided?
   - *Status:* SVG placeholders are fully functional and can be retained as default fallbacks. `[Unresolved question or blocker]`
4. **Scope of Initial Migration Phase**:
   - *Question:* Should Phase 8 be a 1:1 strict migration of the existing website first, with proposed features (WhatsApp, search, modal, cart) added in subsequent milestone phases?
   - *Recommendation:* Perform a 1:1 feature-parity migration first (Phase 8.1), verify full parity with the live site, then progressively layer enhancements (Phase 8.2+). `[Proposed React implementation]`
