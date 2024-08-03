import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'

type User = {
  id: number
  name: string
  email: string
  role: string
}
const Dashboard = () => {
  const navigate = useNavigate()
  const { data: user } = useQuery<User>({ queryKey: ['user'] })
  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='text-center text-gray-600 dark:text-gray-300'>{user ? `Welcome, ${user.name}!` : 'Welcome!'}</h1>
        {user && (
          <button onClick={handleLogout} className='mt-4 rounded-lg bg-red-500 p-3 text-white'>
            Logout
          </button>
        )}
      </div>
    </ResponsiveLayout>
  )
}

export default Dashboard
