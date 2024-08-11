import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AccountVerificationLoading from './AccountVerificationLoading'

const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth()
  const location = useLocation()

  if (isAuthLoading) {
    return <AccountVerificationLoading />
  }

  if (!user) {
    const isDefaultRedirect = location.pathname === '/' || location.pathname === '/login'
    if (isDefaultRedirect) {
      return <Navigate to='/login' replace />
    }

    const redirect = location.pathname + location.search
    return <Navigate to='/login' state={{ from: redirect }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
