import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'
import { USER_QUERY_KEY } from '../constants/queryKeys'
import { useRemoveQueries } from './useRemoveQueries'
import { fetchUser, login, LoginResponse, TokenResponse } from '../api/endpoints/auth'

interface UseAuthReturn {
  user: LoginResponse | undefined
  isLoading: boolean
  isAuthLoading: boolean
  error: Error | null
  updateUser: (data: TokenResponse, onSettled?: (data: LoginResponse | undefined, error: Error | null) => void) => void
  clearUser: (onSuccess?: () => void) => void
  refetchUser: () => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<Error | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const queryClient = useQueryClient()
  const { removeQuery } = useRemoveQueries()

  const handleAuthChange = async (userCredential: User | null) => {
    try {
      if (!userCredential) {
        handleAuthError()
        return
      }

      const token = await userCredential.getIdToken()
      if (!token) {
        handleAuthError()
        return
      }
      updateUser({ token }, handleAuthSettled)
    } catch (error) {
      if (error instanceof Error) {
        handleAuthError(error)
      } else {
        handleAuthError(new Error('An unknown error occurred'))
      }
    }
  }

  const handleAuthSuccess = () => {
    setError(null)
    setIsAuthLoading(false)
  }

  const handleAuthError = (err?: Error) => {
    removeQuery([USER_QUERY_KEY]) // 사용자 정보 제거
    setError(err || null)
    setIsAuthLoading(false)
  }

  const handleAuthSettled = () => {
    setIsAuthLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange)
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const user = queryClient.getQueryData<LoginResponse>([USER_QUERY_KEY])

  const loginMutation = useMutation<LoginResponse, Error, TokenResponse>({
    mutationFn: login,
    gcTime: 1000 * 60 * 60, // 1시간
    onSettled: (data, error) => {
      if (data) {
        queryClient.setQueryData([USER_QUERY_KEY], data)
        handleAuthSuccess()
      }
      if (error) {
        handleAuthError(error)
      }
    },
  })

  const updateUser = (
    data: TokenResponse,
    onSettled?: (data: LoginResponse | undefined, error: Error | null) => void,
  ) => {
    loginMutation.mutate(data, {
      onSettled: (data, error) => {
        if (onSettled) {
          onSettled(data, error)
        }
      },
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
    isLoading: loginMutation.isPending,
    isAuthLoading,
    error,
    updateUser,
    clearUser,
    refetchUser,
  }
}
