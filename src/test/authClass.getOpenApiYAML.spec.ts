import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'

const getRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')

describe('getOpenApiYAML', () => {
    let getRequestStub: any
    let errorHandlerStub: any

    let AUTH
    beforeEach(() => {
        getRequestStub = sinon.stub(getRequest, 'getRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')

        AUTH = new AuthService('user', 'password')
    })

    afterEach(() => {
        getRequestStub.restore()
        errorHandlerStub.restore()
    })

    it('is a function', () => {
        expect(AUTH.getOpenApiYAML).to.be.a('function')
    })

    it('returns an  object', async () => {
        const value = {
            yaml: 'yaml',
        }

        getRequestStub.resolves({
            data: value,
        })

        const result = await AUTH.getOpenApiYAML()
        expect(result).to.deep.equal(value)
        expect(getRequestStub.calledWith('https://api.mythx.io/v1/openapi.yaml')).to.be.true
    })

    it('should fail if there is something wrong with the request', async () => {
        getRequestStub.throws('400')

        try {
            await AUTH.getOpenApiYAML()
            expect.fail('openApiYAML should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
