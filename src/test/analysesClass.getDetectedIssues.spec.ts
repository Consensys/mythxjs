import { expect } from 'chai'
import * as sinon from 'sinon'

import { AnalysesService } from '../apiServices/AnalysesService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const getRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')
const isTokenValid = require('../util/validateToken')

describe('getDetectedIssues', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let getHeadersStub: any
    let getRequestStub: any
    let errorHandlerStub: any
    let isTokenValidStub: any
    let getAnalysesStatusStub: any

    let ANALYSES

    beforeEach(() => {
        getHeadersStub = sinon.stub(getHeaders, 'getHeaders')
        getRequestStub = sinon.stub(getRequest, 'getRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')
        isTokenValidStub = sinon.stub(isTokenValid, 'isTokenValid')

        isTokenValidStub.returns(true)
        ANALYSES = new AnalysesService(tokens)
        getAnalysesStatusStub = sinon.stub(ANALYSES, 'getAnalysisStatus')
    })

    afterEach(() => {
        getHeadersStub.restore()
        getRequestStub.restore()
        errorHandlerStub.restore()
        isTokenValidStub.restore()
        getAnalysesStatusStub.restore()
    })

    it('is a function', () => {
        expect(ANALYSES.getDetectedIssues).to.be.a('function')
    })

    it('returns an object containing the detected issues', async () => {
        const uuid = '123-456-789'

        const response = {
            issues: [],
        }

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getAnalysesStatusStub.resolves({
            status: 'Finished',
        })

        getRequestStub.resolves({
            data: response,
        })

        const result = await ANALYSES.getDetectedIssues(uuid)
        expect(result).to.deep.equal(response)
        expect(getHeadersStub.calledOnce).to.be.true
        expect(getRequestStub.calledWith('https://api.mythx.io/v1/analyses/123-456-789/issues')).to.be.true
    })

    it('should fail if there is something wrong with the request', async () => {
        const uuid = '123-456-789'

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getAnalysesStatusStub.resolves({
            status: 'Finished',
        })

        getRequestStub.throws('400')

        try {
            await ANALYSES.getDetectedIssues(uuid)
            expect.fail('getDetectedIssues should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
