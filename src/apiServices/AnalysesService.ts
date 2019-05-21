import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import { generateBytecodeRequest, generateSourceCodeRequest } from '../util/generateContractsRequests'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'

import { isTokenValid } from '../util/isTokenValid'

import { SubmitContractRes, JwtTokensInterface } from '..'

export class AnalysesService {
    public accessToken
    private apiUrl: string = API_URL_PRODUCTION
    private headers

    constructor(jwtTokens: JwtTokensInterface) {
        console.log(jwtTokens.access, 'marioo')
        if (isTokenValid(jwtTokens.access)) {
            console.log('TOKEN IS VALID FROM CONSTRUCT')
            this.accessToken = jwtTokens.access
            this.headers = getHeaders(jwtTokens)
        } else {
            throw new Error('Access token has expired or is invalid!')
        }
    }

    public async getAnalysesList() {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses`, this.headers)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}`, this.headers)
            console.log('getAnalysisStatus response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async getDetectedIssues(uuid: string) {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, this.headers)
            console.log('GetDetectedIssues response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }

    public async submitBytecode(bytecode: string, toolName?: string): Promise<SubmitContractRes | void> {
        try {
            const request = generateBytecodeRequest(bytecode, toolName)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, this.headers)
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
            const request = generateSourceCodeRequest(sourceCode, contractName, toolName)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, this.headers)
            console.log('submitContract with sourcecode only response:', result.data)

            return result.data
        } catch (err) {
            errorHandler(err)
        }
    }
}
