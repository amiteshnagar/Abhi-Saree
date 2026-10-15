# Phase 8.1: Strict 1:1 React Parity Checklist

This checklist tracks complete feature, design, content, and behavioural parity between the original HTML/CSS/JavaScript website and the React 19 application in `Abhi_Sareee/app/`.

---

## 1. Document & Metadata Parity

- [x] **Page Title**: `<title>Abhi Saree Collection</title>` matches identically.
- [x] **Character Encoding**: `<meta charset="UTF-8">` preserved.
- [x] **Responsive Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` preserved.
- [x] **Meta Description**: `"Abhi Saree Collection - Discover authentic, elegant, and timeless sarees for weddings, celebrations, and everyday grace."` matches identically.
- [x] **Favicon**: Official logo favicon linked at `/logo/logo.png`.

---

## 2. Header & Brand Lockup

- [x] **Semantic Container**: `<header className="site-header">` with inner `.header-container` max-width `1100px`.
- [x] **Brand Logo**:
  - [x] Source: `/logo/logo.png` (verified identical SHA-256 hash).
  - [x] Dimensions: 60x60 attribute (styled to 56x56 circular container).
  - [x] Border radius: 50% with `1px solid var(--color-antique-gold)`.
  - [x] Alt text: `"Abhi Saree Collection Logo"`.
- [x] **Brand Heading**:
  - [x] Element: `<h1>` with `.brand-name`.
  - [x] Text: `"Abhi Saree Collection"`.
  - [x] Typography: *Playfair Display*, 700 weight, deep maroon color (`#6B1E2B`).

---

## 3. Navigation & Mobile Drawer

- [x] **Semantic Element**: `<nav className="main-nav" id="primary-nav" aria-label="Main Navigation">`.
- [x] **Navigation Links**:
  - [x] `"Home"` -> `#welcome`
  - [x] `"Collections"` -> `#collections`
  - [x] `"About Us"` -> `#about`
  - [x] `"Contact"` -> `#contact`
- [x] **Mobile Menu Toggle**:
  - [x] Element: `<button type="button" id="menu-toggle" className="menu-toggle">`.
  - [x] Hidden on desktop screens (> 768px).
  - [x] Accessible attributes: `aria-controls="primary-nav"`, `aria-label="Toggle navigation menu"`.
  - [x] Dynamic `aria-expanded`: reflects `isMenuOpen` state (`"false"` when closed, `"true"` when open).
  - [x] Toggle Icon: `☰` when closed, `×` when open.
  - [x] Toggle Text: `"Menu"` when closed, `"Close"` when open.
- [x] **Mobile Drawer Behavior**:
  - [x] Displays full-width slide/accordion under header on screens <= 768px when `.is-open` is active.
  - [x] Clicking any nav link automatically dismisses the mobile menu drawer.

---

## 4. Welcome Section & Interactive Test

- [x] **Container**: `<section id="welcome" className="welcome-section">`.
- [x] **Heading**: `<h2>Welcome to Abhi Saree Collection</h2>`.
- [x] **Introductory Copy**: `"Explore our exquisite range of handcrafted sarees, traditional weaves, and contemporary designs for every special occasion."`.
- [x] **Interactive Status Checker**:
  - [x] Button: `id="test-interaction-btn"` with class `.test-btn`, label `"Check Boutique Status"`.
  - [x] Announcement element: `id="test-interaction-msg"`, class `.test-msg`, `aria-live="polite"`.
  - [x] Initial state: `"Click the button above to check today's boutique status."`.
  - [x] Active state: `"✨ Welcome to Abhi Saree Collection! Our boutique is open today for festive inquiries and personal consultations."`.
  - [x] Active styling: Gains `.updated` class with maroon background (`#6B1E2B`), white text, and gold border.

---

## 5. Featured Saree Collection & Category Filtering

- [x] **Container**: `<section id="collections" className="featured-section" aria-labelledby="collections-heading">`.
- [x] **Section Header**:
  - [x] Title: `<h2>` with id `collections-heading` and class `.section-title` ("Featured Saree Collection").
  - [x] Subtitle: `"A curated preview of our finest handloom weaves, celebratory silks, and lightweight party wear."`.
  - [x] Sample Notice: `<em>* Sample showcase: items and reference prices are displayed for design demonstration.</em>`.
- [x] **Category Filter Controls**:
  - [x] Role & Label: `role="group" aria-label="Filter products by fabric category"`.
  - [x] All Button: `data-filter="all"`, text `"All"`.
  - [x] Silk Button: `data-filter="silk"`, text `"Silk"`.
  - [x] Cotton Button: `data-filter="cotton"`, text `"Cotton"`.
  - [x] Georgette Button: `data-filter="georgette"`, text `"Georgette"`.
  - [x] Active class: Applied dynamically to the selected filter button.
  - [x] `aria-pressed`: Accurately reflects `"true"` for active button and `"false"` for inactive buttons.
- [x] **Dynamic Filtering Behaviour**:
  - [x] "All" displays all 4 sample sarees.
  - [x] "Silk" displays Banarasi Silk & Kanjeevaram Silk (2 sarees).
  - [x] "Cotton" displays Chanderi Cotton-Silk (1 saree).
  - [x] "Georgette" displays Georgette Zari (1 saree).
  - [x] Empty state notice rendered if no items match (`"No products found in this category at the moment."`).

---

## 6. Product Grid & Saree Cards

- [x] **Grid Container**: `<div className="product-grid" id="product-grid">`.
- [x] **Card Container**: `<article className="product-card">`.
- [x] **Card Content & Anatomy**:
  - [x] SVG Preview Image: 400x450 width/height, inline SVG data URI matching `js/script.js`.
  - [x] Category Tag: `<span className="product-category">`.
  - [x] Saree Title: `<h3 className="product-name">`.
  - [x] Description: `<p className="product-desc">`.
  - [x] Price Formatting: `Intl.NumberFormat('en-IN')` producing `₹8,499`, `₹11,999`, `₹4,250`, `₹6,800`.
  - [x] Sample Reference Tag: `<span className="sample-tag">Sample Reference</span>`.
- [x] **Stable React Keys**: Uses unique `product.id` as key.

---

## 7. Category Highlights Section

- [x] **Container**: `<section id="categories" className="categories-section" aria-labelledby="categories-heading">`.
- [x] **Section Header**: Title `"Explore by Category"`, subtitle `"Discover our complete boutique offerings curated for timeless elegance."`.
- [x] **Category Cards (4)**:
  - [x] **Sarees**: Links to `#collections`, title `"Sarees"`, status `"Featured Showcase ↑"` (`.active-status`).
  - [x] **Suits**: Links to `#categories`, title `"Suits"`, status `"Catalog In Preparation"`.
  - [x] **Blouses**: Links to `#categories`, title `"Blouses"`, status `"Catalog In Preparation"`.
  - [x] **Other Clothing**: Links to `#categories`, title `"Other Clothing"`, status `"Catalog In Preparation"`.

---

## 8. Customer Trust & About Section

- [x] **Container**: `<section id="about" className="trust-section" aria-labelledby="trust-heading">`.
- [x] **Section Header**: Title `"Why Choose Abhi Saree Collection"`, subtitle `"Our commitment to artisanal craftsmanship, authentic zari, and dedicated customer care."`.
- [x] **Trust Cards (3)**:
  - [x] **Quality Promise**: Title `"Handpicked Authenticity"`, quote text, footer `"Boutique Standard • Verified Handloom"`.
  - [x] **Customer Trust Placeholder**: Class `.placeholder-trust` (dashed gold border), badge `"Customer Trust Placeholder"`, title `"Verified Buyer Reviews"`, sample slot explanation, footer `"Sample Placeholder • Real Reviews Coming Soon"`.
  - [x] **Service Commitment**: Title `"Care & Delivery"`, quote text, footer `"Customer Care • Nationwide Support"`.

---

## 9. Footer Section

- [x] **Semantic Element**: `<footer id="contact">`.
- [x] **Anchor Target**: Acts as target for `#contact` navigation link.
- [x] **Copyright Copy**: `<p>&copy; 2026 Abhi Saree Collection. All rights reserved.</p>`.

---

## 10. Responsive Design & Visual Polish

- [x] **Design Tokens**: Warm Ivory (`#FAF6F0`), Deep Maroon (`#6B1E2B`), Antique Gold (`#C9A15C`), Warm Charcoal (`#2B2523`).
- [x] **Typography**: *Playfair Display* for headings, *Poppins* for body copy and UI controls.
- [x] **Zero Horizontal Overflow**: Verified on viewports `320px`, `360px`, `375px`, `390px`, `430px`, `768px`, `992px`, `1024px`, `1280px`, `1440px`.

---

## 11. Strict Boundary Guardrails

- [x] **No Search Bar**: Verified absent.
- [x] **No Product Detail Modal**: Verified absent.
- [x] **No Shopping Cart**: Verified absent.
- [x] **No WhatsApp Button**: Verified absent.
- [x] **Zero Modifications to Original Website Files**: `index.html`, `css/style.css`, `js/script.js`, `logo/logo.png` untouched.
- [x] **Zero Modifications to React Practice App**: `react-practice/` directory preserved.
