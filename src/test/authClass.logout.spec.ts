import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'
import { JwtTokensInterface } from '..'

const getHeaders = require('../util/getHeaders')
const postRequest = require ('../http/index')
const errorHandler = require('../util/errorHandler')

describe('logout', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }
    
    let getHeadersStub: any
    let postRequestStub: any
    let errorHandlerStub: any

    let AUTH
    let isUserLoggedInStub: any
    beforeEach(() => {
        getHeadersStub = sinon.stub(getHeaders, 'getHeaders')
        postRequestStub = sinon.stub(postRequest, 'postRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')

        AUTH = new AuthService('user', 'password')
        isUserLoggedInStub = sinon.stub(AUTH, 'isUserLoggedIn')
    })

    afterEach(() => {
        getHeadersStub.restore()
        postRequestStub.restore()
        errorHandlerStub.restore()
        isUserLoggedInStub.restore()
    })

    it('is a function', () => {
        expect(AUTH.logout).to.be.a('function')
    })

    it('returns an empty object', async () => {
        isUserLoggedInStub.returns(true)

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token'
        })

        postRequestStub.resolves({
            data: {}
        })
        
        const result = await AUTH.logout()
        expect(result).to.deep.equal({})
        expect(getHeadersStub.calledOnce).to.be.true
    })

    it('should fail if user is not logged in', async () => {
        isUserLoggedInStub.returns(false)

        try {
            await AUTH.logout()
            expect.fail('login should be rejected')
        } catch (err) {
            expect(err.message).to.equal('No valid token found')
        }

    })

    it('should fail if there is something wrong with the request', async () => {
        isUserLoggedInStub.returns(true)

        getHeadersStub.resolves({
            headers: 'headers',
            foo: 'token'
        })

        postRequestStub.throws('400')
        
        try {
            await AUTH.logout()
            expect.fail('login should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal('400')
        }
    })
})
