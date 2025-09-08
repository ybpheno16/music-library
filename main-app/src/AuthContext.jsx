import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock JWT token generator
const generateMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  }))
  const signature = btoa('mock_signature_' + user.username)
  
  return `${header}.${payload}.${signature}`
}

// Mock JWT token validator
const validateMockJWT = (token) => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Check if token is expired
    if (payload.exp * 1000 < Date.now()) {
      return null
    }
    
    return payload
  } catch (error) {
    return null
  }
}

// Mock users database
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on app start
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      const payload = validateMockJWT(storedToken)
      if (payload) {
        const userData = mockUsers.find(u => u.id === payload.userId)
        if (userData) {
          setUser(userData)
          setToken(storedToken)
        } else {
          localStorage.removeItem('authToken')
        }
      } else {
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundUser = mockUsers.find(
        u => u.username === username && u.password === password
      )
      
      if (!foundUser) {
        throw new Error('Invalid username or password')
      }
      
      const jwtToken = generateMockJWT(foundUser)
      
      setUser(foundUser)
      setToken(jwtToken)
      localStorage.setItem('authToken', jwtToken)
      
      return { success: true, user: foundUser, token: jwtToken }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('authToken')
  }

  const isAuthenticated = () => {
    return !!user && !!token
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}