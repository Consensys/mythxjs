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

            return tokens
        } catch (err) {
            errorHandler(err)
        }
    }

    public async loginWithMetamask(message: string): Promise<JwtTokensInterface | void> {
        try {
            const headers = {
                Authorization: `MetaMask ${message}`,
            }
            const result = await postRequest(`${API_URL_PRODUCTION}/auth/login`, null, headers)
            const tokens: JwtTokensInterface = result.data.jwtTokens
            this.setCredentials(tokens)

            return tokens
        } catch (err) {
            errorHandler(err)
        }
    }

    public async logout() {
        if (this.isUserLoggedIn()) {
            try {
                const { headers, accessToken } = await getHeaders(this.jwtTokens)
                this.jwtTokens.access = accessToken

                const result = await postRequest(`${API_URL_PRODUCTION}/auth/logout`, {}, headers)
                this.jwtTokens.access = this.jwtTokens.refresh = ''

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('MythxJS no valid token found. Please login')
        }
    }

    public async refreshToken(jwtTokens?: JwtTokensInterface) {
        try {
            let reqBody: JwtTokensInterface = this.jwtTokens

            // assign to parameter if passed
            if (jwtTokens) {
                reqBody = jwtTokens
            }

            const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, {})
            const tokens: JwtTokensInterface = result.data.jwtTokens
            this.setCredentials(tokens)

            return tokens
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getVersion() {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/version`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getOpenApiHTML() {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/openapi`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getOpenApiYAML() {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/openapi.yaml`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getStats(queryString?: string) {
        if (this.isUserLoggedIn()) {
            try {
                const { headers, accessToken } = await getHeaders(this.jwtTokens)
                this.jwtTokens.access = accessToken

                const result = await getRequest(`${API_URL_PRODUCTION}/stats/users-analyses?${queryString}`, headers)

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('MythxJS no valid token found. Please login.')
        }
    }

    public async getChallenge(): Promise<any | void> {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/auth/challenge?ethAddress=${this.ethAddress}`, {})
            return result.data
        } catch (err) {
            console.error(err)
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
