import { Link } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import SignUpForm from '../components/form/SignUpForm'
import { SignUpFormData } from '../components/form/validation-schemas/signUpSchema'
const SignUp = () => {
  const onSubmit = (data: SignUpFormData) => {
    console.info('#@# params', data)
  }

  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>Create an Account</h1>
      <SignUpForm onSubmit={onSubmit} />
      <p className='mt-6 text-center text-gray-600 dark:text-gray-300'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-500 hover:underline'>
          Log in
        </Link>
      </p>
    </ResponsiveLayout>
  )
}

export default SignUp
