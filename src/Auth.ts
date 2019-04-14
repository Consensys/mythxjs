import * as jwt from 'jsonwebtoken'

// Types
import { IAuth, IToken } from '../types'

// Constants
import { API_URL, LOGIN_API, LOGOUT_API, REFRESH_API } from './constants'

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

  public async logout() {
    if (this.isLoggedIn()) {
      return authService
        .deleteCredentials(this.accessToken, API_URL.staging + LOGOUT_API)
        .then(() => {
          this.accessToken = ''
          this.refreshToken = ''
        })
        .catch(err => {
          throw err
        })
    } else {
      throw new Error(`User is not logged in`)
    }
  }

  public async refresh() {
    if (this.isLoggedIn()) {
      return authService
        .refreshAccess(
          this.accessToken,
          this.refreshToken,
          API_URL.staging + REFRESH_API
        )
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
    } else {
      throw new Error(`User is not logged in`)
    }
  }

  public isLoggedIn() {
    return !!this.accessToken && !!this.refreshToken
  }

  public async validateTokens() {
    if (this.isLoggedIn()) {
      const accessTokenExp = (jwt.decode(this.accessToken) as IToken).exp
      const refreshTokenExp = (jwt.decode(this.refreshToken) as IToken).exp
      const now = Date.now() / 1000

      if (now < accessTokenExp) {
        // Access token is still valid
      } else if (accessTokenExp < now && now < refreshTokenExp) {
        // Refresh tokens validity
        await this.refresh()
      } else {
        // Access and refresh tokens have expired
        await this.login()
      }
    } else {
      throw new Error(`User is not logged in`)
    }
  }
}
