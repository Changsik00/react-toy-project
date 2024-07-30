import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { EmailInput, PasswordInput } from '../components/form/InputComponents'
import { loginSchema, LoginFormData } from '../components/form/validation-schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.status === 200) {
        navigate('/dashboard')
      } else {
        console.log('Login failed')
      }
    } catch (error) {
      console.error('Error during login request:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
