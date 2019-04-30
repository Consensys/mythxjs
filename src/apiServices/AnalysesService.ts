import { isBrowser, isNode } from 'browser-or-node';

import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'

import { getTokensNode } from '../node/getTokensNode'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'
import { ANALYSIS_MOCK } from '../util/mock'
import { JwtTokensInterface, SubmitContractRes } from '..'

export class AnalysesService {
    private API_URL_PRODUCTION = "https://api.mythx.io/v1"
    private apiUrl: string = 'https://staging.api.mythx.io/v1'
    public tokens

    constructor(tokens?) {
        this.tokens = tokens
    }

    public async getAnalysesList() {
        try {
            if (isNode) {

                const { access } = getTokensNode('tokens.json')
                const headers = getHeaders(access)

                console.log(access, 'access')
                console.log(headers, 'header')
                console.log(`${this.apiUrl}`)

                const result = await getRequest(`${this.apiUrl}/analyses`, headers)
                console.log(result.data)
            }
            return
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            if (isNode) {
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                const headers = getHeaders(jwtTokens.access)

                console.log('before')
                const result = await getRequest(`${API_URL_PRODUCTION}/analyses/${uuid}`, headers)
                console.log(result.data, 'result analysis status')
                return result.data
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    public async getDetectedIssues(uuid) {
        try {
            if (isNode) {
                console.log('issueee')
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                const headers = getHeaders(jwtTokens.access)
                const result = await getRequest(`${API_URL_PRODUCTION}/analyses/${uuid}/issues`, headers)
                console.log(result.data, 'result ')
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    public async submitContract(): Promise<SubmitContractRes | undefined> {
        try {
            if (isNode) {
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                const headers = getHeaders(jwtTokens.access)

                console.log('before')
                const result = await postRequest(`${API_URL_PRODUCTION}/analyses`, ANALYSIS_MOCK, headers)
                console.log(result.data, 'result')

                return result.data
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}
