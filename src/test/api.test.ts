import { describe, it, expect } from 'vitest'
import { login, LoginFormData } from '../api/auth'

describe('Login API', () => {
  it('should return 200 for valid credentials', async () => {
    const data: LoginFormData = {
      email: 'test@test.com',
      password: 'qwerQWER1234!',
    }

    const response = await login(data)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('name')
    expect(response).toHaveProperty('email', data.email)
  })

  it('should return 401 for invalid credentials', async () => {
    const data: LoginFormData = {
      email: 'wrong@test.com',
      password: 'wrongpassword',
    }

    try {
      await login(data)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Invalid credentials')
      } else {
        throw new Error('Unexpected error type')
      }
    }
  })
})
