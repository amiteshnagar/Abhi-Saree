// =============================================================================
// WelcomeSection Component — Abhi Saree Collection (React Practice)
// Phase 6.2: React Components & JSX
// =============================================================================

// CONCEPT: Reusable UI with JSX
// WelcomeSection encapsulates the welcoming text and learning explanation.
// In JSX, we can return multiple HTML-like elements inside a parent container
// (here, a <section className="practice-welcome">).
function WelcomeSection() {
  return (
    <section className="practice-welcome">
      <p className="practice-subtitle">Welcome to my React learning app!</p>
      <p className="practice-note">
        This is a dedicated practice space for learning React components, JSX, and state.
      </p>
    </section>
  )
}

// Export WelcomeSection so App.jsx can import and combine it
export default WelcomeSection
