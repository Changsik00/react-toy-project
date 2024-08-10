// src/handlers/user/handleFetchUser.ts

import { HttpResponse } from 'msw'
import { users } from '../database/users'

const createResponse = (data: object, status: number = 200) => {
  return new HttpResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const fetchUser = ({ params }: { params: { userId: string | string[] } }) => {
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId
  const user = users.find((user) => user.id === parseInt(userId, 10))

  if (user) {
    return createResponse(user)
  }

  return createResponse({ message: 'User not found' }, 404)
}
