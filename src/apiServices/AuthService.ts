import { isBrowser, isNode } from 'browser-or-node';

import { loginUser } from '../auth/loginUser'
import { logoutUser } from '../auth/logoutUser'
import { refreshToken } from '../auth/refreshToken'

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

import { JwtTokensInterface } from '..'

export class AuthService {

    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokensInterface = {
        access: '',
        refresh: ''
    }
    private API_URL_PRODUCTION = "https://api.mythx.io/v1"
    private API_URL_STAGING: string = 'https://staging.api.mythx.io/v1'

    constructor(ethAddress?: string, password?: string) {
        this.ethAddress = ethAddress as string
        this.password = password as string

    }

    public async login(): Promise<JwtTokensInterface | undefined> {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${this.API_URL_STAGING}/auth/login`)
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

                    await logoutUser(`${this.API_URL_STAGING}/auth/logout`, headers)
                    removeTokensNode('tokens.json')
                } else if (isBrowser) {
                    const data: any = getTokensStorage()
                    const parsed = JSON.parse(data)
                    const { access } = parsed

                    const headers = getHeaders(access)
                    const result = await logoutUser(`${this.API_URL_STAGING}/auth/logout`, headers)

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
                const result = await refreshToken(`${this.API_URL_STAGING}/auth/refresh`, reqBody, headers)
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

                const result = await refreshToken(`${this.API_URL_STAGING}/auth/refresh`, reqBody, headers)
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