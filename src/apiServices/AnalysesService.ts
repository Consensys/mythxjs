import { getAnalyses } from '../analyses/getAnalyses'
import { AuthService } from './AuthService'
import { getHeaders } from '../util/getHeaders'


export class AnalysesService {
    private apiUrl: string = process.env.API_URL_STAGING || ''
    private AUTHSERVICE: any

    constructor() {
        this.AUTHSERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial')
    }

    public async getAnalysesList() {
        console.log('invoke getAnalysesList')
        try {
            const tokens = await this.AUTHSERVICE.login()
            const headers = getHeaders(tokens.access)
            console.log(tokens)
            console.log(headers)
            const result = await getAnalyses(`${this.apiUrl}/analyses`, headers)
            console.log(result.data)
        }
        catch (err) {
            throw new Error(`Error with getting list of analysis. ${err}`)
        }
    }

    public getAnalysisStatus() { }

    public getDetectedIssues() { }

    public submitContract() { }

}
