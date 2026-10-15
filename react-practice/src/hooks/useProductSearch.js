// =============================================================================
// Abhi Saree Collection — React Practice App
// Phase 6.14: React Custom Hooks — useProductSearch
// =============================================================================

import { useMemo } from 'react'

/**
 * 🎓 WHAT IS A CUSTOM HOOK?
 * -------------------------
 * A custom hook is a JavaScript function whose name starts with "use"
 * (e.g., useProductSearch, useDocumentTitle) that can call other React hooks.
 *
 * Why extract logic into a custom hook?
 * 1. Reusability: The search filtering logic can be used in any other component
 *    without copy-pasting the matching algorithm.
 * 2. Separation of Concerns: Keeps App.jsx clean and focused on rendering layout.
 * 3. Independent State: Each component calling a custom hook gets its own
 *    isolated execution — hooks share logic, not state!
 *
 * 🎓 RULES OF HOOKS:
 * 1. Only call hooks at the TOP LEVEL (never inside loops, conditions, or nested functions).
 * 2. Only call hooks from React function components or other custom hooks.
 *
 * @param {Array} products - Array of saree product objects
 * @param {string} searchQuery - The user-entered search text
 * @returns {Array} - The list of products matching the search query
 */
export function useProductSearch(products, searchQuery) {
  // useMemo caches the search calculation so it only recalculates
  // when either `products` or `searchQuery` changes.
  return useMemo(() => {
    // Safety guard: Ensure products is a valid array
    if (!Array.isArray(products)) {
      return []
    }

    // Normalize query: trim whitespace and convert to lowercase for case-insensitive matching
    const normalizedQuery = (searchQuery || '').trim().toLowerCase()

    // If search box is empty or only whitespace, return all products unfiltered
    if (!normalizedQuery) {
      return products
    }

    // Match query against product name OR fabric category
    return products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(normalizedQuery)
      const categoryMatch = product.category?.toLowerCase().includes(normalizedQuery)
      return Boolean(nameMatch || categoryMatch)
    })
  }, [products, searchQuery])
}
