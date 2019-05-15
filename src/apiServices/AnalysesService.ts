import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import { submitBytecodeRequest } from '../util/submitBytecodeRequest'

import { API_URL_PRODUCTION, API_URL_STAGING, tokenLocation } from '../util/constants'

import { isTokenValid } from '../util/isTokenValid'

import { SubmitContractRes } from '..'

import { submitContractRequest } from '../analyses/submitContractRequest'

export class AnalysesService {
    public token
    private apiUrl: string = API_URL_PRODUCTION

    constructor(token) {
        if (isTokenValid(token)) {
            console.log('token is valid')
            this.token = token
        } else {
            throw new Error('Access token has expired or is invalid!')
        }
    }

    public async getAnalysesList() {
        try {
            const headers = getHeaders(this.token)

            const result = await getRequest(`${this.apiUrl}/analyses`, headers)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            const headers = getHeaders(this.token)

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}`, headers)
            console.log('getAnalysisStatus response:', result.data)
            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getDetectedIssues(uuid: string) {
        try {
            const headers = getHeaders(this.token)

            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, headers)
            console.log('GetDetectedIssues response:', result.data)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async submitContract(contractName: string, path?: string, bytecode?: string): Promise<SubmitContractRes | undefined> {
        try {
            const headers = getHeaders(this.token)

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
        }
        catch (err) {
            errorHandler(err)
        }
    }

}
