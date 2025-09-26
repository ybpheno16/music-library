import { useState } from 'react'
import { useAuth } from './AuthContext'
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-card">
          <div className="login-header">
            <h1>🎵 Music App</h1>
            <p>Sign in to access your music library</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-credentials">
            <h3>Demo Credentials:</h3>
            <div className="credentials-grid">
              <div className="credential-item">
                <strong>Admin User:</strong>
                <div>Username: admin</div>
                <div>Password: admin123</div>
                <div className="role-badge admin">Can add/delete songs</div>
              </div>
              <div className="credential-item">
                <strong>Regular User:</strong>
                <div>Username: user</div>
                <div>Password: user123</div>
                <div className="role-badge user">Can view/filter songs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
