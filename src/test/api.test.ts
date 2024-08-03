import { describe, it, expect } from 'vitest'

describe('Login API', () => {
  it('should return 200 for valid credentials', async () => {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'qwerQWER1234!',
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    expect(response.status).toBe(200)
  })

  it('should return 401 for invalid credentials', async () => {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'wrong@test.com',
        password: 'wrongpassword',
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    expect(response.status).toBe(401)

    // Check if the response contains JSON data
    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json()
      expect(data.message).toBe('Invalid credentials')
    } else {
      throw new Error('Expected JSON response')
    }
  })
})
