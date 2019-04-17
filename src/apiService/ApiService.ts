import { loginUser } from '../auth/loginUser'

export class ApiService {

    public ethAddress: string
    public password: string
    private apiUrl: string = process.env.API_URL_STAGING || ''

    constructor(ethAddress: string, password: string) {
        this.ethAddress = ethAddress
        this.password = password
    }

    async login() {
        try {
            const result = await loginUser(this.ethAddress, this.password, `${this.apiUrl}/auth/login`)
            console.log(result.data)
        }
        catch (err) {
            throw new Error(`There was an error with the request. ${err}`)
        }
    }
}