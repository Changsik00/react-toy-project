import { HttpClient } from '../httpClient'
import { z } from 'zod'
import { Endpoint } from '../types'

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

// Define types using Zod schemas
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>
export type Token = z.infer<typeof TokenSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

const loginEndpoint: Endpoint = {
  url: '/login',
  method: 'post',
  noAuth: true,
}

const fetchUserEndpoint: Endpoint = {
  url: '/users/:id',
  method: 'get',
  noAuth: true, // TODO: 차후 인증 필요
}

export const login = async (data: Token): Promise<LoginResponseData> => {
  // Validate data with Zod
  TokenSchema.parse(data)
  const response = await httpClient.request<LoginResponseData>(loginEndpoint, data)
  if (response.status !== 200) {
    // Validate error response with Zod
    const errorData = ErrorResponseSchema.safeParse(response.data)
    throw new Error(errorData.success ? errorData.data.message : 'Login failed')
  }
  // Validate response with Zod
  return LoginResponseDataSchema.parse(response.data)
}

export const fetchUser = async (id: string): Promise<LoginResponseData> => {
  // Validate userId with Zod
  UserIdSchema.parse(id)

  const endpoint = { ...fetchUserEndpoint, url: fetchUserEndpoint.url.replace(':id', id.toString()) }
  const response = await httpClient.request<LoginResponseData | ErrorResponse>(endpoint)

  if (response.status !== 200) {
    // Validate error response with Zod
    const errorData = ErrorResponseSchema.safeParse(response.data)
    throw new Error(errorData.success ? errorData.data.message : 'Fetch user failed')
  }

  // Validate response with Zod
  return LoginResponseDataSchema.parse(response.data)
}
