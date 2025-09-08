import { Suspense, lazy, useState } from 'react'
import { AuthProvider, useAuth } from './AuthContext'
import Login from './Login'
import './App.css'

// Lazy load the music library micro frontend
const MusicLibrary = lazy(() => 
  import('musicLibrary/MusicLibrary').catch((error) => {
    console.error('Failed to load MusicLibrary micro frontend:', error)
    return {
      default: () => (
        <div className="error-fallback">
          <h3>🚫 Music Library Loading Error</h3>
          <p>The music library micro frontend could not be loaded.</p>
          <p><strong>Error:</strong> {error.message || 'Unknown error'}</p>
          <details style={{ marginTop: '10px', textAlign: 'left' }}>
            <summary>Debug Information</summary>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', marginTop: '5px' }}>
              Error: {error.toString()}
              {'\n'}Stack: {error.stack}
            </pre>
          </details>
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={() => window.location.reload()}
              className="retry-btn"
              style={{ marginRight: '10px' }}
            >
              Retry
            </button>
            <button 
              onClick={() => window.open('http://localhost:5001/assets/remoteEntry.js', '_blank')}
              className="retry-btn"
            >
              Test Remote Entry
            </button>
          </div>
        </div>
      )
    }
  })
)

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading Music Library...</p>
    </div>
  </div>
)

const Header = () => {
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      logout()
    }
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1>🎵 Music Dashboard</h1>
          <span className="subtitle">Micro Frontend Architecture Demo</span>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="welcome">Welcome, {user.name}!</span>
            <span className={`role-indicator ${user.role}`}>
              {isAdmin() ? '👑 Admin' : '👤 User'}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            aria-label="Sign out of your account"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

const Dashboard = () => {
  const { user } = useAuth()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSongAdd = (song) => {
    console.log('Song added:', song)
    // You could show a notification here
  }

  const handleSongDelete = (songId) => {
    console.log('Song deleted:', songId)
    // You could show a notification here
  }

  const refreshMusicLibrary = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="dashboard">
      <Header />
      
      <main className="main-content">
        <div className="content-header">
          <div className="content-info">
            <h2>Music Library</h2>
            <p>
              {user.role === 'admin' 
                ? 'You have full access to add and delete songs.' 
                : 'You can view and filter the music collection.'
              }
            </p>
          </div>
          
          <div className="content-actions">
            <button 
              onClick={refreshMusicLibrary}
              className="refresh-btn"
              title="Refresh Music Library"
              aria-label="Refresh the music library"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="micro-frontend-container">
          <Suspense fallback={<LoadingSpinner />}>
            <MusicLibrary 
              key={refreshKey}
              userRole={user.role}
              onSongAdd={handleSongAdd}
              onSongDelete={handleSongDelete}
            />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return isAuthenticated() ? <Dashboard /> : <Login />
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

export default App