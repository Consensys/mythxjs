import { getAnalyses } from '../analyses/getAnalyses'

import { AuthService } from './AuthService'

import { getHeaders } from '../util/getHeaders'

import { getTokens } from '../util/getTokens'
import { errorHandler } from '../util/errorHandler'


export class AnalysesService {
    private apiUrl: string = process.env.API_URL_STAGING || ''
    private AUTHSERVICE: any

    constructor() {
    }

    public async getAnalysesList() {
        console.log('invoke getAnalysesList')
        try {
            const { access } = getTokens('tokens.json')
            const headers = getHeaders(access)

            console.log(access, 'access')
            console.log(headers, 'header')
            console.log(`${this.apiUrl}`)

            const result = await getAnalyses(`${this.apiUrl}/analyses`, headers)
            console.log(result.data)
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public getAnalysisStatus() {
    }

    public getDetectedIssues() { }

    public submitContract() { }

}
