import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import { submitBytecodeRequest } from '../util/submitBytecodeRequest'

import { getTokensNode } from '../node'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'

import { JwtTokensInterface, SubmitContractRes } from '..'

import { submitContractRequest } from '../analyses/submitContractRequest'

export class AnalysesService {
    public tokens
    private apiUrl: string = API_URL_PRODUCTION

    constructor(tokens?) {
        this.tokens = tokens
    }

    public async getAnalysesList() {
        try {
            const { access } = getTokensNode('tokens.json')
            const headers = getHeaders(access)

            const result = await getRequest(`${this.apiUrl}/analyses`, headers)
            console.log('getAnalysesList result', result.data)
            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string, token?: string) {
        try {
            let headers: any;
            if (token) {
                headers = getHeaders(token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                headers = getHeaders(jwtTokens.access)
            }

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}`, headers)
            console.log('getAnalysisStatus response:', result.data)
            return result.data
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

    public async getDetectedIssues(uuid: string, token?: string) {
        try {
            let headers: any;
            if (token) {
                headers = getHeaders(token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                headers = getHeaders(jwtTokens.access)
            }

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, headers)
            console.log('GetDetectedIssues response:', result.data)
            return result.data
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

    public async submitContract(path?, bytecode?: string): Promise<SubmitContractRes | undefined> {
        try {
            const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
            const headers = getHeaders(jwtTokens.access)

            if (bytecode) {
                const request = submitBytecodeRequest(bytecode)
                const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
                console.log('submitContract with bytecode only response:', result.data)
                return result.data
            }

            console.log(path, 'path to the contract')
            const request = await submitContractRequest(path)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
            console.log('submitContract response:', result.data)
            return result.data
        } catch (error) {
            throw new Error(`Error with submit contract request. ${error.data}`)
        }
    }

}
