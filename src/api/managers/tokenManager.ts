import { AsyncReturnFunction } from '../types/common'
import { auth } from '../../utils/firebase'
export class TokenManager {
  private static accessTokenFunction: AsyncReturnFunction<string> = async () => {
    throw new Error('Access token function is not initialized')
  }

  static init(getAccessToken: AsyncReturnFunction<string>) {
    if (typeof getAccessToken !== 'function') {
      throw new Error('Provided getAccessToken is not a function')
    }
    this.accessTokenFunction = getAccessToken
  }

  static async getAccessToken(): Promise<string> {
    return auth.currentUser?.getIdToken() ?? this.accessTokenFunction()
  }
}
