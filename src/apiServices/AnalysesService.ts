import { ClientService } from './ClientService'

import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import {
    generateBytecodeRequest,
    generateSourceCodeRequest,
    generateAnalysisRequest,
} from '../util/generateContractsRequests'

import { isTokenValid } from '../util/validateToken'

import { SubmitContractRes, JwtTokensInterface, AnalyzeOptions } from '..'

export class AnalysesService {
    private API_URL: string = ClientService.MYTHX_API_ENVIRONMENT
    private jwtTokens: JwtTokensInterface
    private toolName: string

    constructor(jwtTokens: JwtTokensInterface, toolName: string = 'MythXJS') {
        if (isTokenValid(jwtTokens.access)) {
            this.jwtTokens = jwtTokens as JwtTokensInterface
        } else {
            throw new Error('Access token has expired or is invalid! Please login again.')
        }
        this.toolName = toolName
    }

    public async getAnalysesList() {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const result = await getRequest(`${this.API_URL}/analyses`, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const result = await getRequest(`${this.API_URL}/analyses/${uuid}`, headers)

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
            if (getStatus.status === 'Queued' || getStatus.status === 'In progress') {
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

            const result = await getRequest(`${this.API_URL}/analyses/${uuid}/issues`, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async submitBytecode(bytecode: string): Promise<SubmitContractRes | void> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateBytecodeRequest(bytecode, this.toolName)

            const result = await postRequest(`${this.API_URL}/analyses`, request, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async submitSourceCode(sourceCode: string, contractName: string): Promise<SubmitContractRes | void> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateSourceCodeRequest(sourceCode, contractName, this.toolName)

            const result = await postRequest(`${this.API_URL}/analyses`, request, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async analyze(options: AnalyzeOptions): Promise<any> {
        try {
            const { headers, accessToken } = await getHeaders(this.jwtTokens)
            this.jwtTokens.access = accessToken

            const request = generateAnalysisRequest(options, this.toolName)

            const result = await postRequest(`${this.API_URL}/analyses`, request, headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }
}
