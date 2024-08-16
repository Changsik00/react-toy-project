import { HttpResponse } from 'msw'

export const createErrorResponse = (message: string, status: number = 400) => {
  return new HttpResponse(JSON.stringify({ message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const createSuccessResponse = (data: object, status: number = 200) => {
  return new HttpResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const createAuthErrorResponse = (message: string = 'Invalid token or Authorization header missing') => {
  return createErrorResponse(message, 401)
}
