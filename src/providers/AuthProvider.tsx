import { createContext, ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { LoginResponseData } from '../api/endpoints/auth'

interface AuthContextProps {
  user: LoginResponseData | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<LoginResponseData>(['user']) ?? null

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export { AuthContext }
