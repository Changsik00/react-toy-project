import { http, HttpResponse, delay } from 'msw'
import { parseJSON } from '../utils/parseJSON'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const handlers = [
  http.post('/login', async ({ request }) => {
    await delay(500)
    try {
      const data = await parseJSON(request, loginSchema)
      // data.email과 data.password 사용
      if (data.email === 'test@test.com' && data.password === 'qwerQWER1234!') {
        return new HttpResponse(null, {
          status: 200,
          statusText: 'OK',
        })
      }

      return new HttpResponse(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      let errorMessage = 'An unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      return new HttpResponse(JSON.stringify({ message: errorMessage }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }),
]
