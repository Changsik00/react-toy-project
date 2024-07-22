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

  const handleChange = (name: keyof SignUpFormData) => {
    return () => {
      trigger(name)
      if (name === 'password') {
        trigger('confirmPassword')
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
        <NameInput required onBlur={handleChange('name')} />
        <EmailInput required onBlur={handleChange('email')} />
        <PasswordInput required onChange={handleChange('password')} />
        <ConfirmPasswordInput
          required
          onChange={handleChange('confirmPassword')}
        />
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
