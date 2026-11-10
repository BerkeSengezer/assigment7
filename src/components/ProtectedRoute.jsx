import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const { pathname, search, hash } = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: pathname + search + hash }} />
  }

  return children
}
