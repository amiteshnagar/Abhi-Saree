// =============================================================================
// Abhi Saree Collection — React Practice App
// Phase 6.13: React Context API — PracticeContext
// =============================================================================
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react'

/**
 * 🎓 WHAT IS REACT CONTEXT?
 * -------------------------
 * In standard React, data is passed from parent to child through props.
 * However, if a deeply nested component needs a piece of state, you normally
 * have to pass that prop through every intermediate component in between — even
 * if those intermediate components don't care about that data at all!
 *
 * This tedious problem is called "PROP DRILLING".
 *
 * React Context provides a way to share values (like themes, user auth, or
 * language preferences) across the component tree WITHOUT passing props
 * manually at every single level.
 *
 * 🎓 THE 3 CORE STEPS OF CONTEXT:
 * 1. createContext(): Creates the Context object that holds our shared data blueprint.
 * 2. <Context.Provider value={...}>: Wraps a subtree and provides the current value.
 * 3. useContext(Context): Any child inside the Provider can read the value directly!
 */

// Step 1: Create the Context object
// We pass `undefined` as the initial default value. If a component attempts to
// call `usePracticeContext()` outside of a <PracticeProvider>, we can detect it
// and throw a helpful error message instead of failing silently.
const PracticeContext = createContext(undefined)

/**
 * PracticeProvider Component
 * -------------------------
 * This component manages the state (in our case, the selected display theme:
 * 'classic' vs 'festive') and wraps its children inside `PracticeContext.Provider`.
 *
 * Any child, grandchild, or deeply nested descendant rendered inside this provider
 * can read or update the theme using the custom hook `usePracticeContext()`.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components that will have access to this context
 */
export function PracticeProvider({ children }) {
  // Theme state: 'classic' (Ivory & Royal Maroon) or 'festive' (Antique Gold & Crimson)
  const [theme, setTheme] = useState('classic')

  // The context value object bundled together.
  // Descendants can read `theme` and call `setTheme('classic')` or `setTheme('festive')`.
  const value = {
    theme,
    setTheme,
  }

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  )
}

/**
 * 🎓 WHY USE A CUSTOM CONTEXT HOOK?
 * ---------------------------------
 * Instead of forcing consumer components to import both `useContext` and `PracticeContext`
 * directly, we export a custom wrapper hook: `usePracticeContext()`.
 *
 * Benefits:
 * 1. Clean imports: Consumers only need `import { usePracticeContext } from '../context/PracticeContext'`
 * 2. Safety guard: If someone renders a consumer outside `<PracticeProvider>`,
 *    `context` will be `undefined`. Throwing an immediate, clear error saves hours
 *    of debugging!
 * 3. Encapsulation: The exact Context object remains internal to this module.
 */
export function usePracticeContext() {
  const context = useContext(PracticeContext)

  // Guard check: Detect usage outside of PracticeProvider
  if (context === undefined) {
    throw new Error(
      'usePracticeContext must be used within a <PracticeProvider>. ' +
      'Please ensure your component is wrapped by <PracticeProvider> in the component tree.'
    )
  }

  return context
}
