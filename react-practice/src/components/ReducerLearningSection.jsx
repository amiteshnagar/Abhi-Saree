// =============================================================================
// ReducerLearningSection Component — Abhi Saree Collection (React Practice)
// Phase 6.12: React useReducer Educational Demonstration
// =============================================================================

function ReducerLearningSection() {
  return (
    <section className="use-reducer-demo-section" aria-labelledby="reducer-heading">
      <div className="reducer-header-badge">React State Architecture</div>
      <h3 id="reducer-heading" className="use-reducer-title">
        React useReducer Learning
      </h3>
      <p className="use-reducer-subtext">
        Understanding predictable state transitions, action dispatching, and pure reducer functions.
      </p>

      <div className="reducer-cards-grid">
        {/* Card 1: useState vs useReducer */}
        <div className="reducer-card">
          <div className="reducer-card-title">
            <span className="reducer-icon" aria-hidden="true">⚖️</span>
            <strong>useState vs. useReducer</strong>
          </div>
          <p className="reducer-card-text">
            <strong>useState:</strong> Best for simple, independent values like toggles or text inputs (e.g. <code>searchQuery</code>).
          </p>
          <p className="reducer-card-text">
            <strong>useReducer:</strong> Best when state has complex transitions with several related actions (e.g. cart additions, quantity changes, item removal, and clearing).
          </p>
        </div>

        {/* Card 2: Dispatch and Reducer Mechanics */}
        <div className="reducer-card">
          <div className="reducer-card-title">
            <span className="reducer-icon" aria-hidden="true">🔄</span>
            <strong>dispatch(action) & reducer</strong>
          </div>
          <p className="reducer-card-text">
            <strong>dispatch(action):</strong> Sends a request to React describing <em>what happened</em> (e.g. <code>{`{ type: 'INCREMENT' }`}</code>).
          </p>
          <p className="reducer-card-text">
            <strong>reducer(state, action):</strong> A pure function that calculates and returns the <em>next state</em> without side effects.
          </p>
        </div>

        {/* Card 3: Why Immutability Matters */}
        <div className="reducer-card">
          <div className="reducer-card-title">
            <span className="reducer-icon" aria-hidden="true">🛡️</span>
            <strong>Why Immutability Matters</strong>
          </div>
          <p className="reducer-card-text">
            React relies on shallow reference equality (<code>Object.is</code>) to detect state changes.
          </p>
          <p className="reducer-card-text">
            Mutating an existing array (like <code>state.push()</code>) keeps the same memory reference, causing React to miss the update. Returning a new array triggers a clean re-render.
          </p>
        </div>
      </div>

      {/* Read-Only Action Blueprint Example */}
      <div className="action-example-box" data-testid="reducer-action-example">
        <h4 className="action-example-heading">Action Blueprint Example (Read-Only)</h4>
        <div className="action-code-preview">
          <code>
            {`// 1. Dispatching an action:\n`}
            {`dispatch({ type: 'ADD_TO_CART', payload: sareeProduct })\n\n`}
            {`// 2. Reducer handles the transition:\n`}
            {`case 'ADD_TO_CART':\n`}
            {`  return existing ? incrementQty(state) : [...state, { ...product, quantity: 1 }]`}
          </code>
        </div>
        <p className="action-example-caption">
          Actions act as clear intent messages, making complex state changes traceable and maintainable.
        </p>
      </div>
    </section>
  )
}

export default ReducerLearningSection
