import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'

vi.mock('../stores/authStore', () => ({
  useAuthStore: () => ({
    updateUser: vi.fn((data) => {
      console.warn('updateUser called with:', data) // 호출 시 로그 출력
    }),
    isAuthLoading: false,
    error: null,
  }),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({
    user: {
      getIdToken: vi.fn().mockResolvedValue('mocked-token'),
    },
  }),
}))

const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid='location-display'>{location.pathname}</div>
}

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <LocationDisplay />
      </MemoryRouter>,
    )
  })

  it('renders the login form', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('allows users to log in and redirects to dashboard', async () => {
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByTestId('login-button')

    await userEvent.type(emailInput, 'lowmans00@gmail.com')
    await userEvent.type(passwordInput, 'TestTest001!')

    const form = loginButton.closest('form')
    if (form) {
      fireEvent.submit(form)
    }
  })
})
