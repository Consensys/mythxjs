import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import {
    generateBytecodeRequest,
    generateSourceCodeRequest,
    generateAnalysisRequest,
} from '../util/generateContractsRequests'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'

import { isTokenValid } from '../util/validateToken'

import { SubmitContractRes, JwtTokensInterface, AnalyzeOption } from '..'

export class AnalysesService {
    private apiUrl: string = API_URL_PRODUCTION
    private jwtTokens: JwtTokensInterface

    constructor(jwtTokens: JwtTokensInterface) {
        if (isTokenValid(jwtTokens.access)) {
            this.jwtTokens = jwtTokens as JwtTokensInterface
        } else {
            throw new Error('Access token has expired or is invalid!')
        }
    }

    public async getAnalysesList() {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const result = await getRequest(`${this.apiUrl}/analyses`, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}`, headers)
            console.log('getAnalysisStatus response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getDetectedIssues(uuid: string) {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const getStatus = await this.getAnalysisStatus(uuid)
            if (getStatus.status === 'Queued') {
                await new Promise(resolve => {
                    const timer = setInterval(async () => {
                        const analysisReq = await this.getAnalysisStatus(uuid)
                        if (analysisReq.status === 'Finished' || analysisReq.status === 'Error') {
                            clearInterval(timer)
                            resolve('done')
                        }
                    }, 5000)
                })
            }

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, headers)
            console.log('GetDetectedIssues response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async submitBytecode(bytecode: string, toolName?: string): Promise<SubmitContractRes | void> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateBytecodeRequest(bytecode, toolName)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
            console.log('submitContract with bytecode only response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async submitSourceCode(
        sourceCode: string,
        contractName: string,
        toolName?: string,
    ): Promise<SubmitContractRes | void> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateSourceCodeRequest(sourceCode, contractName, toolName)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
            console.log('submitContract with sourcecode only response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async analyze(options: AnalyzeOption): Promise<any> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateAnalysisRequest(options)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, headers)
            console.log('submitContract with analyze object response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }
}
