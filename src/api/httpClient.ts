import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { PollingManager } from './managers/pollingManager'
import { TokenManager } from './managers/tokenManager'
import { Endpoint, Payload } from './types/common'

function isAwsS3OrSignedUrl(url?: string): boolean {
  if (!url) return false
  // eslint-disable-next-line no-useless-escape
  const awsS3Pattern = /^https:\/\/s3\.[^\.]+\.amazonaws\.com\/.+/
  const signedUrlPattern = /.+\?X-Amz-Signature=.+/
  return awsS3Pattern.test(url) || signedUrlPattern.test(url)
}

export class HttpClient {
  #instance: AxiosInstance

  constructor() {
    this.#instance = axios.create()

    this.#instance.interceptors.response.use((response) => {
      response.data = response.data.result || response.data
      return response
    }, this.#handleError)
  }

  #handleError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      // TODO: Sentry 연동
    }
    return Promise.reject(error)
  }

  #getAuthorizationHeader = async (endpoint: Endpoint): Promise<{ headers?: { Authorization?: string } }> => {
    if (endpoint.noAuth || isAwsS3OrSignedUrl(endpoint?.url)) {
      return {}
    }

    const accessToken = await TokenManager.getAccessToken()
    if (!accessToken) {
      throw new Error('Access token is not available')
    }
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }

  #getPayloadConfig(isQueryParamMethod: boolean, payload?: Payload) {
    if (!payload) return {}

    return isQueryParamMethod ? { params: payload } : { data: payload }
  }

  async request<T>(endpoint: Endpoint, payload?: Payload): Promise<AxiosResponse<T>> {
    const { url, method } = endpoint
    const headers = await this.#getAuthorizationHeader(endpoint)

    const isQueryParamMethod = method === 'get' || method.toLowerCase() === 'delete'

    return await this.#instance.request({
      url,
      method,
      ...this.#getPayloadConfig(isQueryParamMethod, payload),
      ...headers,
    })
  }

  pollingRequest<T>(
    endpoint: Endpoint,
    payload: Payload,
    delayTime: number,
    maxAttemptsCount: number,
    shouldStopPolling: (data: T) => boolean,
  ): PollingManager<T> {
    const pollingManager = new PollingManager<T>(
      this,
      endpoint,
      payload,
      delayTime,
      maxAttemptsCount,
      shouldStopPolling,
    )
    pollingManager.start()
    return pollingManager
  }
}
