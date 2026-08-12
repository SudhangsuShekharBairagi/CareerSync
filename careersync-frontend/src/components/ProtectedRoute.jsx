import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '1px', color: '#7c7c7c' }}>
          LOADING...
        </span>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
