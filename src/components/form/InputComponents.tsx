import React from 'react'
import BaseInput, { InputProps } from './BaseInput'

export const NameInput: React.FC<Omit<InputProps, 'name'>> = (props) => (
  <BaseInput name='name' label='Name' placeholder='Enter your name' {...props} />
)

export const EmailInput: React.FC<Omit<InputProps, 'name'>> = (props) => (
  <BaseInput name='email' label='Email' type='email' placeholder='Enter your email' {...props} />
)

export const PasswordInput: React.FC<Omit<InputProps, 'name'>> = (props) => (
  <BaseInput name='password' label='Password' type='password' placeholder='Enter your password' {...props} />
)

export const ConfirmPasswordInput: React.FC<Omit<InputProps, 'name'>> = (props) => (
  <BaseInput
    name='confirmPassword'
    label='Confirm Password'
    type='password'
    placeholder='Confirm your password'
    {...props}
  />
)
