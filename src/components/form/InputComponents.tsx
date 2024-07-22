import React from 'react'
import BaseInput from './BaseInput'

export const NameInput = (props) => (
  <BaseInput
    name='name'
    label='Name'
    placeholder='Enter your name'
    {...props}
  />
)

export const EmailInput = (props) => (
  <BaseInput
    name='email'
    label='Email'
    type='email'
    placeholder='Enter your email'
    {...props}
  />
)

export const PasswordInput = (props) => (
  <BaseInput
    name='password'
    label='Password'
    type='password'
    placeholder='Enter your password'
    {...props}
  />
)

export const ConfirmPasswordInput = (props) => (
  <BaseInput
    name='confirmPassword'
    label='Confirm Password'
    type='password'
    placeholder='Confirm your password'
    {...props}
  />
)
