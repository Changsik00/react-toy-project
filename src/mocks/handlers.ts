import { http, HttpResponse, delay } from 'msw'
import { parseJSON } from '../utils/parseJSON'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const handlers = [
  // Login 요청 핸들러
  http.post('/login', async ({ request }) => {
    await delay(500)
    try {
      const data = await parseJSON(request, loginSchema)
      // data.email과 data.password 사용
      if (data.email === 'test@test.com' && data.password === 'qwerQWER1234!') {
        const user = {
          id: 1,
          name: 'Changsik Jang',
          email: data.email,
          role: 'admin', // Additional user information
        }
        return new HttpResponse(JSON.stringify(user), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
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
  // Fetch user 요청 핸들러
  http.get('/users/:userId', ({ params }) => {
    const { userId } = params
    const id = Array.isArray(userId) ? userId[0] : userId

    if (parseInt(id) === 1) {
      const user = {
        id: 1,
        name: 'Changsik Jang',
        email: 'test@test.com',
        role: 'admin',
      }

      return new HttpResponse(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new HttpResponse(JSON.stringify({ message: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }),
]
