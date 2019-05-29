import { expect } from 'chai'
import * as sinon from 'sinon'

import { AnalysesService } from '../apiServices/AnalysesService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const getRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')
const isTokenValid = require('../util/validateToken')

describe('getAnalysesList', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let getHeadersStub: any
    let getRequestStub: any
    let errorHandlerStub: any
    let isTokenValidStub: any

    let ANALYSES

    beforeEach(() => {
        getHeadersStub = sinon.stub(getHeaders, 'getHeaders')
        getRequestStub = sinon.stub(getRequest, 'getRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')
        isTokenValidStub = sinon.stub(isTokenValid, 'isTokenValid')

        isTokenValidStub.returns(true)
        ANALYSES = new AnalysesService(tokens)
    })

    afterEach(() => {
        getHeadersStub.restore()
        getRequestStub.restore()
        errorHandlerStub.restore()
        isTokenValidStub.restore()
    })

    it('is a function', () => {
        expect(ANALYSES.getAnalysesList).to.be.a('function')
    })

    it('should return a list of analysis', async () => {
        const response = {
            total: 3,
            analyses: [],
        }

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getRequestStub.resolves({
            data: response,
        })

        const result = await ANALYSES.getAnalysesList()
        expect(result).to.deep.equal(response)
        expect(getHeadersStub.calledOnce).to.be.true
        expect(getRequestStub.calledWith('https://api.mythx.io/v1/analyses')).to.be.true
    })

    it('should fail if there is something wrong with the request', async () => {
        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getRequestStub.throws('400')

        try {
            await ANALYSES.getAnalysesList()
            expect.fail('getAnalysesList should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
