import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './stores/authStore'

const App = () => {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return <AppRoutes />
}

export default App
