import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, fetchUser, LoginFormData, LoginResponseData } from '../api/endpoints/auth'
import { USER_QUERY_KEY } from '../constants/queryKeys'
import { useRemoveQueries } from './useRemoveQueries'

interface UseAuthReturn {
  user: LoginResponseData | null
  updateUser: (data: LoginFormData, onSuccess?: () => void) => void
  clearUser: (onSuccess?: () => void) => void
  refetchUser: () => Promise<void>
  isLoading: boolean
  error: Error | null
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<Error | null>(null)
  const queryClient = useQueryClient()
  const { removeQuery } = useRemoveQueries()

  const user = queryClient.getQueryData<LoginResponseData>([USER_QUERY_KEY]) ?? null

  const loginMutation = useMutation<LoginResponseData, Error, LoginFormData>({
    mutationFn: login,
    gcTime: 1000 * 60 * 60, // 1시간
    onSuccess: (data) => {
      queryClient.setQueryData([USER_QUERY_KEY], data)
      setError(null)
    },
    onError: (error) => {
      setError(error as Error)
    },
  })

  const updateUser = (data: LoginFormData, onSuccess?: () => void) => {
    loginMutation.mutate(data, {
      onSuccess,
    })
  }

  const clearUser = (onSuccess?: () => void) => {
    removeQuery([USER_QUERY_KEY])
    onSuccess?.()
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
    updateUser,
    clearUser,
    refetchUser,
    isLoading: loginMutation.isPending,
    error,
  }
}
