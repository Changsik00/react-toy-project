import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'
import './index.css'
import 'uno.css'
import '@unocss/reset/normalize.css' // 리셋 스타일 불러오기
import { I18nextProvider } from 'react-i18next'
import i18n from './locales/i18n'

async function enableMocking() {
  // 개발 환경에서만 MSW를 활성화
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')
  worker.start()
}

const queryClient = new QueryClient()

enableMocking().then(() => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </I18nextProvider>
    </React.StrictMode>,
  )
})
