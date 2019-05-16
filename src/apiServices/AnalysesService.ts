import { postRequest, getRequest } from '../http'

import { errorHandler } from '../util/errorHandler'
import { getHeaders } from '../util/getHeaders'
import { submitBytecodeRequest } from '../util/submitBytecodeRequest'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'

import { isTokenValid } from '../util/isTokenValid'

import { SubmitContractRes } from '..'

import { submitContractRequest } from '../analyses/submitContractRequest'

export class AnalysesService {
    public token
    private apiUrl: string = API_URL_PRODUCTION
    private headers

    constructor(token) {
        if (isTokenValid(token)) {
            this.token = token
            this.headers = getHeaders(this.token)
        } else {
            throw new Error('Access token has expired or is invalid!')
        }
    }

    public async getAnalysesList() {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses`, this.headers)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getAnalysisStatus(uuid: string) {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}`, this.headers)
            console.log('getAnalysisStatus response:', result.data)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async getDetectedIssues(uuid: string) {
        try {
            const result = await getRequest(`${this.apiUrl}/analyses/${uuid}/issues`, this.headers)
            console.log('GetDetectedIssues response:', result.data)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public async submitContract(contractName: string, path?: string, bytecode?: string): Promise<SubmitContractRes | undefined> {
        try {
            if (bytecode) {
                const request = submitBytecodeRequest(bytecode)
                const result = await postRequest(`${this.apiUrl}/analyses`, request, this.headers)
                console.log('submitContract with bytecode only response:', result.data)
                return result.data
            }

            console.log(path, 'path to the contract')
            const request = await submitContractRequest(contractName, path as string)

            const result = await postRequest(`${this.apiUrl}/analyses`, request, this.headers)
            console.log('submitContract response:', result.data)

            return result.data
        }
        catch (err) {
            errorHandler(err)
        }
    }

}
