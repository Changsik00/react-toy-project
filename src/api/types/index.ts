export type AsyncReturnFunction<T> = () => Promise<T>

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export type Endpoint = {
  url: string
  method: Method
  noAuth?: boolean
}

export type Payload = {
  [key: string]: unknown
}

export type ApiResponse<T> = {
  status: number
  data: T
  message?: string
}
