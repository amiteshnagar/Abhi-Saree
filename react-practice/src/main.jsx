// =============================================================================
// Abhi Saree Collection — React Practice App Entry Point
// =============================================================================

// 1. Import React tools to mount our component into the browser's DOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 2. Import global font styles and CSS reset
import './index.css'

// 3. Import our main App component from App.jsx
import App from './App.jsx'

// 4. Mount our React application into the <div id="root"> element in index.html
// `createRoot` connects React's virtual component system to the actual web browser DOM.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
