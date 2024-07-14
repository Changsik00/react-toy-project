import ResponsiveLayout from '../components/common/ResponsiveLayout'

const SignUp = () => {
  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>
        Create an Account
      </h1>
      <form className='space-y-6'>
        <div>
          <label className='mb-2 block text-gray-600 dark:text-gray-300'>
            Email
          </label>
          <input
            type='email'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your email'
            required
          />
        </div>
        <div>
          <label className='mb-2 block text-gray-600 dark:text-gray-300'>
            Password
          </label>
          <input
            type='password'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your password'
            required
          />
        </div>
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
