import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import Settings from '../pages/Settings'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/settings' element={<Settings />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
