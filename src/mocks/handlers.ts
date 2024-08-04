import { http, HttpResponse, delay } from 'msw'
import { parseJSON } from '../utils/parseJSON'
import { z } from 'zod'

// 스키마 정의
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// 핸들러 정의
export const handlers = [
  // Login 요청 핸들러
  http.post('/login', async ({ request }) => {
    await delay(500)
    try {
      const data = await parseJSON(request, loginSchema)
      // 인증 정보 확인
      if (data.email === 'test@test.com' && data.password === 'qwerQWER1234!') {
        const user = {
          id: 1,
          name: 'Changsik Jang',
          email: data.email,
          role: 'admin', // 추가 사용자 정보
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
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      return new HttpResponse(JSON.stringify({ message: errorMessage }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }),

  // Fetch user 요청 핸들러
  http.get('/users/:userId', ({ params }) => {
    const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId

    if (parseInt(userId, 10) === 1) {
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
