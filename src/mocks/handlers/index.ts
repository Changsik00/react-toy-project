import { http } from 'msw'
import { login } from './handleLogin'
import { fetchUser } from './handleFetchUser'

export const handlers = [
  // Auth Handlers
  http.post('/login', login),

  // User Handlers
  http.get('/users/:userId', fetchUser),
]
