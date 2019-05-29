import { expect } from 'chai'
import * as sinon from 'sinon'

import { AnalysesService } from '../apiServices/AnalysesService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const postRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')
const generateBytecodeRequest = require('../util/generateContractsRequests')
const isTokenValid = require('../util/validateToken')

describe('submitBytecode', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let getHeadersStub: any
    let postRequestStub: any
    let errorHandlerStub: any
    let isTokenValidStub: any
    let generateBytecodeRequestStub: any

    let ANALYSES

    beforeEach(() => {
        getHeadersStub = sinon.stub(getHeaders, 'getHeaders')
        postRequestStub = sinon.stub(postRequest, 'postRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')
        isTokenValidStub = sinon.stub(isTokenValid, 'isTokenValid')
        generateBytecodeRequestStub = sinon.stub(generateBytecodeRequest, 'generateBytecodeRequest')

        isTokenValidStub.returns(true)
        ANALYSES = new AnalysesService(tokens)
    })

    afterEach(() => {
        getHeadersStub.restore()
        postRequestStub.restore()
        errorHandlerStub.restore()
        isTokenValidStub.restore()
        generateBytecodeRequestStub.restore()
    })

    it('is a function', () => {
        expect(ANALYSES.submitBytecode).to.be.a('function')
    })

    it('should return an object with info about submitted analysis', async () => {
        const bytecode = '1111111'

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
            uuid: 'b76d69cf-140c-4f83-9705-e3527e63d17b',
        }

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        generateBytecodeRequestStub.resolves({
            clientToolName: 'test',
            data: {
                bytecode: bytecode,
            },
        })

        postRequestStub.resolves({
            data: response,
        })

        const result = await ANALYSES.submitBytecode(bytecode)
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
            await ANALYSES.submitBytecode(bytecode)
            expect.fail('submitBytecode should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
