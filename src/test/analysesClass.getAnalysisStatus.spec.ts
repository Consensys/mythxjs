import { expect } from 'chai'
import * as sinon from 'sinon'

import { AnalysesService } from '../apiServices/AnalysesService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const getRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')
const isTokenValid = require('../util/validateToken')

describe('getAnalysisStatus', () => {
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
        expect(ANALYSES.getAnalysisStatus).to.be.a('function')
    })

    it('returns an object containing the analyis status', async () => {
        const uuid = '123-456-789'

        const value = {
            apiVersion: 'v1.4.14-30-g66a01cd',
            harveyVersion: '0.0.21',
            maestroVersion: '1.2.10-12-gea51d0b',
            maruVersion: '0.4.6',
            mythrilVersion: '0.20.4',
            queueTime: 88,
            runTime: 5358,
            status: 'Finished',
            submittedAt: '2019-05-10T15:25:44.637Z',
            submittedBy: '123456789012345678901234',
            uuid: '4ac074eb-fe26-4dc9-bb0c-061da1f00862',
        }

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getRequestStub.resolves({
            data: value,
        })

        const result = await ANALYSES.getAnalysisStatus(uuid)
        expect(result).to.deep.equal(value)
        expect(getHeadersStub.calledOnce).to.be.true
    })

    it('should fail if there is something wrong with the request', async () => {
        const uuid = '123-456-789'

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token',
        })

        getRequestStub.throws('400')

        try {
            await ANALYSES.getAnalysisStatus(uuid)
            expect.fail('getAnalysisStatus should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})