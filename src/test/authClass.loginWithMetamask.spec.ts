import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'
import { JwtTokensInterface } from '..'

const postRequest = require('../http/index')

describe('loginWithMetamask', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let postRequestStub: any
    let setCredentialsStub: any

    let AUTH
    beforeEach(() => {
        postRequestStub = sinon.stub(postRequest, 'postRequest')

        AUTH = new AuthService('user', 'password')
        setCredentialsStub = sinon.stub(AUTH, 'setCredentials')
    })

    afterEach(() => {
        postRequestStub.restore()

        delete AUTH.jwtTokens
    })

    it('is a function', () => {
        expect(AUTH.loginWithMetamask).to.be.a('function')
    })

    it('should return and set access and refresh tokens', async () => {
        postRequestStub.resolves({
            data: { jwtTokens: tokens },
        })

        const result = await AUTH.loginWithMetamask()

        expect(setCredentialsStub.calledWith(tokens)).to.be.true
        expect(result).to.equal(tokens)
    })

    it('should fail if there is something wrong with the request', async () => {
        postRequestStub.throws('400')

        try {
            await AUTH.loginWithMetamask()
            expect.fail('loginWithMetamask should be rejected')
        } catch (err) {
            expect(err.message).to.equal('MythxJS. Error with your request. 400')
        }
    })
})
