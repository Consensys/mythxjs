// Types
import { IAuth } from '../types'

// Constants
import { API_URL, LOGIN_API } from './constants'

// Services
import * as authService from './services/auth'

export default class Auth {
  public accessToken: string = ''
  public ethAddress: string = ''
  public password: string = ''
  public refreshToken: string = ''

  constructor(ethAddress?: string, password?: string) {
    if (!ethAddress && !password) {
      this.getCredentials()
    } else {
      this.ethAddress = ethAddress as string
      this.password = password as string
    }
  }

  public getCredentials() {
    const data = authService.getCredentials() as IAuth

    if (Object.keys(data).length) {
      this.accessToken = data.accessToken
      this.ethAddress = data.ethAddress
      this.password = data.password
      this.refreshToken = data.refreshToken
    }
  }

  public async login() {
    if (this.isLoggedIn()) {
      throw new Error(`Already logged in as ${this.ethAddress}`)
    }

    return authService
      .login(this.ethAddress, this.password, API_URL.staging + LOGIN_API)
      .then(response => {
        this.accessToken = response.data.access
        this.refreshToken = response.data.refresh

        authService.saveCredentials({
          accessToken: this.accessToken,
          ethAddress: this.ethAddress,
          password: this.password,
          refreshToken: this.refreshToken
        })
      })
      .catch(err => {
        throw new Error(err.response.data.error)
      })
  }

  public logout() {
    if (this.isLoggedIn()) {
      authService.deleteCredentials()
    }
  }

  public isLoggedIn() {
    return !!this.accessToken && !!this.refreshToken
  }
}
