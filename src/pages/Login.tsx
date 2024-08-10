import { useForm, FormProvider } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { EmailInput, PasswordInput } from '../components/form/InputComponents'
import { loginSchema, LoginFormData } from '../components/form/validation-schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

const Login = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const { updateUser, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onSubmit = (data: LoginFormData) => {
    updateUser(data, () => {
      navigate(location.state?.from ?? '/dashboard')
    })
  }

  useEffect(() => {
    if (error) {
      // TODO: 에러가 있을 경우 toast를 통해 사용자에게 알림
      // toast.error('Login failed: ' + error.message)
      console.error('Login failed:', error)
    }
  }, [error])

  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>Login</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' noValidate>
            <EmailInput required />
            <PasswordInput required />
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600'
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </FormProvider>
        <p className='mt-6 text-center text-gray-600 dark:text-gray-300'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </ResponsiveLayout>
  )
}

export default Login
