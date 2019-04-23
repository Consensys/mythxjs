import { isBrowser, isNode } from 'browser-or-node';

import { loginUser } from '../auth/loginUser'
import { logoutUser } from '../auth/logoutUser'
import { refreshToken } from '../auth/refreshToken'

import { saveTokensNode } from '../node/saveTokensNode'
import { saveTokensStorage } from '../browser/saveTokensStorage'

import { getHeaders } from '../util/getHeaders'
import { getTokens } from '../util/getTokens'

import { JwtTokensInterface } from '..'

export class AuthService {

    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokensInterface = {
        access: '',
        refresh: ''
    }
    private apiUrl: string = process.env.API_URL_STAGING || 'https://staging.api.mythx.io/v1'

    constructor(ethAddress: string, password: string) {
        this.ethAddress = ethAddress
        this.password = password

    }

    public async login(): Promise<JwtTokensInterface> {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${this.apiUrl}/auth/login`)
            const tokens: JwtTokensInterface = result.data.jwtTokens
            this.setCredentials(tokens)
            return tokens
        }
        catch (err) {
            // TODO: HANDLE ALL DIFFERENT TYPES OF ERRORS
            throw new Error(`There was an error with the login request. ${err}`)
        }
    }

    public async logout() {
        if (this.isUserLoggedIn()) {
            try {
                // BELOW TO GO FOR BETTER HANDLING CODE
                // TODO: CALL ISUSERLOGGEDIN METHOD
                await this.login();

                const headers = getHeaders(this.jwtTokens.access)
                const result = await logoutUser(`${this.apiUrl}/auth/logout`, headers)
                console.log(result.data)
            }
            catch (err) {
                throw new Error(`There was an error with the logout request. ${err}`)
            }
        } else {
            throw new Error('No valid token found')
        }
    }

    public async refreshToken() {
        try {
            await this.login()

            const headers = getHeaders(this.jwtTokens.access)
            const reqBody = {
                jwtTokens: this.jwtTokens,
                accessToken: this.jwtTokens.access,
                refreshToken: this.jwtTokens.refresh
            }

            const result = await refreshToken(`${this.apiUrl}/auth/refresh`, reqBody, headers)
            console.log(result.data)

        } catch (err) {
            throw new Error(`There was an error with the refresh request. ${err}`)
        }
    }

    isUserLoggedIn() {
        // TODO: CHECK IF USER IS LOGGED IN 
        // NEED MORE CLARITY ON DIFFERENT ENVS (NODE/BROWSER)
        return true;
    }


    // TODO: ABSTRACT BELOW TO ITS OWN LAYER?
    setCredentials(tokens: JwtTokensInterface) {
        this.jwtTokens.access = tokens.access
        this.jwtTokens.refresh = tokens.refresh

        if (isBrowser) {
            saveTokensStorage(tokens)
        }

        if (isNode) {
            saveTokensNode(tokens, 'tokens.json')
        }
    }


    getCredentials() {
        const foo = getTokens('tokens.json')
        console.log(foo)
    }

}