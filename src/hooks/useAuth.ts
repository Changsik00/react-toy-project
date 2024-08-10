import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, fetchUser, Token, LoginResponseData } from '../api/endpoints/auth'
import { USER_QUERY_KEY } from '../constants/queryKeys'
import { useRemoveQueries } from './useRemoveQueries'

interface UseAuthReturn {
  user: LoginResponseData | undefined
  updateUser: (data: Token, onSuccess?: () => void) => void
  clearUser: (onSuccess?: () => void) => void
  refetchUser: () => Promise<void>
  isLoading: boolean
  error: Error | null
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<Error | null>(null)
  const queryClient = useQueryClient()
  const { removeQuery } = useRemoveQueries()

  const user = queryClient.getQueryData<LoginResponseData>([USER_QUERY_KEY])

  const loginMutation = useMutation<LoginResponseData, Error, Token>({
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

  const updateUser = (data: Token, onSuccess?: () => void) => {
    loginMutation.mutate(data, {
      onSuccess,
    })
  }

  const clearUser = (onSuccess?: () => void) => {
    removeQuery([USER_QUERY_KEY])
    onSuccess?.()
  }

  const refetchUser = async () => {
    if (!user) {
      throw new Error('User is not logged in')
    }
    try {
      const fetchedUser = await fetchUser(user.id)
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
