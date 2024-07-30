import { http, HttpResponse } from 'msw'

interface LoginRequestBody {
  email: string
  password: string
}

// 제네릭 함수 정의
async function parseJSON<T>(request: Request): Promise<T> {
  const response = await request.json()
  return response as T
}

export const handlers = [
  http.post('/login', async ({ request }) => {
    // parseJSON 제네릭 함수를 사용하여 타입 안전성 확보
    const { email, password } = await parseJSON<LoginRequestBody>(request)

    if (email === 'test@test.com' && password === 'qwerQWER1234!') {
      return new HttpResponse(null, {
        status: 200,
        statusText: 'OK',
      })
    }

    return new HttpResponse(
      JSON.stringify({ message: 'Invalid credentials' }),
      {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }),
]
