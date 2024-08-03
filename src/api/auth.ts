export interface LoginResponseData {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginFormData {
  email: string
  password: string
}

export const login = async (data: LoginFormData): Promise<LoginResponseData> => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}

export const fetchUser = async (userId: number): Promise<LoginResponseData> => {
  const response = await fetch(`/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user data')
  }

  return response.json()
}
