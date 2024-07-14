/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'uno.css'
import '@unocss/reset/normalize.css' // 리셋 스타일 불러오기

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
