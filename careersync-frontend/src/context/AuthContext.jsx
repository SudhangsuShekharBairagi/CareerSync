import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await loginUser(email, password)
    setUser(res.data ?? null)
    return res
  }, [])

  const register = useCallback(async (payload) => {
    const res = await registerUser(payload)
    setUser(res.data ?? null)
    return res
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } catch {
      // ignore server errors on logout, still clear local state
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
