import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'
import { JwtTokensInterface } from '..'

describe('loginUser', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let loginUserStub: any
    let AUTH
    beforeEach(() => {
        AUTH = new AuthService('user', 'password')
        loginUserStub = sinon.stub(AUTH, 'login')
    })

    afterEach(() => {
        loginUserStub.restore()
    })

    it('is a function', () => {
        expect(loginUserStub).to.be.a('function')
    })

    it('should return access and refresh tokens', async () => {
        loginUserStub.returns(tokens)

        const result = await AUTH.login()
        expect(result).to.equal(tokens)
    })

    it('should fail with error ', async () => {
        const errMsg = 'MythxJS. Error with your request.'

        loginUserStub.rejects(new Error(errMsg))

        try {
            await AUTH.login()
            expect.fail('login should be rejected')
        } catch (err) {
            expect(err.message).to.eql(errMsg)
        }
    })
})
