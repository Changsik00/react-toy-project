import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, fetchUser, LoginFormData, LoginResponseData } from '../api/auth'
import { useState } from 'react'

const USER_QUERY_KEY = ['user'] // 두번째 인자로 사용할 부분이 없어서 상수로 변경

export const useAuth = () => {
  const [error, setError] = useState<Error | null>(null)
  const queryClient = useQueryClient()

  const user = queryClient.getQueryData<LoginResponseData>(USER_QUERY_KEY) ?? null

  const loginMutation = useMutation<LoginResponseData, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEY, data)
      setError(null)
    },
    onError: (error) => {
      console.error('Error during login request:', error)
      setError(error as Error)
    },
  })

  const handleLogin = (data: LoginFormData, onSuccess?: () => void) => {
    loginMutation.mutate(data, {
      onSuccess,
    })
  }

  const handleLogout = () => {
    queryClient.removeQueries({ queryKey: USER_QUERY_KEY })
  }

  const refetchUser = async () => {
    try {
      const fetchedUser = await fetchUser(user?.id || 1) // 실제 사용자 ID로 변경 필요
      queryClient.setQueryData(USER_QUERY_KEY, fetchedUser)
    } catch (error) {
      console.error('Error fetching user:', error)
      setError(error as Error)
    }
  }

  return {
    user,
    handleLogin,
    handleLogout,
    refetchUser,
    isLoading: loginMutation.isPending, // 'isPending'으로 상태 체크
    error, // 에러 상태 추가
  }
}
