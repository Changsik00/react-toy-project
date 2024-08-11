import { HttpClient } from '../httpClient'
import { z } from 'zod'
import { Endpoint } from '../types/common'
import { AxiosResponse } from 'axios'

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

export const ErrorResponseSchema = z.object({
  message: z.string(),
})

// 타입 정의 (Zod 스키마에서 추론)
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type TokenResponse = z.infer<typeof TokenSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

const baseURL = import.meta.env.VITE_API_URL
const httpClient = new HttpClient({ baseURL })

// 공통 에러 처리 함수
const handleErrorResponse = (response: AxiosResponse<ErrorResponse>): ErrorResponse => {
  const errorData = ErrorResponseSchema.safeParse(response.data)
  throw new Error(errorData.success ? errorData.data.message : 'Request failed')
}

// 공통 API 요청 함수에서 객체로 인자 전달
interface ApiRequestParams<RequestSchema extends z.ZodTypeAny, ResponseSchema extends z.ZodTypeAny> {
  endpoint: Endpoint
  data?: z.infer<RequestSchema>
  requestSchema?: RequestSchema
  responseSchema?: ResponseSchema
}

const validatedApiRequest = async <RequestSchema extends z.ZodTypeAny, ResponseSchema extends z.ZodTypeAny>({
  endpoint,
  data,
  requestSchema,
  responseSchema,
}: ApiRequestParams<RequestSchema, ResponseSchema>): Promise<z.infer<ResponseSchema>> => {
  if (requestSchema && data) {
    requestSchema.parse(data) // 요청 데이터 검증
  }

  const response = await httpClient.request<z.infer<ResponseSchema> | ErrorResponse>(endpoint, data)

  if (response.status !== 200) {
    handleErrorResponse(response)
  }

  // 응답 데이터 검증
  if (responseSchema) {
    // 응답 데이터 검증
    return responseSchema.parse(response.data)
  } else {
    return response.data as z.infer<ResponseSchema>
  }
}

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
