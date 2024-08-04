import { HttpClient } from '../httpClient'
import { Endpoint, Payload } from '../types'
import { delay } from '../../utils/delay'

export class PollingManager<T> {
  #httpClient: HttpClient
  #endpoint: Endpoint
  #payload: Payload
  #delayTime: number
  #maxAttemptsCount: number
  #shouldStopPolling: (data: T) => boolean
  #attempts: number = 0
  #stopPolling: boolean = false

  constructor(
    httpClient: HttpClient,
    endpoint: Endpoint,
    payload: Payload,
    delayTime: number = 300,
    maxAttemptsCount: number = Infinity,
    shouldStopPolling: (data: T) => boolean = () => false,
  ) {
    this.#httpClient = httpClient
    this.#endpoint = endpoint
    this.#payload = payload
    this.#delayTime = delayTime
    this.#maxAttemptsCount = maxAttemptsCount
    this.#shouldStopPolling = shouldStopPolling
  }

  async #pollFunction(): Promise<T | undefined> {
    if (this.#attempts >= this.#maxAttemptsCount) {
      throw new Error('Max attempts count exceeded')
    }

    try {
      const response = await this.#httpClient.request<T>(this.#endpoint, this.#payload)

      if (this.#shouldStopPolling(response.data)) {
        return response.data
      }

      this.#attempts++
      await delay(this.#delayTime)

      if (this.#stopPolling) {
        return undefined
      }

      return this.#pollFunction()
    } catch (error) {
      console.error('Polling error:', error)
      throw error
    }
  }

  async start(): Promise<T | undefined> {
    this.#stopPolling = false
    this.#attempts = 0

    return this.#pollFunction()
  }

  stop() {
    this.#stopPolling = true
  }
}
