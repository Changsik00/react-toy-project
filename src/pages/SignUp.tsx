import ResponsiveLayout from '../components/common/ResponsiveLayout'
import SignUpForm from '../components/form/SignUpForm'
import { SignUpFormData } from '../components/form/validation-schemas'

const SignUp = () => {
  const onSubmit = (data: SignUpFormData) => {
    console.log('#@# params', data)
  }

  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>
        Create an Account
      </h1>
      <SignUpForm onSubmit={onSubmit} />
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
