/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'uno.css'
import '@unocss/reset/normalize.css' // 리셋 스타일 불러오기

async function enableMocking() {
  // 개발 환경에서만 MSW를 활성화
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  
})