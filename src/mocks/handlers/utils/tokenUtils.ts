import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  user_id: string
}

export const extractTokenFromHeader = (headers: Headers): string | null => {
  const authorization = headers.get('Authorization')

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }

  return authorization.split(' ')[1]
}

export const validateToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode(token) as DecodedToken
    return decoded
  } catch (error) {
    return null
  }
}

export const verifyToken = (headers: Headers): DecodedToken | null => {
  const token = extractTokenFromHeader(headers)

  if (!token) {
    return null
  }

  return validateToken(token)
}
