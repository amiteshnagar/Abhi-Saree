// =============================================================================
// Abhi Saree Collection — Product Data & Currency Formatter
// Phase 8.1: Strict 1:1 Parity with js/script.js
// =============================================================================

export const sampleProducts = [
    {
        id: 'sample-saree-1',
        name: 'Royal Crimson Banarasi Saree',
        price: 8499, // Numeric sample price in INR
        category: 'Banarasi Silk',
        fabricType: 'silk', // Category filter identifier
        description: 'Pure katan silk with intricate golden zari floral jaal and grand pallu.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpath d='M200 135 C175 160 175 205 200 230 C225 205 225 160 200 135 Z' fill='%236B1E2B'/%3E%3Ccircle cx='200' cy='182' r='10' fill='%23C9A15C'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EBanarasi Silk%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Royal Crimson Banarasi Silk Saree preview placeholder'
    },
    {
        id: 'sample-saree-2',
        name: 'Golden Temple Border Saree',
        price: 11999, // Numeric sample price in INR
        category: 'Kanjeevaram Silk',
        fabricType: 'silk', // Category filter identifier
        description: 'Heirloom mulberry silk with authentic temple motifs and rich zari border.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpolygon points='200,135 225,185 200,205 175,185' fill='%23C9A15C'/%3E%3Cpolygon points='200,155 215,185 200,225 185,185' fill='%236B1E2B'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EKanjeevaram Silk%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Golden Temple Weave Kanjeevaram Saree preview placeholder'
    },
    {
        id: 'sample-saree-3',
        name: 'Blush Ivory Handwoven Saree',
        price: 4250, // Numeric sample price in INR
        category: 'Chanderi Cotton-Silk',
        fabricType: 'cotton', // Category filter identifier
        description: 'Breathable festive weave highlighted with delicate gold zari butis.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Ccircle cx='200' cy='180' r='24' fill='%236B1E2B'/%3E%3Ccircle cx='200' cy='180' r='12' fill='%23FAF6F0'/%3E%3Ccircle cx='200' cy='180' r='4' fill='%23C9A15C'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EChanderi Cotton%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Blush Ivory Handwoven Chanderi Saree preview placeholder'
    },
    {
        id: 'sample-saree-4',
        name: 'Midnight Maroon Embellished Saree',
        price: 6800, // Numeric sample price in INR
        category: 'Georgette Zari',
        fabricType: 'georgette', // Category filter identifier
        description: 'Lightweight drape accented with scalloped borders and shimmering sequins.',
        imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='450' viewBox='0 0 400 450'%3E%3Crect width='100%25' height='100%25' fill='%23FAF6F0'/%3E%3Crect x='16' y='16' width='368' height='418' fill='none' stroke='%23C9A15C' stroke-width='1.5' stroke-dasharray='4 3' rx='6'/%3E%3Ccircle cx='200' cy='180' r='60' fill='%236B1E2B' fill-opacity='0.12'/%3E%3Cpath d='M170 170 Q200 140 230 170 T230 200 T170 200 Z' fill='%236B1E2B'/%3E%3Cpath d='M180 160 Q200 180 220 160' stroke='%23C9A15C' stroke-width='3' fill='none'/%3E%3Ctext x='200' y='280' font-family='serif' font-size='18' font-weight='600' fill='%236B1E2B' text-anchor='middle'%3EGeorgette Zari%3C/text%3E%3Ctext x='200' y='305' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='1.5' fill='%23C9A15C' text-anchor='middle'%3ESAMPLE PRODUCT PREVIEW%3C/text%3E%3C/svg%3E",
        imageAlt: 'Sample Midnight Maroon Embellished Georgette Saree preview placeholder'
    }
];

export const inrCurrencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});
