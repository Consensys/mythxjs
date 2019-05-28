import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'
import { JwtTokensInterface } from '..'

const postRequest = require('../http/index')
const errorHandler = require('../util/errorHandler')

describe('refreshToken', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let postRequestStub: any
    let errorHandlerStub: any
    let setCredentialsStub: any

    let AUTH
    beforeEach(() => {
        postRequestStub = sinon.stub(postRequest, 'postRequest')
        errorHandlerStub = sinon.stub(errorHandler, 'errorHandler')

        AUTH = new AuthService('user', 'password')
        setCredentialsStub = sinon.stub(AUTH, 'setCredentials')
    })

    afterEach(() => {
        postRequestStub.restore()
        errorHandlerStub.restore()
    })

    it('is a function', () => {
        expect(AUTH.refreshToken).to.be.a('function')
    })

    it('returns a set of tokens', async () => {
        postRequestStub.resolves({
            data: { jwtTokens: tokens },
        })

        const result = await AUTH.refreshToken({ access: 'aa', refresh: 'bb' })
        expect(setCredentialsStub.calledWith(tokens)).to.be.true
        expect(result).to.equal(tokens)
    })

    it('should fail with error ', async () => {
        const errMsg = 'MythxJS. Error with your request.'

        postRequestStub.throws(errMsg)
        errorHandlerStub.throws()

        try {
            await AUTH.refreshToken()
            expect.fail('refreshToken should be rejected')
        } catch (err) {
            expect(errorHandlerStub.getCall(0).args[0].name).to.equal(errMsg)
        }
    })
})
