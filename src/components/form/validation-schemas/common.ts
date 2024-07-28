import { z } from 'zod'

export const emailSchema = z.string().email('유효한 이메일을 입력해주세요.')
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .max(20, '비밀번호는 최대 20자 이하이어야 합니다.')
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
    message: '비밀번호에는 적어도 하나의 특수 문자가 포함되어야 합니다.',
  })
