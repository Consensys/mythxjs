import { postRequest, getRequest } from '../http'

import { loginUser } from '../auth/loginUser'

import { getHeaders } from '../util/getHeaders'
import { errorHandler } from '../util/errorHandler'
import { API_URL_PRODUCTION } from '../util/constants'

import { JwtTokensInterface } from '..'

export class AuthService {
    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokensInterface = {
        access: '',
        refresh: '',
    }

    constructor(ethAddress?: string, password?: string) {
        this.ethAddress = ethAddress as string
        this.password = password as string
    }

    public async login(): Promise<JwtTokensInterface | undefined> {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${API_URL_PRODUCTION}/auth/login`)
            const tokens: JwtTokensInterface = result.data.jwtTokens
            this.setCredentials(tokens)
            console.log('You are logged in!')
            console.log(`Access: ${tokens.access}`)
            console.log(`Refresh: ${tokens.refresh}`)

            return tokens
        } catch (err) {
            errorHandler(err)
        }
    }

    public async logout() {
        if (this.isUserLoggedIn()) {
            try {
                const headers = getHeaders(this.jwtTokens)

                const result = await postRequest(`${API_URL_PRODUCTION}/auth/logout`, {}, headers)
                this.jwtTokens.access = this.jwtTokens.refresh = ''

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('No valid token found')
        }
    }

    public async refreshToken() {
        if (this.isUserLoggedIn()) {
            try {
                const headers = getHeaders(this.jwtTokens)
                const reqBody = {
                    jwtTokens: this.jwtTokens,
                }

                const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, headers)
                const tokens: JwtTokensInterface = result.data.jwtTokens
                this.setCredentials(tokens)

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        }
        throw new Error('No valid token found')
    }

    public async getVersion() {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/version`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    private isUserLoggedIn() {
        return !!this.jwtTokens.access && !!this.jwtTokens.refresh
    }

    private setCredentials(tokens: JwtTokensInterface) {
        this.jwtTokens.access = tokens.access
        this.jwtTokens.refresh = tokens.refresh
    }
}
