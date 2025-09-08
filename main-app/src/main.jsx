import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Note: Music library URL is now configured directly in vite.config.js
// For production deployment, update the remote URL in vite.config.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)