// src/tests/Login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('allows users to log in and redirects to dashboard', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'qwerQWER1234!' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText(/Welcome!/i)).toBeInTheDocument()
  })
})
