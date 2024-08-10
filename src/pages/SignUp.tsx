import { Link, useNavigate } from 'react-router-dom'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import SignUpForm from '../components/form/SignUpForm'
import { SignUpFormData } from '../components/form/validation-schemas/signUpSchema'
import { getAuth as FirebaseAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
const SignUp = () => {
  const { updateUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: SignUpFormData) => {
    const auth = FirebaseAuth()
    try {
      setIsLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      if (user) {
        console.log('#@# user', user)
        updateUser(data, () => {
          navigate('/dashboard')
        })
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const firebaseError = error as FirebaseError

        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            console.error('Email already in use:', firebaseError.message)
            break
          default:
            console.error('Error sending email:', firebaseError.message)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>Create an Account</h1>
      <SignUpForm isLoading={isLoading} onSubmit={onSubmit} />
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
