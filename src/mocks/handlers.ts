import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/login', async ({ request }) => {
    const response = await request.json()
    const { email, password } = response as { email: string; password: string }
    if (email === 'test@test.com' && password === 'qwerQWER1234!') {
      return new HttpResponse(null, {
        status: 200,
      })
    }

    // 조건이 충족되지 않을 때 반환할 응답 추가
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Invalid credentials',
    })
  }),
]
