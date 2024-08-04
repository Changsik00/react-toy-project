import { http } from 'msw'
import { handleLogin } from './handleLogin'
import { handleFetchUser } from './handleFetchUser'

export const handlers = [
  // Auth Handlers
  http.post('/login', handleLogin),

  // User Handlers
  http.get('/users/:userId', handleFetchUser),
]
