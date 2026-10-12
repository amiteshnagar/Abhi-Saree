// =============================================================================
// LifecycleDemo Component — Abhi Saree Collection (React Practice)
// Phase 6.10: React useEffect Fundamentals, Lifecycles & Verifiable Cleanup
// =============================================================================

import { useState, useEffect } from 'react'

// =============================================================================
// 🎓 BEGINNER'S GUIDE TO useEffect:
//
// 1. WHAT DOES useEffect DO?
//    In React, components render UI (HTML elements). But often we need to do
//    something outside the rendering process, such as:
//    - Subscribing to an external event listener
//    - Setting a timer (setInterval, setTimeout)
//    - Synchronizing the document title or logging analytics
//    These non-UI operations are called "SIDE EFFECTS".
//    `useEffect` tells React: "Run this piece of code AFTER you finish rendering
//    and updating the DOM."
//
// 2. WHY DO EFFECTS RUN AFTER RENDERING?
//    React's priority is getting the visual UI onto the screen smoothly.
//    If side effects ran during rendering, they would slow down the user interface
//    or even cause glitches. Running them after rendering ensures a responsive UI.
//
// 3. THE THREE DEPENDENCY ARRAY SCENARIOS:
//    a) useEffect(() => { ... })
//       -> NO dependency array: runs after EVERY single render (mount + all updates).
//    b) useEffect(() => { ... }, [])
//       -> EMPTY array: runs ONCE on initial mount (when component first appears).
//    c) useEffect(() => { ... }, [valueA, valueB])
//       -> WITH dependencies: runs on mount AND whenever valueA or valueB changes.
//
// 4. WHY CLEANUP MATTERS:
//    When an effect creates a persistent resource (like an interval timer),
//    returning a cleanup function `return () => { clearInterval(...) }`
//    ensures the old timer is destroyed before a new one starts or when the
//    component unmounts. Without cleanup, timers leak into memory and tick forever!
//
// 5. WHAT NOT TO PUT IN useEffect:
//    Do NOT use useEffect to compute derived values from state or props!
//    For example, `const count = items.length` should be calculated directly
//    in the component body during render, not copied into a state with useEffect.
// =============================================================================

function LifecycleDemo() {
  // ---------------------------------------------------------------------------
  // STATE HOOKS FOR DEMONSTRATION
  // ---------------------------------------------------------------------------
  // 1. Mount timestamp (set once on mount)
  const [mountedTime, setMountedTime] = useState('')

  // 2. Interactive action counter to demonstrate dependency triggering
  const [actionCount, setActionCount] = useState(0)
  const [dependencyLog, setDependencyLog] = useState('')

  // 3. Verifiable session timer with start/pause/reset controls
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(true)

  // ---------------------------------------------------------------------------
  // EFFECT 1: Runs ONCE on Mount (Empty Dependency Array `[]`)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Asynchronously record mount timestamp after initial mount completes
    const timerId = setTimeout(() => {
      setMountedTime(new Date().toLocaleTimeString())
    }, 0)

    // Cleanup cancels the timeout if unmounted immediately
    return () => {
      clearTimeout(timerId)
    }
  }, []) // Empty dependency array -> runs only once when component mounts

  // ---------------------------------------------------------------------------
  // EFFECT 2: Runs on Mount AND when [actionCount] Changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Updates visible status message after render when actionCount dependency changes
    const timerId = setTimeout(() => {
      setDependencyLog(
        `Effect ran for actionCount = ${actionCount} at ${new Date().toLocaleTimeString()}`
      )
    }, 0)

    return () => {
      clearTimeout(timerId)
    }
  }, [actionCount]) // Dependency array specifies: re-run ONLY when actionCount changes

  // ---------------------------------------------------------------------------
  // EFFECT 3: Verifiable Interval Timer with Meaningful Cleanup
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // If paused, do not create an interval
    if (!isTimerActive) {
      return
    }

    // Set up a 1-second interval
    const intervalId = setInterval(() => {
      // Use functional state update `prev => prev + 1` so timerSeconds is not
      // needed in the dependency array (which would recreate the timer every second)
      setTimerSeconds((prev) => prev + 1)
    }, 1000)

    // MEANINGFUL CLEANUP:
    // This cleanup function executes when:
    // 1. `isTimerActive` changes (e.g., user clicks "Pause Timer")
    // 2. The component unmounts
    // Calling clearInterval ensures no timer runs in the background when paused!
    return () => {
      clearInterval(intervalId)
    }
  }, [isTimerActive]) // Re-run effect only when `isTimerActive` changes

  // Handlers for timer controls
  function handleToggleTimer() {
    setIsTimerActive((prev) => !prev)
  }

  function handleResetTimer() {
    setTimerSeconds(0)
  }

  function handleTriggerAction() {
    setActionCount((prev) => prev + 1)
  }

  return (
    <section className="use-effect-demo-section" aria-labelledby="use-effect-heading">
      <div className="demo-header-badge">React Hooks Learning</div>
      <h3 id="use-effect-heading" className="use-effect-title">
        React useEffect Demo & Lifecycle
      </h3>
      <p className="use-effect-subtext">
        Observing mounting, dependency arrays (<code>[dep]</code>), and verifiable cleanup (<code>clearInterval</code>).
      </p>

      <div className="demo-cards-grid">
        {/* Card A: Mount Lifecycle ([]) */}
        <div className="demo-card">
          <div className="demo-card-title">
            <span className="demo-icon" aria-hidden="true">🌱</span>
            <strong>1. Mount Effect <code>[]</code></strong>
          </div>
          <p className="demo-card-desc">
            Runs exactly <strong>once</strong> when the component is created on the page.
          </p>
          <div className="demo-status-pill mounted">
            <span className="status-indicator-dot online"></span>
            Mounted at: <strong data-testid="mount-time">{mountedTime || 'Initializing...'}</strong>
          </div>
        </div>

        {/* Card B: Dependency Array ([actionCount]) */}
        <div className="demo-card">
          <div className="demo-card-title">
            <span className="demo-icon" aria-hidden="true">🔄</span>
            <strong>2. Dependency Effect <code>[actionCount]</code></strong>
          </div>
          <p className="demo-card-desc">
            Runs when <code>actionCount</code> changes. Current count: <strong data-testid="action-count">{actionCount}</strong>
          </p>
          <button
            type="button"
            className="demo-action-btn"
            onClick={handleTriggerAction}
            aria-label="Increment action count to test dependency effect"
          >
            Trigger Dependency Effect (+1)
          </button>
          <div className="demo-log-box" data-testid="dependency-log">
            {dependencyLog || 'Waiting for first execution...'}
          </div>
        </div>

        {/* Card C: Verifiable Cleanup (clearInterval) */}
        <div className="demo-card">
          <div className="demo-card-title">
            <span className="demo-icon" aria-hidden="true">⏱️</span>
            <strong>3. Timer with Cleanup</strong>
          </div>
          <p className="demo-card-desc">
            When paused, <code>clearInterval()</code> runs so no background ticks occur.
          </p>
          <div className="timer-display-box">
            <span className="timer-value" data-testid="timer-seconds">
              {timerSeconds}s
            </span>
            <span
              className={`timer-status-badge ${isTimerActive ? 'active' : 'paused'}`}
              data-testid="timer-status"
            >
              {isTimerActive ? '🟢 Running (ticking)' : '⏸️ Paused (cleared)'}
            </span>
          </div>
          <div className="timer-actions-row">
            <button
              type="button"
              className={`timer-toggle-btn ${isTimerActive ? 'btn-pause' : 'btn-resume'}`}
              onClick={handleToggleTimer}
              aria-label={isTimerActive ? 'Pause session timer' : 'Resume session timer'}
            >
              {isTimerActive ? 'Pause Timer' : 'Resume Timer'}
            </button>
            <button
              type="button"
              className="timer-reset-btn"
              onClick={handleResetTimer}
              aria-label="Reset session timer to zero"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LifecycleDemo
