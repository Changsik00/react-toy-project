import { HttpClient } from './httpClient'
import { z } from 'zod'
import { Endpoint } from './types'

export const LoginResponseDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
})

export const LoginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const UserIdSchema = z.number()

const ErrorResponseSchema = z.object({
  message: z.string(),
})

const baseURL = import.meta.env.VITE_TYPECAST_API_URL
const httpClient = new HttpClient({ baseURL })

// Define types using Zod schemas
export type LoginResponseData = z.infer<typeof LoginResponseDataSchema>
export type LoginFormData = z.infer<typeof LoginFormDataSchema>
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

export const login = async (data: LoginFormData): Promise<LoginResponseData> => {
  // Validate data with Zod
  LoginFormDataSchema.parse(data)

  const response = await httpClient.request<LoginResponseData>(loginEndpoint, data)

  if (response.status !== 200) {
    // Validate error response with Zod
    const errorData = ErrorResponseSchema.safeParse(response.data)
    throw new Error(errorData.success ? errorData.data.message : 'Login failed')
  }

  // Validate response with Zod
  return LoginResponseDataSchema.parse(response.data)
}

export const fetchUser = async (userId: number): Promise<LoginResponseData> => {
  // Validate userId with Zod
  UserIdSchema.parse(userId)

  const endpoint = { ...fetchUserEndpoint, url: fetchUserEndpoint.url.replace(':id', userId.toString()) }
  const response = await httpClient.request<LoginResponseData | ErrorResponse>(endpoint)

  if (response.status !== 200) {
    // Validate error response with Zod
    const errorData = ErrorResponseSchema.safeParse(response.data)
    throw new Error(errorData.success ? errorData.data.message : 'Fetch user failed')
  }

  // Validate response with Zod
  return LoginResponseDataSchema.parse(response.data)
}
