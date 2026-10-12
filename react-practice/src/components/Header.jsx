// =============================================================================
// Header Component — Abhi Saree Collection (React Practice)
// Phase 6.2: React Components & JSX
// =============================================================================

// CONCEPT: What is a Component?
// A React component is an independent, reusable JavaScript function that
// returns JSX (HTML-like markup). It describes a self-contained piece of UI.
// Notice the capitalized name: `Header`. React requires custom components to
// start with a capital letter so it can distinguish them from native HTML tags
// (like <header>, <h1>, <div>).
function Header() {
  return (
    <header className="practice-header">
      <h1 className="practice-title">Abhi Saree Collection</h1>
    </header>
  )
}

// CONCEPT: Exporting Components
// `export default Header` makes this component available for other files
// (like App.jsx) to import and render.
export default Header
