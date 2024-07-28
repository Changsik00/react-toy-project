import { z } from 'zod'
import { emailSchema, passwordSchema } from './common'

export const signUpSchema = z
  .object({
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
