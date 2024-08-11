import { HttpResponse, delay } from 'msw'
import { parseJSON } from '../../utils/parseJSON'
import { users } from '../database/users'
import { TokenSchema } from '../../api/endpoints/auth'
import { jwtDecode } from 'jwt-decode'

const createResponse = (data: object, status: number = 200) => {
  return new HttpResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const login = async ({ request }: { request: Request }) => {
  await delay(500)
  try {
    const { token } = await parseJSON(request, TokenSchema)
    // Firebase Admin SDK를 사용해 idToken에서 id 추출
    const decodedToken = jwtDecode(token) as {
      user_id: string
    }
    const uid = decodedToken.user_id
    const user = users.find((user) => user.id === uid)
    if (user) {
      return createResponse(user)
    }

    return createResponse({ message: 'Invalid credentials' }, 401)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return createResponse({ message: errorMessage }, 400)
  }
}
