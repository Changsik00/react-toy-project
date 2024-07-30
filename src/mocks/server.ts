import { setupServer } from 'msw/node'
import { handlers } from './handlers' // 핸들러를 정의한 파일

export const server = setupServer(...handlers)
