import React from 'react'
import { useController, useFormContext } from 'react-hook-form'

export interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const BaseInput: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  onChange,
  onBlur,
  onFocus,
  ...props
}) => {
  const { control } = useFormContext()
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className='mb-2 block text-gray-600 dark:text-gray-300'
        >
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
        onChange={(e) => {
          field.onChange(e)
          if (onChange) onChange(e)
        }}
        onBlur={(e) => {
          field.onBlur()
          if (onBlur) onBlur(e)
        }}
        onFocus={(e) => {
          if (onFocus) onFocus(e)
        }}
        className={`w-full rounded-lg border p-3 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${error ? 'dark:border-red-500' : 'dark:border-gray-700'} focus:border-blue-500 dark:bg-gray-700 dark:focus:border-blue-500`}
        {...props}
      />
      {error && <p className='text-red-500'>{error.message}</p>}
    </div>
  )
}

export default BaseInput
