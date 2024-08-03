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
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}

export const fetchUser = async (userId: number): Promise<LoginResponseData> => {
  const response = await fetch(`/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response.json()
}
