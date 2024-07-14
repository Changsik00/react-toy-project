import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold'>Sign Up Page</h1>
        <i className='i-carbon-user text-4xl'></i>
        <button className='i-carbon-sun' />
        <div className='mt-4 flex w-full items-center justify-center gap-x-4 p-2 text-4xl'>
          <div className='i-vscode-icons:file-type-light-pnpm' />
          <div className='i-vscode-icons:file-type-light-pnpm?mask text-red-300' />
        </div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
