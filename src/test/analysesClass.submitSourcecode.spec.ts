import { expect } from 'chai'
import * as sinon from 'sinon'

import { AnalysesService } from '../apiServices/AnalysesService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const postRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')
const generateSourceCodeRequest = require('../util/generateContractsRequests')
const isTokenValid = require('../util/validateToken')

describe('submitSourceCode', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let getHeadersStub: any
    let postRequestStub: any
    let errorHandlerStub: any
    let isTokenValidStub: any
    let generateSourceCodeRequestStub: any

    let ANALYSES

    beforeEach(() => {
        getHeadersStub = sinon.stub(getHeaders, 'getHeaders')
        postRequestStub = sinon.stub(postRequest, 'postRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')
        isTokenValidStub = sinon.stub(isTokenValid, 'isTokenValid')
        generateSourceCodeRequestStub = sinon.stub(generateSourceCodeRequest, 'generateSourceCodeRequest')

        isTokenValidStub.returns(true)
        ANALYSES = new AnalysesService(tokens)
    })

    afterEach(() => {
        getHeadersStub.restore()
        postRequestStub.restore()
        errorHandlerStub.restore()
        isTokenValidStub.restore()
        generateSourceCodeRequestStub.restore()
    })

    it('is a function', () => {
        expect(ANALYSES.submitSourceCode).to.be.a('function')
    })

    it('should return an object with info about submitted analysis using source code only', async () => {
        const sourceCode = 'solidity code'

        const response = {
            apiVersion: 'v1.4.14',
            harveyVersion: '0.0.22',
            maestroVersion: '1.2.11',
            maruVersion: '0.4.6',
            mythrilVersion: '0.20.4',
            queueTime: 10,
            runTime: 0,
            status: 'Queued',
            submittedAt: '2019-05-29T17:41:46.902Z',
            submittedBy: '123456789012345678901234',
            uuid: '1111-2222-3333-4444',
        }

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        generateSourceCodeRequestStub.resolves({
            clientToolName: 'toolName',
            data: {
                contractName: 'contractName',
                sources: {
                    [`${'contractName'}.sol`]: {
                        source: sourceCode,
                    },
                },
                mainSource: `${'contractName'}.sol`,
            },
        })

        postRequestStub.resolves({
            data: response,
        })

        const result = await ANALYSES.submitSourceCode(sourceCode, 'contractName')
        expect(result).to.equal(response)
        expect(getHeadersStub.calledOnce).to.be.true
        expect(postRequestStub.calledWith('https://api.mythx.io/v1/analyses')).to.be.true
    })

    it('should fail if there is something wrong with the request', async () => {
        const bytecode = '1111111'

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        postRequestStub.throws('400')

        try {
            await ANALYSES.submitSourceCode(bytecode)
            expect.fail('submitSourceCode should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
