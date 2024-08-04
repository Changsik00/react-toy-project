import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, fetchUser, LoginFormData, LoginResponseData } from '../api/endpoints/auth'
import { USER_QUERY_KEY } from '../constants/queryKeys'

interface UseAuthReturn {
  user: LoginResponseData | null
  handleLogin: (data: LoginFormData, onSuccess?: () => void) => void
  handleLogout: () => void
  refetchUser: () => Promise<void>
  isLoading: boolean
  error: Error | null
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<Error | null>(null)
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<LoginResponseData>([USER_QUERY_KEY]) ?? null

  const loginMutation = useMutation<LoginResponseData, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData([USER_QUERY_KEY], data)
      setError(null)
    },
    onError: (error) => {
      setError(error as Error)
    },
  })

  const handleLogin = (data: LoginFormData, onSuccess?: () => void) => {
    loginMutation.mutate(data, {
      onSuccess,
    })
  }

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] })
  }

  const refetchUser = async () => {
    try {
      const fetchedUser = await fetchUser(user?.id || 1) // 실제 사용자 ID로 변경 필요
      queryClient.setQueryData([USER_QUERY_KEY], fetchedUser)
    } catch (error) {
      setError(error as Error)
    }
  }

  return {
    user,
    handleLogin,
    handleLogout,
    refetchUser,
    isLoading: loginMutation.isPending,
    error,
  }
}
