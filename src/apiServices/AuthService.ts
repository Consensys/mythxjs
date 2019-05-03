import { isBrowser, isNode } from 'browser-or-node';

import { postRequest, getRequest } from '../http'

import { loginUser } from '../auth/loginUser'

import { saveTokensNode } from '../node/saveTokensNode'
import { removeTokensNode } from '../node/removeTokensNode'
import { getTokensNode } from '../node/getTokensNode'
import { isUserLoggedInNode } from '../node/isUserLoggedInNode'

import { saveTokensStorage } from '../browser/saveTokensStorage'
import { removeTokensStorage } from '../browser/removeTokensStorage'
import { getTokensStorage } from '../browser/getTokensStorage'
import { isUserLoggedInStorage } from '../browser/isUserLoggedInStorage'

import { getHeaders } from '../util/getHeaders'
import { errorHandler } from '../util/errorHandler'
import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'

import { JwtTokensInterface } from '..'

export class AuthService {

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
            console.log('fire login')
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
                // TODO: Abstract below code
                if (isNode) {
                    const { access } = getTokensNode('tokens.json')
                    const headers = getHeaders(access)

                    await postRequest(`${API_URL_PRODUCTION}/auth/logout`, {}, headers)
                    removeTokensNode('tokens.json')
                } else if (isBrowser) {
                    const data: any = getTokensStorage()
                    const parsed = JSON.parse(data)
                    const { access } = parsed

                    const headers = getHeaders(access)
                    const result = await postRequest(`${API_URL_PRODUCTION}/auth/logout`, {}, headers)

                    console.log(result.data)
                    removeTokensStorage()
                }
            }
            catch (err) {
                errorHandler(err)
            }
        } else {
            throw new Error('No valid token found')
        }
    }

    public async refreshToken() {
        //TODO: CHECK IF USER IS LOGGED IN AND HAS TOKEN STORED
        //TODO: ABSTRACT BELOW
        try {
            if (isNode) {

                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                const headers = getHeaders(jwtTokens.access)
                const reqBody = {
                    jwtTokens: jwtTokens
                }

                console.log(reqBody, 'reqBody')
                const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, headers)
                console.log(result.data, 'result')
            }
            else if (isBrowser) {
                const data: any = getTokensStorage()
                const parsed = JSON.parse(data)
                const { access } = parsed

                const headers = getHeaders(access)
                const reqBody = {
                    jwtTokens: parsed
                }

                const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, headers)
                console.log(result.data)
                const tokens: JwtTokensInterface = result.data.jwtTokens
                this.setCredentials(tokens)
            }

        } catch (err) {
            errorHandler(err)
        }
    }

    isUserLoggedIn() {
        if (isNode) {
            return isUserLoggedInNode('tokens.json')
        } else if (isBrowser) {
            return isUserLoggedInStorage()
        }
        return false;
    }


    // TODO: ABSTRACT BELOW TO ITS OWN LAYER?
    setCredentials(tokens: JwtTokensInterface) {
        this.jwtTokens.access = tokens.access
        this.jwtTokens.refresh = tokens.refresh

        if (isNode) {
            saveTokensNode(tokens, 'tokens.json')
        } else if (isBrowser) {
            console.log('save to local storage!')
            saveTokensStorage(tokens)
        }
    }
} 