import { describe, it, expect } from 'vitest'
import { login } from '@/api/endpoints/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebase' // Firebase 인증 가져오기
import { FirebaseError } from 'firebase/app'

describe('Login API', () => {
  it('should return 200 for valid credentials', async () => {
    // Firebase를 통해 유효한 사용자로 로그인
    const userCredential = await signInWithEmailAndPassword(auth, 'lowmans00@gmail.com', 'TestTest001!')
    const token = await userCredential.user.getIdToken()
    // 로그인 API 호출
    const response = await login({ token })
    expect(response.email).toBe('lowmans00@gmail.com')
  })

  it('should return 401 for invalid credentials', async () => {
    try {
      // 잘못된 사용자로 로그인 시도
      await signInWithEmailAndPassword(auth, 'lowmans00@gmail.com', 'wrongpassword')
    } catch (error) {
      if (error instanceof FirebaseError) {
        expect(error.code).toBe('auth/invalid-credential')
      }
    }
  })
})
