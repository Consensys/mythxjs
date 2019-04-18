import { loginUser } from '../auth/loginUser'
import { logoutUser } from '../auth/logoutUser'
import { getHeaders } from '../util/getHeaders'

interface JwtTokens {
    access: string
    refresh: string
}

export class AuthService {

    public ethAddress: string
    public password: string
    public jwtTokens: JwtTokens = {
        access: '',
        refresh: ''
    }
    private apiUrl: string = process.env.API_URL_STAGING || ''

    constructor(ethAddress: string, password: string) {
        this.ethAddress = ethAddress
        this.password = password

    }

    public async login(): Promise<JwtTokens> {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${this.apiUrl}/auth/login`)
            const tokens: JwtTokens = result.data.jwtTokens
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
                throw new Error(`There was an error with the logout request`)
            }
        } else {
            throw new Error('No valid token found')
        }
    }

    isUserLoggedIn() {
        // TODO: CHECK IF USER IS LOGGED IN 
        // NEED MORE CLARITY ON DIFFERENT ENVS (NODE/BROWSER)
        return true;
    }


    setCredentials(tokens: JwtTokens) {
        this.jwtTokens.access = tokens.access
        this.jwtTokens.refresh = tokens.refresh
    }


}