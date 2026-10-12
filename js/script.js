// =============================================================================
// Abhi Saree Collection — Main JavaScript File
// Phase 5: Incremental JavaScript Interactivity
//   - Phase 5.1: First Test Interaction (Boutique Status)
//   - Phase 5.2: Responsive Accessible Mobile Navigation
//   - Phase 5.3: Dynamic Product Showcase Cards
//   - Phase 5.4: Product Category Filtering (Array.prototype.filter)
// =============================================================================

// =============================================================================
// PHASE 5.1: BOUTIQUE STATUS TEST INTERACTION
// =============================================================================
const statusButton = document.querySelector('#test-interaction-btn');
const statusMessage = document.querySelector('#test-interaction-msg');

if (statusButton && statusMessage) {
    statusButton.addEventListener('click', function () {
        statusMessage.textContent = '✨ Welcome to Abhi Saree Collection! Our boutique is open today for festive inquiries and personal consultations.';
        statusMessage.classList.add('updated');
    });
}

// =============================================================================
// PHASE 5.2: RESPONSIVE ACCESSIBLE MOBILE NAVIGATION
// =============================================================================
const menuToggle = document.querySelector('#menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && primaryNav) {
    function setMenuState(isOpen) {
        if (isOpen) {
            primaryNav.classList.add('is-open');
        } else {
            primaryNav.classList.remove('is-open');
        }

        menuToggle.setAttribute('aria-expanded', String(isOpen));

        const toggleIcon = menuToggle.querySelector('.menu-toggle-icon');
        const toggleText = menuToggle.querySelector('.menu-toggle-text');

        if (toggleIcon) {
            toggleIcon.innerHTML = isOpen ? '&times;' : '&#9776;';
        }
        if (toggleText) {
            toggleText.textContent = isOpen ? 'Close' : 'Menu';
        }
    }

    menuToggle.addEventListener('click', function () {
        const currentlyOpen = primaryNav.classList.contains('is-open');
        setMenuState(!currentlyOpen);
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (primaryNav.classList.contains('is-open')) {
                setMenuState(false);
            }
        });
    });
}

// =============================================================================
// PHASE 5.3: DYNAMIC PRODUCT SHOWCASE (ARRAYS, OBJECTS, LOOPS & DOM CREATION)
// =============================================================================

// -----------------------------------------------------------------------------
// CONCEPT 1: What is an Array and an Object?
// -----------------------------------------------------------------------------
// - An Object (in curly braces `{}`) stores related properties of a single entity,
//   such as a saree's name, price, and category.
// - An Array (in square brackets `[]`) is an ordered list of multiple items.
// Here we define an array of four demonstration product objects.
//
// NOTE: These are sample demonstration products and reference prices for UI design.
// They do not represent real transactional shop stock.
const sampleProducts = [
    {
        id: 'sample-saree-1',
        name: 'Royal Crimson Banarasi Saree',
        price: 8499, // Numeric sample price in INR
        category: 'Banarasi Silk',
        fabricType: 'silk', // Category filter identifier (Phase 5.4)
        description: 'Pure katan silk with intricate golden zari floral jaal and grand pallu.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpath d='M200 135 C175 160 175 205 200 230 C225 205 225 160 200 135 Z' fill='%236B1E2B'/%3E%3Ccircle cx='200' cy='182' r='10' fill='%23C9A15C'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EBanarasi Silk%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Royal Crimson Banarasi Silk Saree preview placeholder'
    },
    {
        id: 'sample-saree-2',
        name: 'Golden Temple Border Saree',
        price: 11999, // Numeric sample price in INR
        category: 'Kanjeevaram Silk',
        fabricType: 'silk', // Category filter identifier (Phase 5.4)
        description: 'Heirloom mulberry silk with authentic temple motifs and rich zari border.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpolygon points='200,135 225,185 200,205 175,185' fill='%23C9A15C'/%3E%3Cpolygon points='200,155 215,185 200,225 185,185' fill='%236B1E2B'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EKanjeevaram Silk%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Golden Temple Weave Kanjeevaram Saree preview placeholder'
    },
    {
        id: 'sample-saree-3',
        name: 'Blush Ivory Handwoven Saree',
        price: 4250, // Numeric sample price in INR
        category: 'Chanderi Cotton-Silk',
        fabricType: 'cotton', // Category filter identifier (Phase 5.4)
        description: 'Breathable festive weave highlighted with delicate gold zari butis.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Ccircle cx='200' cy='180' r='24' fill='%236B1E2B'/%3E%3Ccircle cx='200' cy='180' r='12' fill='%23FAF6F0'/%3E%3Ccircle cx='200' cy='180' r='4' fill='%23C9A15C'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EChanderi Cotton%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Blush Ivory Handwoven Chanderi Saree preview placeholder'
    },
    {
        id: 'sample-saree-4',
        name: 'Midnight Maroon Embellished Saree',
        price: 6800, // Numeric sample price in INR
        category: 'Georgette Zari',
        fabricType: 'georgette', // Category filter identifier (Phase 5.4)
        description: 'Lightweight drape accented with scalloped borders and shimmering sequins.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpath d='M170 170 Q200 140 230 170 T230 200 T170 200 Z' fill='%236B1E2B'/%3E%3Cpath d='M180 160 Q200 180 220 160' stroke='%23C9A15C' stroke-width='3' fill='none'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EGeorgette Zari%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Midnight Maroon Embellished Georgette Saree preview placeholder'
    }
];

// -----------------------------------------------------------------------------
// CONCEPT 2: Currency Formatting with Intl.NumberFormat
// -----------------------------------------------------------------------------
// Intl.NumberFormat provides standard locale-aware currency formatting.
// 'en-IN' formats numbers according to Indian numbering standards (e.g. ₹8,499).
const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});

// -----------------------------------------------------------------------------
// CONCEPT 3: Safe DOM Creation via document.createElement() & textContent
// -----------------------------------------------------------------------------
// Instead of building HTML strings with innerHTML (which risks Cross-Site Scripting
// and syntax errors), we create real DOM elements directly in memory using:
//   - document.createElement('tagName')
//   - element.className = 'css-class'
//   - element.textContent = 'safe text string'
//   - parentElement.appendChild(childElement)
function createProductCard(product) {
    // 1. Root container <article class="product-card">
    const card = document.createElement('article');
    card.className = 'product-card';

    // 2. Product image <img class="product-image" ...>
    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = product.imageSrc;
    img.alt = product.imageAlt;
    img.width = 400;
    img.height = 450;
    card.appendChild(img);

    // 3. Content wrapper <div class="product-content">
    const content = document.createElement('div');
    content.className = 'product-content';

    // 4. Fabric / Category tag <span class="product-category">
    const categorySpan = document.createElement('span');
    categorySpan.className = 'product-category';
    categorySpan.textContent = product.category;
    content.appendChild(categorySpan);

    // 5. Product title <h3 class="product-name">
    const titleH3 = document.createElement('h3');
    titleH3.className = 'product-name';
    titleH3.textContent = product.name;
    content.appendChild(titleH3);

    // 6. Product description <p class="product-desc">
    const descP = document.createElement('p');
    descP.className = 'product-desc';
    descP.textContent = product.description;
    content.appendChild(descP);

    // 7. Metadata footer container <div class="product-meta">
    const metaDiv = document.createElement('div');
    metaDiv.className = 'product-meta';

    // 8. Formatted Price <span class="product-price">
    const priceSpan = document.createElement('span');
    priceSpan.className = 'product-price';
    priceSpan.textContent = inrCurrencyFormatter.format(product.price);
    metaDiv.appendChild(priceSpan);

    // 9. Sample badge <span class="sample-tag">
    const sampleTag = document.createElement('span');
    sampleTag.className = 'sample-tag';
    sampleTag.textContent = 'Sample Reference';
    metaDiv.appendChild(sampleTag);

    content.appendChild(metaDiv);
    card.appendChild(content);

    return card;
}

// -----------------------------------------------------------------------------
// CONCEPT 4: Loops & Rendering to the DOM
// -----------------------------------------------------------------------------
// A loop takes each object in our sampleProducts array and runs a function for it.
// Here, array.forEach() calls createProductCard() for each saree, then appends
// the resulting <article> element to the #product-grid container.
function renderProductShowcase(products, containerElement) {
    if (!containerElement) return;

    // RULE 10: Clear the container first to avoid duplicate cards
    while (containerElement.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
    }

    if (products.length === 0) {
        const emptyNotice = document.createElement('p');
        emptyNotice.className = 'sample-notice';
        emptyNotice.textContent = 'No products found in this category at the moment.';
        containerElement.appendChild(emptyNotice);
        return;
    }

    // Loop through each product and attach its card
    products.forEach(function (product) {
        const cardElement = createProductCard(product);
        containerElement.appendChild(cardElement);
    });
}

// -----------------------------------------------------------------------------
// STEP 5: Initial Showcase Render
// -----------------------------------------------------------------------------
const productGrid = document.querySelector('#product-grid');
if (productGrid) {
    renderProductShowcase(sampleProducts, productGrid);
}

// =============================================================================
// PHASE 5.4: PRODUCT CATEGORY FILTERING (ARRAY.PROTOTYPE.FILTER & STATE SYNC)
// =============================================================================

// -----------------------------------------------------------------------------
// CONCEPT 1: What is Array.prototype.filter()?
// -----------------------------------------------------------------------------
// - filter() is a standard JavaScript array method.
// - It loops through every item in an array and runs a "test" function on each item.
// - If the test function returns `true`, that item is kept in a brand-new array.
// - If it returns `false`, that item is excluded.
// - Crucially, filter() never alters the original array (this is called immutability).
//   Our master `sampleProducts` list remains safe and untouched!
function filterProductsByCategory(products, selectedCategory) {
    // If "all" is selected, return the entire product array
    if (selectedCategory === 'all') {
        return products;
    }

    // Otherwise, filter items matching the chosen fabricType
    return products.filter(function (product) {
        return product.fabricType === selectedCategory;
    });
}

// -----------------------------------------------------------------------------
// CONCEPT 2: Synchronizing Visual (.active) and Accessible (aria-pressed) State
// -----------------------------------------------------------------------------
// Screen readers rely on `aria-pressed="true"` to announce which toggle button
// is currently active. Sighted users rely on the visual `.active` class.
// This function keeps both in sync across all filter buttons.
function setActiveFilterButton(buttons, activeBtn) {
    buttons.forEach(function (button) {
        const isCurrent = (button === activeBtn);
        button.setAttribute('aria-pressed', String(isCurrent));
        if (isCurrent) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// -----------------------------------------------------------------------------
// CONCEPT 3: Hooking Event Listeners to Category Filter Buttons
// -----------------------------------------------------------------------------
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0 && productGrid) {
    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Read the category value from data-filter (e.g., 'all', 'silk', 'cotton', 'georgette')
            const selectedCategory = button.getAttribute('data-filter');

            // 1. Update visual styling and accessible state across buttons
            setActiveFilterButton(filterButtons, button);

            // 2. Filter our demonstration products array without mutating it
            const filteredProducts = filterProductsByCategory(sampleProducts, selectedCategory);

            // 3. Re-render the cards into the grid (container is cleared first)
            renderProductShowcase(filteredProducts, productGrid);
        });
    });
}
