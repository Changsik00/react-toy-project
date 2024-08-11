import { AxiosResponse } from 'axios'
import { z } from 'zod'
import { HttpClient } from '../httpClient'
import { Endpoint } from '../types/common'

export const ErrorResponseSchema = z.object({
  message: z.string(),
})

// 공통 에러 처리 함수
export const handleErrorResponse = (
  response: AxiosResponse<z.infer<typeof ErrorResponseSchema>>,
): z.infer<typeof ErrorResponseSchema> => {
  const errorData = ErrorResponseSchema.safeParse(response.data)
  throw new Error(errorData.success ? errorData.data.message : 'Request failed')
}

// 공통 API 요청 함수에서 객체로 인자 전달
export interface ApiRequestParams<RequestSchema extends z.ZodTypeAny, ResponseSchema extends z.ZodTypeAny> {
  endpoint: Endpoint
  data?: z.infer<RequestSchema>
  requestSchema?: RequestSchema
  responseSchema?: ResponseSchema
}

export const validatedApiRequest = async <RequestSchema extends z.ZodTypeAny, ResponseSchema extends z.ZodTypeAny>({
  endpoint,
  data,
  requestSchema,
  responseSchema,
}: ApiRequestParams<RequestSchema, ResponseSchema>): Promise<z.infer<ResponseSchema>> => {
  if (requestSchema && data) {
    requestSchema.parse(data) // 요청 데이터 검증
  }

  const response = await httpClient.request<z.infer<ResponseSchema> | z.infer<typeof ErrorResponseSchema>>(
    endpoint,
    data,
  )

  if (response.status !== 200) {
    handleErrorResponse(response)
  }

  if (responseSchema) {
    return responseSchema.parse(response.data)
  } else {
    return response.data as z.infer<ResponseSchema>
  }
}

export const httpClient = new HttpClient()
