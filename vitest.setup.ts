import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './src/mocks/server'
import '@testing-library/jest-dom' // DOM 관련 matcher 추가

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
