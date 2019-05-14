import { postRequest, getRequest } from '../http'

import { loginUser } from '../auth/loginUser'

import { saveTokensNode, removeTokensNode, getTokensNode, isUserLoggedInNode } from '../node'

import { getHeaders } from '../util/getHeaders'
import { errorHandler } from '../util/errorHandler'
import { API_URL_PRODUCTION, API_URL_STAGING, tokenLocation } from '../util/constants'

import { JwtTokensInterface } from '..'

export class AuthServiceNode {

    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokensInterface = {
        access: '',
        refresh: ''
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
        }
        catch (err) {
            // errorHandler(err)
            console.error(err)
        }
    }

    public async logout() {
        if (this.isUserLoggedIn()) {
            try {
                const { access } = getTokensNode(tokenLocation)
                const headers = getHeaders(access)

                await postRequest(`${API_URL_PRODUCTION}/auth/logout`, {}, headers)
                removeTokensNode(tokenLocation)
            }
            catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('No valid token found')
        }
    }

    public async refreshToken() {
        //TODO: CHECK IF TOKEN IS PASSED AS PARAMETER TO FUNCTION INSTEAD
        try {
            const jwtTokens: JwtTokensInterface = getTokensNode(tokenLocation)
            const headers = getHeaders(jwtTokens.access)
            const reqBody = {
                jwtTokens: jwtTokens
            }
            const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, headers)
            console.log(result.data, 'result')
            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getVersion() {
        try {
            const result = await getRequest(`${API_URL_PRODUCTION}/version`, null)
            console.log(`Version:${JSON.stringify(result.data)}`)
            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    private isUserLoggedIn() {
        return isUserLoggedInNode(tokenLocation)
    }

    private setCredentials(tokens: JwtTokensInterface) {
        this.jwtTokens.access = tokens.access
        this.jwtTokens.refresh = tokens.refresh

        saveTokensNode(tokens, tokenLocation)
    }
} 