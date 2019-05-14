import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import { submitBytecodeRequest } from '../util/submitBytecodeRequest'

import { getTokensNode } from '../node'

import { API_URL_PRODUCTION, API_URL_STAGING, tokenLocation } from '../util/constants'

import { JwtTokensInterface, SubmitContractRes } from '..'

import { submitContractRequest } from '../analyses/submitContractRequest'

export class AnalysesService {
    public token
    private apiUrl: string = API_URL_PRODUCTION

    constructor(token?) {
        this.token = token
    }

    public async getAnalysesList() {
        try {
            let headers;
            if (this.token) {
                headers = getHeaders(this.token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode(tokenLocation)
                headers = getHeaders(jwtTokens.access)
            }

            const result = await getRequest(`${this.apiUrl}/analyses`, headers)
            console.log('getAnalysesList result', result.data)
            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            let headers;
            if (this.token) {
                headers = getHeaders(this.token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode(tokenLocation)
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
            let headers;
            if (this.token) {
                headers = getHeaders(this.token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode(tokenLocation)
                headers = getHeaders(jwtTokens.access)
            }

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, headers)
            console.log('GetDetectedIssues response:', result.data)
            return result.data
        } catch (error) {
            throw new Error(`Error with your request. ${error.data}`)
        }
    }

    public async submitContract(contractName: string, path?: string, bytecode?: string): Promise<SubmitContractRes | undefined> {
        try {
            let headers;
            if (this.token) {
                headers = getHeaders(this.token)
            } else {
                const jwtTokens: JwtTokensInterface = getTokensNode(tokenLocation)
                headers = getHeaders(jwtTokens.access)
            }

            if (bytecode) {
                const request = submitBytecodeRequest(bytecode)
                const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
                console.log('submitContract with bytecode only response:', result.data)
                return result.data
            }

            console.log(path, 'path to the contract')
            const request = await submitContractRequest(contractName, path as string)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
            console.log('submitContract response:', result.data)
            return result.data
        } catch (error) {
            throw new Error(`Error with submit contract request. ${error.data}`)
        }
    }

}
