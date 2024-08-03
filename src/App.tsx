import { useState, useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <button onClick={toggleTheme} className='fixed right-4 top-4 rounded-full bg-blue-500 p-2 text-white'>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <AppRoutes />
    </div>
  )
}

export default App
