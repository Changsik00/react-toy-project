import { z } from 'zod'
import { validatedApiRequest } from '../utils/requestUtils'

// Zod 스키마 정의
export const LoginResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
})

export const TokenSchema = z.object({
  token: z.string(),
})

// 타입 정의 (Zod 스키마에서 추론)
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type TokenResponse = z.infer<typeof TokenSchema>

// API 함수들
export const login = async (data: TokenResponse): Promise<LoginResponse> => {
  return validatedApiRequest({
    endpoint: { url: '/login', method: 'post', noAuth: true },
    data,
    requestSchema: TokenSchema,
    responseSchema: LoginResponseSchema,
  })
}

export const fetchUser = async (id: string): Promise<LoginResponse> => {
  return validatedApiRequest({
    endpoint: { url: `/users/${id}`, method: 'get', noAuth: true },
    responseSchema: LoginResponseSchema,
  })
}
