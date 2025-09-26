import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MusicLibrary from './MusicLibrary.jsx'

// For standalone development
if (import.meta.env.DEV && document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <MusicLibrary userRole="admin" />
    </StrictMode>
  )
}
