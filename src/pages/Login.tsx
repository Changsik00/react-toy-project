import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { EmailInput, PasswordInput } from '../components/form/InputComponents'
import { loginSchema, LoginFormData } from '../components/form/validation-schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const Login = () => {
  const navigate = useNavigate()

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target
    methods.trigger(name as keyof LoginFormData)
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log(data)
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
        // Handle error (e.g., show error message)
        console.log('Login failed')
      }
    } catch (error) {
      console.error('Error during login request:', error)
    }
  }

  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>Login</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' noValidate>
            <EmailInput required onBlur={handleEvent} />
            <PasswordInput required onBlur={handleEvent} />
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600'
            >
              Login
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
