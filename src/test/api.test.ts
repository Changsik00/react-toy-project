import { describe, it, expect } from 'vitest'
import { login } from '../api/endpoints/auth'
import { AxiosError } from 'axios'

describe('Login API', () => {
  it('should return 200 for valid credentials', async () => {
    const response = await login({
      email: 'test@test.com',
      password: 'qwerQWER1234!',
    })
    expect(response.email).toBe('test@test.com')
  })

  it('should return 401 for invalid credentials', async () => {
    try {
      await login({
        email: 'wrong@test.com',
        password: 'wrongpassword',
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        expect(error.response.status).toBe(401)
        expect(error.response.data.message).toBe('Invalid credentials')
      } else {
        throw error
      }
    }
  })
})
