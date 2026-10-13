// =============================================================================
// Abhi Saree Collection — React Practice App
// Phase 6.13: React Context API — ContextDemo Component
// =============================================================================

import { usePracticeContext } from '../context/PracticeContext.jsx'

/**
 * 🎓 NESTED CHILD COMPONENT (Demonstrates Zero Prop Drilling)
 * ----------------------------------------------------------
 * Notice that this component receives ZERO props from its parent!
 * It does NOT need `props.theme` passed down to it.
 * Instead, it reaches directly into the shared React Context using `usePracticeContext()`.
 */
function NestedThemeBadge() {
  const { theme } = usePracticeContext()

  const isClassic = theme === 'classic'
  const themeLabel = isClassic ? 'Classic Royal Maroon & Ivory' : 'Festive Antique Gold & Ruby'

  return (
    <div
      className={`nested-theme-badge theme-${theme}`}
      data-testid="nested-theme-badge"
    >
      <div className="nested-badge-header">
        <span className="nested-badge-icon">{isClassic ? '🏛️' : '✨'}</span>
        <strong className="nested-badge-title">Nested Child Component</strong>
      </div>
      <p className="nested-badge-text">
        I received <strong>0 props</strong> from my parent! Yet my active theme is:{' '}
        <span className="nested-theme-value" data-testid="nested-theme-value">
          {themeLabel} ({theme})
        </span>
      </p>
    </div>
  )
}

/**
 * 🎓 INTERMEDIATE COMPONENT (The "Bridge" Component)
 * -------------------------------------------------
 * In typical apps with prop drilling, this intermediate component would be
 * forced to accept `props.theme` and `props.setTheme` just to pass them along.
 *
 * Notice: This component takes NO PROPS whatsoever. It acts as an oblivious
 * wrapper, proving that React Context bypasses intermediate component layers!
 */
function IntermediateContainer() {
  return (
    <div className="intermediate-container" data-testid="intermediate-container">
      <div className="intermediate-label">
        <span className="intermediate-chip">Intermediate Layer (Zero Props Passed)</span>
        <p className="intermediate-explanation">
          This container does not receive <code>theme</code> or <code>setTheme</code> props.
          It simply renders its child, which teleports its data directly from the Context Provider!
        </p>
      </div>

      {/* Renders the nested child without passing any theme props */}
      <NestedThemeBadge />
    </div>
  )
}

/**
 * ContextDemo Component
 * ----------------------
 * Interactive demonstration of React Context API for Phase 6.13.
 * Renders theme toggle controls, preview card, the zero-prop intermediate
 * hierarchy, and beginner educational comparison cards.
 */
function ContextDemo() {
  const { theme, setTheme } = usePracticeContext()

  const isClassic = theme === 'classic'
  const isFestive = theme === 'festive'

  return (
    <section
      className="context-demo-section"
      data-testid="context-demo-section"
      aria-labelledby="context-heading"
    >
      <div className="context-header">
        <div className="context-title-wrapper">
          <span className="context-badge">React Context API</span>
          <h2 id="context-heading" className="context-title">
            Display Theme Context (No Prop Drilling)
          </h2>
        </div>
        <p className="context-intro">
          Learn how React Context eliminates prop drilling by broadcasting shared state to any descendant component.
        </p>
      </div>

      {/* Live Interactive Controls */}
      <div className={`theme-preview-box theme-${theme}`} data-testid="theme-preview-box">
        <div className="theme-status-row">
          <span className="theme-status-label">Current Active Theme:</span>
          <span
            className="current-theme-display"
            data-testid="current-theme-display"
          >
            {isClassic ? '🏛️ Classic Maroon & Ivory' : '✨ Festive Gold & Ruby'}
          </span>
        </div>

        <div
          className="theme-switcher-group"
          role="group"
          aria-label="Select display theme via React Context"
        >
          <button
            type="button"
            className={`theme-btn ${isClassic ? 'active' : ''}`}
            data-testid="theme-btn-classic"
            aria-pressed={isClassic}
            aria-label="Switch to Classic Maroon & Ivory theme"
            onClick={() => setTheme('classic')}
          >
            🏛️ Classic Maroon &amp; Ivory
          </button>

          <button
            type="button"
            className={`theme-btn ${isFestive ? 'active' : ''}`}
            data-testid="theme-btn-festive"
            aria-pressed={isFestive}
            aria-label="Switch to Festive Gold & Ruby theme"
            onClick={() => setTheme('festive')}
          >
            ✨ Festive Gold &amp; Ruby
          </button>
        </div>

        {/* Live Hierarchy Demonstrating Zero Prop Drilling */}
        <div className="hierarchy-demo-wrapper">
          <h3 className="hierarchy-heading">Live Zero-Prop Drilling Demonstration:</h3>
          <IntermediateContainer />
        </div>
      </div>

      {/* Educational Concept Cards */}
      <div className="context-learning-grid">
        <div className="context-card">
          <div className="context-card-icon">🕳️</div>
          <h3 className="context-card-title">1. The Problem: Prop Drilling</h3>
          <p className="context-card-text">
            When state resides in a top ancestor, passing it down 3+ levels through
            intermediate components that don&rsquo;t use the data clutters props and creates tight coupling.
          </p>
        </div>

        <div className="context-card">
          <div className="context-card-icon">📡</div>
          <h3 className="context-card-title">2. The Solution: React Context</h3>
          <p className="context-card-text">
            A <code>&lt;Provider value=&#123;...&#125;&gt;</code> broadcasts state down the subtree. Any descendant
            calls <code>useContext()</code> to tap directly into that broadcasted value anywhere in the tree.
          </p>
        </div>

        <div className="context-card">
          <div className="context-card-icon">⚖️</div>
          <h3 className="context-card-title">3. When to Use Context</h3>
          <p className="context-card-text">
            Great for <strong>global or subtree-wide</strong> data (themes, auth state, locale).
            Avoid for high-frequency or local component state where standard props are clearer and more performant.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContextDemo
