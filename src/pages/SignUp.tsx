import React, { useState } from 'react'
import ResponsiveLayout from '../components/common/ResponsiveLayout'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.')
      return
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    // 여기에 회원가입 로직 추가 (ex: API 호출)
    console.log('#@# params', { email, password, confirmPassword })
  }

  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>
        Create an Account
      </h1>
      <form
        className='space-y-6'
        onSubmit={handleSubmit}
        aria-describedby='error-message'
        noValidate
      >
        <div>
          <label
            htmlFor='email'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required='true'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required='true'
          />
        </div>
        <div>
          <label
            htmlFor='confirmPassword'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-required='true'
          />
        </div>
        {error && (
          <p id='error-message' className='text-red-500' aria-live='assertive'>
            {error}
          </p>
        )}
        <button
          type='submit'
          className='w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
      <p className='mt-6 text-center text-gray-600 dark:text-gray-300'>
        Already have an account?{' '}
        <a href='/login' className='text-blue-500 hover:underline'>
          Log in
        </a>
      </p>
    </ResponsiveLayout>
  )
}

export default SignUp
