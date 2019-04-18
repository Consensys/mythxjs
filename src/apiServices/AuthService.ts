import { loginUser } from '../auth/loginUser'

interface JwtTokens {
    access: string
    refresh: string
}

export class AuthService {

    public ethAddress: string
    public password: string
    private apiUrl: string = process.env.API_URL_STAGING || ''

    constructor(ethAddress: string, password: string) {
        this.ethAddress = ethAddress
        this.password = password
    }

    async auth() {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${this.apiUrl}/auth/login`)
            console.log(`ACCESS: ${result.data.jwtTokens.access}`)
            console.log(`REFRESH ${result.data.jwtTokens.refresh}`)
            const tokens: JwtTokens = result.data.jwtTokens
            return tokens
        }
        catch (err) {
            throw new Error(`There was an error with the request. ${err}`)
        }
    }

    async login() {
        const tokens = await this.auth()
        return tokens
    }
}