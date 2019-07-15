import { ClientService } from './ClientService'

import { postRequest, getRequest } from '../http'

import { loginUser } from '../auth/loginUser'

import { getHeaders } from '../util/getHeaders'
import { errorHandler } from '../util/errorHandler'

import { JwtTokensInterface } from '..'

export class AuthService {
    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokensInterface = {
        access: '',
        refresh: '',
    }
    private API_URL = ClientService.MYTHX_API_ENVIRONMENT

    constructor(ethAddress?: string, password?: string) {
        this.ethAddress = ethAddress as string
        this.password = password as string
    }

    public async login(ethAddress?: string, password?: string): Promise<JwtTokensInterface | undefined> {
        try {
            if (ethAddress && password) {
                this.ethAddress = ethAddress
                this.password = password
            }
            const result = await loginUser(this.ethAddress, this.password, `${this.API_URL}/auth/login`)
            const tokens: JwtTokensInterface = result.data.jwtTokens
            this.setCredentials(tokens)

            return tokens
        } catch (err) {
            errorHandler(err)
        }
    }

    /**
     *  Login to the API using metamask challenge result message.
     *  In order to get the object containing the message, use `getChallenge` and handle Metamask login in the frontend.
     * @param signature message.value property contained in object returned from `getChallenge`.
     * @param provider pass a provider value for the HTTP headers. If nothing is passed defaults to MetaMask
     * @return {Promise<JwtTokensInterface>}  Returns an object containing two tokens (access+refresh) that can be saved in storage.
     */
    public async loginWithSignature(
        signature: string,
        provider: string = 'MetaMask',
    ): Promise<JwtTokensInterface | void> {
        try {
            const headers = {
                Authorization: `${provider} ${signature}`,
            }
            const result = await postRequest(`${this.API_URL}/auth/login`, null, headers)
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

                const result = await postRequest(`${this.API_URL}/auth/logout`, {}, headers)
                this.jwtTokens.access = this.jwtTokens.refresh = ''

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('MythxJS no valid token found. Please login')
        }
    }

    public async getVersion() {
        try {
            const result = await getRequest(`${this.API_URL}/version`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getOpenApiHTML() {
        try {
            const result = await getRequest(`${this.API_URL}/openapi`, null)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getOpenApiYAML() {
        try {
            const result = await getRequest(`${this.API_URL}/openapi.yaml`, null)

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

                const result = await getRequest(`${this.API_URL}/stats/users-analyses?${queryString}`, headers)

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('MythxJS no valid token found. Please login.')
        }
    }

    /**
     *  Generates authentication challenge (Metamask only for now).
     *  The Metamask flow needs to be handled on the front end since MythXJS does not have Web3 dependencies.
     * @param ethAddress Ethereum address for Mythx account
     * @returns Resolves with API response or throw error
     */
    public async getChallenge(ethAddress?: string): Promise<any | void> {
        try {
            const address = ethAddress ? ethAddress : this.ethAddress
            const result = await getRequest(`${this.API_URL}/auth/challenge?ethAddress=${address}`, {})
            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    /**
     * Retrieve list of registred API users or just caller user object if no required permission.
     * @param queryString Query string for detailed list (query parameters: offset, orderBy, email, ethAddress)
     * @returns Resolves with API response or throw error
     */

    public async getUsers(queryString: string = '') {
        if (this.isUserLoggedIn()) {
            try {
                const { headers, accessToken } = await getHeaders(this.jwtTokens)
                this.jwtTokens.access = accessToken

                const result = await getRequest(`${this.API_URL}/users?${queryString}`, headers)

                return result.data
            } catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('MythxJS no valid token found. Please login.')
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
