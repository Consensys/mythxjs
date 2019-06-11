import { expect } from 'chai'
import * as sinon from 'sinon'
import * as jwt from 'jsonwebtoken'

import { AuthService } from '../apiServices/AuthService'

const postRequest = require('../http/index')

describe('refreshToken', () => {
    const accessToken = {
        jti: '',
        iss: '',
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 20,
        userId: '',
        iat: 0,
    }

    let postRequestStub: any
    let setCredentialsStub: any

    let AUTH
    beforeEach(() => {
        postRequestStub = sinon.stub(postRequest, 'postRequest')

        AUTH = new AuthService('user', 'password')
        AUTH.jwtTokens = {
            access: jwt.sign(accessToken, 'secret'),
            refresh: 'refresh',
        }

        setCredentialsStub = sinon.stub(AUTH, 'setCredentials')
    })

    afterEach(() => {
        postRequestStub.restore()
    })

    it('is a function', () => {
        expect(AUTH.refreshToken).to.be.a('function')
    })

    it('returns a set of tokens', async () => {
        const tokens = {
            access: jwt.sign(accessToken, 'secret'),
            refresh: 'refresh',
        }
        postRequestStub.resolves({
            data: { jwtTokens: tokens },
        })

        const result = await AUTH.refreshToken({ access: 'aa', refresh: 'bb' })
        expect(setCredentialsStub.calledWith(tokens)).to.be.true
        expect(result).to.equal(tokens)
    })

    it('should fail with error ', async () => {
        postRequestStub.throws('400')

        try {
            await AUTH.logout()
            expect.fail('refreshToken should be rejected')
        } catch (err) {
            expect(err.message).to.equal('MythxJS. Error with your request. 400')
        }
    })
})
