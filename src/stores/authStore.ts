import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { USER_QUERY_KEY } from '../constants/queryKeys'
import { fetchUser, login, LoginResponse, TokenResponse } from '../api/endpoints/auth'
import { removeQuery } from '../utils/removeQueries' // 유틸리티 함수 import
import { queryClient } from '../main'

interface AuthState {
  user: LoginResponse | null
  isAuthLoading: boolean
  error: Error | null
  initializeAuth: () => void
  updateUser: (
    data: TokenResponse,
    onSettled?: (data: LoginResponse | undefined, error: Error | null) => void,
  ) => Promise<void>
  refetchUser: () => Promise<void>
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => {
      return {
        user: null,
        isAuthLoading: true,
        error: null,
        initializeAuth: () => {
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
            if (firebaseUser) {
              set({ isAuthLoading: true })

              try {
                const token = await firebaseUser.getIdToken()
                await get().updateUser({ token })
              } catch (error) {
                set({ error: error as Error, isAuthLoading: false })
              }
            } else {
              set({ user: null, isAuthLoading: false })
              removeQuery(queryClient, [USER_QUERY_KEY])
            }
          })

          return unsubscribe
        },
        updateUser: async (data, onSettled) => {
          set({ isAuthLoading: true })
          try {
            const response = await queryClient.fetchQuery({
              queryKey: [USER_QUERY_KEY],
              queryFn: () => login(data),
              staleTime: 1000 * 60 * 60,
            })
            set({ user: response, isAuthLoading: false })
            if (onSettled) {
              onSettled(response, null)
            }
          } catch (error) {
            set({ error: error as Error, isAuthLoading: false })
            if (onSettled) {
              onSettled(undefined, error as Error)
            }
          }
        },
        refetchUser: async () => {
          const user = get().user
          if (!user) {
            throw new Error('User is not logged in')
          }
          try {
            const fetchedUser = await fetchUser(user.id)
            set({ user: fetchedUser })
            queryClient.setQueryData([USER_QUERY_KEY], fetchedUser)
          } catch (error) {
            set({ error: error as Error })
          }
        },
        clearUser: () => {
          removeQuery(queryClient, [USER_QUERY_KEY])
          set({ user: null, isAuthLoading: false, error: null })
        },
      }
    },
    { name: 'authStore' },
  ),
)
