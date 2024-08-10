import { HttpClient } from '../httpClient'
import { z } from 'zod'
import { Endpoint } from '../types'

// Zod 스키마 정의
export const LoginResponseDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
})

export const TokenSchema = z.object({
  token: z.string(),
})

const UserIdSchema = z.string()

const ErrorResponseSchema = z.object({
  message: z.string(),
})

const baseURL = import.meta.env.VITE_API_URL
const httpClient = new HttpClient({ baseURL })

export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>
export type Token = z.infer<typeof TokenSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

// 공통 에러 처리 함수
const handleErrorResponse = (response: any): ErrorResponse => {
  const errorData = ErrorResponseSchema.safeParse(response.data)
  throw new Error(errorData.success ? errorData.data.message : 'Request failed')
}

// 엔드포인트 생성 함수
const createEndpoint = (url: string, method: 'get' | 'post' | 'put' | 'delete', noAuth = false): Endpoint => ({
  url,
  method,
  noAuth,
})

// 타입 검증 및 API 요청을 통합하는 공통 함수
const validatedApiRequest = async <T, S = undefined>(
  endpoint: Endpoint, 
  data: S | undefined, 
  schema?: z.ZodType<S>
): Promise<T> => {
  if (schema && data !== undefined) {
    schema.parse(data)  // 데이터 검증
  }

  const response = await httpClient.request<T | ErrorResponse>(endpoint, data)
  
  if (response.status !== 200) {
    handleErrorResponse(response)
  }

  return response.data as T
}

// API 함수들
export const login = async (data: Token): Promise<LoginResponseData> => {
  return validatedApiRequest<LoginResponseData, Token>(
    createEndpoint('/login', 'post', true), 
    data, 
    TokenSchema
  )
}

export const fetchUser = async (id: string): Promise<LoginResponseData> => {
  return validatedApiRequest<LoginResponseData>(
    createEndpoint(`/users/${id}`, 'get', true), 
    undefined
  )
}
