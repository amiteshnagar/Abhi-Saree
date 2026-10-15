// =============================================================================
// Abhi Saree Collection — React Practice App
// Phase 6.14: React Custom Hooks — useDocumentTitle
// =============================================================================

import { useEffect, useRef } from 'react'

/**
 * 🎓 CUSTOM HOOK: useDocumentTitle
 * ---------------------------------
 * Synchronizes the browser window/tab title with React state.
 *
 * Why encapsulate this in a custom hook?
 * In web apps, multiple pages or components may need to set the document title
 * dynamically (e.g. "Cart (2 items)", "Silk Sarees", etc.).
 * Instead of repeating `useEffect(() => { document.title = ... }, [...])`
 * in every component, this hook provides a clean, single-line API:
 *   useDocumentTitle('My Page Title')
 *
 * 🎓 PREVENTING STALE TITLE RESTORATION DURING UPDATES:
 * A common beginner bug is returning `() => { document.title = previousTitle }`
 * from the title-updating effect. This causes React to run cleanup on every
 * render, temporarily resetting document.title to a stale value before the next
 * update applies!
 *
 * Solution:
 * 1. Capture the initial document.title once on mount using `useRef`.
 * 2. Update `document.title` cleanly whenever `title` changes (no intermediate restoration).
 * 3. Restore the original document title strictly when the component UNMOUNTS.
 *
 * @param {string} title - The title string to set on the document
 * @param {boolean} [restoreOnUnmount=true] - Whether to restore the original title on unmount
 */
export function useDocumentTitle(title, restoreOnUnmount = true) {
  // Capture the original document title before any updates occur
  const originalTitleRef = useRef(typeof document !== 'undefined' ? document.title : '')

  // 1. Title Update Effect: Runs whenever `title` changes
  useEffect(() => {
    if (typeof document !== 'undefined' && title) {
      document.title = title
    }
  }, [title])

  // 2. Unmount Restoration Effect: Restores the original title ONLY when unmounting
  useEffect(() => {
    const originalTitle = originalTitleRef.current

    return () => {
      if (restoreOnUnmount && typeof document !== 'undefined' && originalTitle) {
        document.title = originalTitle
      }
    }
  }, [restoreOnUnmount])
}
