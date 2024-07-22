import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import ResponsiveLayout from '../components/common/ResponsiveLayout'

// Zod 스키마 정의
const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  .max(20, { message: '비밀번호는 최대 20자 이하이어야 합니다.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: '비밀번호에는 적어도 하나의 대문자가 포함되어야 합니다.',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: '비밀번호에는 적어도 하나의 소문자가 포함되어야 합니다.',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: '비밀번호에는 적어도 하나의 숫자가 포함되어야 합니다.',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: '비밀번호에는 적어도 하나의 특수문자가 포함되어야 합니다.',
  })

const schema = z
  .object({
    email: z.string().email('유효한 이메일을 입력해주세요.'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log('#@# params', data)
  }

  const handleChange = (name: keyof FormData) => () => {
    trigger(name)
    if (name === 'password') {
      trigger('confirmPassword')
    }
  }

  return (
    <ResponsiveLayout>
      <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>
        Create an Account
      </h1>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
        aria-describedby='error-message'
        noValidate
      >
        <div>
          <label
            htmlFor='email'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your email'
            {...register('email', { onChange: handleChange('email') })}
            aria-required='true'
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Enter your password'
            {...register('password', { onChange: handleChange('password') })}
            aria-required='true'
          />
          {errors.password && (
            <p className='text-red-500'>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='confirmPassword'
            className='mb-2 block text-gray-600 dark:text-gray-300'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:focus:border-blue-500'
            placeholder='Confirm your password'
            {...register('confirmPassword', {
              onChange: handleChange('confirmPassword'),
            })}
            aria-required='true'
          />
          {errors.confirmPassword && (
            <p className='text-red-500'>{errors.confirmPassword.message}</p>
          )}
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
