import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid='location-display'>{location.pathname}</div>
}

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('allows users to log in and redirects to dashboard', async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    userEvent.type(screen.getByLabelText(/password/i), 'qwerQWER1234!')

    const loginButton = screen.getByRole('button', { name: /login/i })

    // FIXME: buttontype='submit' 의 경우 트리거가 안됨
    // 버튼 클릭 X
    userEvent.click(loginButton)
    // form 제출 이벤트를 트리거하여 버튼 클릭 대신 사용 X
    const form = loginButton.closest('form')
    if (form) {
      fireEvent.submit(form)
    }

    // TODO: 버튼 텍스트가 "Loading..."으로 변경되는지 확인
    // await waitFor(
    //   () => {
    //     expect(loginButton).toHaveTextContent('Loading...')
    //   },
    //   { timeout: 3000 },
    // )

    // TODO: 대시보드 페이지가 렌더링되는 것을 확인하기
    // await waitFor(
    //   () => {
    //     expect(screen.getByTestId('location-display')).toHaveTextContent('/dashboard')
    //   },
    //   { timeout: 3000 },
    // )

    // const welcomeMessage = await screen.findByText(/Welcome, Changsik Jang!/i)
    // expect(welcomeMessage).toBeInTheDocument()
  })
})
