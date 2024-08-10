import { HttpResponse, delay } from 'msw'
import { parseJSON } from '../../utils/parseJSON'
import { z } from 'zod'

import { users } from '../database/users'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const createResponse = (data: object, status: number = 200) => {
  return new HttpResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const login = async ({ request }: { request: Request }) => {
  await delay(500)
  try {
    const { email, password } = await parseJSON(request, loginSchema)

    const user = users.find((user) => {
      if (user.provider === 'firebase') {
        // TODO: 차후 admin 에서 토큰 확인 하는것으로 변경
        return user.email === email
      }
      return user.email === email && user.password === password
    })

    if (user) {
      return createResponse(user)
    }

    return createResponse({ message: 'Invalid credentials' }, 401)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return createResponse({ message: errorMessage }, 400)
  }
}
