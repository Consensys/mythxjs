import { isBrowser, isNode } from 'browser-or-node';

import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'

import { getTokensNode } from '../node/getTokensNode'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'
import { ANALYSIS_MOCK } from '../util/mock'
import { JwtTokensInterface, SubmitContractRes } from '..'

import { compileContract } from '../util/compileContract'

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

    public async getAnalysisStatus(uuid: string, token?: string) {
        try {
            if (isNode) {
                let headers: any;
                if (token) {
                    headers = getHeaders(token)
                } else {
                    const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                    headers = getHeaders(jwtTokens.access)
                }

                console.log('getAnalysisStatus')
                const result = await getRequest(`${API_URL_PRODUCTION}/analyses/${uuid}`, headers)
                console.log(result.data, 'result analysis status')
                return result.data
            }
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

    public async getDetectedIssues(uuid: string, token?: string) {
        try {
            if (isNode) {
                let headers: any;
                if (token) {
                    console.log('tokennn')
                    headers = getHeaders(token)
                } else {
                    const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                    headers = getHeaders(jwtTokens.access)
                }


                const result = await getRequest(`${API_URL_PRODUCTION}/analyses/${uuid}/issues`, headers)
                return result.data
            }
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

    public async submitContract(token?: string): Promise<SubmitContractRes | undefined> {
        try {
            if (isNode) {
                // let headers: any;
                // if (token) {
                //     console.log('tokennn')
                //     headers = getHeaders(token)
                // } else {
                //     const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                //     headers = getHeaders(jwtTokens.access)
                // }


                // console.log('submit Contract')
                // console.log(headers)
                // const result = await postRequest(`${API_URL_PRODUCTION}/analyses`, ANALYSIS_MOCK, headers)
                // console.log(result.data, 'result')

                // return result.data
                console.log('ciaobelli')
                compileContract('__contracts/vulnerable.sol')

                return undefined
            }
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

}
