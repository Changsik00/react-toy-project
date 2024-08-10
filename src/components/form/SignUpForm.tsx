import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NameInput, EmailInput, PasswordInput, ConfirmPasswordInput } from './InputComponents'
import { signUpSchema, SignUpFormData } from './validation-schemas/signUpSchema'

interface SignUpFormProps {
  isLoading?: boolean
  onSubmit: (data: SignUpFormData) => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isLoading, onSubmit }) => {
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const { trigger, handleSubmit } = methods

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target
    trigger(name as keyof SignUpFormData)
    if (name === 'password') {
      trigger('confirmPassword')
    }
  }

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
        <NameInput required onBlur={handleEvent} />
        <EmailInput required onBlur={handleEvent} />
        <PasswordInput required onChange={handleEvent} />
        <ConfirmPasswordInput required onChange={handleEvent} />
        <button
          type='submit'
          className='w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600'
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </FormProvider>
  )
}

export default SignUpForm
