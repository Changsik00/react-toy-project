import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  NameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from './InputComponents'
import { signUpSchema, SignUpFormData } from './validation-schemas'

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const methods = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { trigger, handleSubmit } = methods

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>,
  ) => {
    const { name } = event.target
    trigger(name as keyof SignUpFormData)
    if (name === 'password') {
      trigger('confirmPassword')
    }
  }

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
        <NameInput required onBlur={handleChange} />
        <EmailInput required onBlur={handleChange} />
        <PasswordInput required onChange={handleChange} />
        <ConfirmPasswordInput required onChange={handleChange} />
        <button
          type='submit'
          className='w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
    </FormProvider>
  )
}

export default SignUpForm
