import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/signup' />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
