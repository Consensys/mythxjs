import { getAnalyses } from '../analyses/getAnalyses'

import { getHeaders } from '../util/getHeaders'

import { getTokens } from '../util/getTokens'
import { errorHandler } from '../util/errorHandler'

import { isBrowser, isNode } from 'browser-or-node';


export class AnalysesService {
    private API_URL_PRODUCTION = "https://api.mythx.io/v1"
    private apiUrl: string = 'https://staging.api.mythx.io/v1'

    constructor() {
    }

    public async getAnalysesList() {
        try {
            if (isNode) {
                const { access } = getTokens('tokens.json')
                const headers = getHeaders(access)

                console.log(access, 'access')
                console.log(headers, 'header')
                console.log(`${this.apiUrl}`)

                const result = await getAnalyses(`${this.apiUrl}/analyses`, headers)
                console.log(result.data)
            }
            return
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
