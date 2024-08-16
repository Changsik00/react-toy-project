import { delay } from 'msw'
import { users } from '../database/users'
import { verifyToken } from './utils/tokenUtils'
import { createSuccessResponse, createAuthErrorResponse } from './utils/responseUtils'

export const fetchUser = async ({ request }: { request: Request }) => {
  await delay(500)

  const decodedToken = verifyToken(request.headers)
  if (!decodedToken) {
    return createAuthErrorResponse()
  }

  const user = users.find((user) => user.id === decodedToken.user_id)
  if (user) {
    return createSuccessResponse(user)
  }

  return createSuccessResponse({ message: 'User not found' }, 404)
}
