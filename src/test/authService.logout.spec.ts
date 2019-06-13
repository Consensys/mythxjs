import { expect } from 'chai'
import * as sinon from 'sinon'
import * as jwt from 'jsonwebtoken'

import { AuthService } from '../apiServices/AuthService'

const postRequest = require('../http/index')

describe('logout', () => {
    const accessToken = {
        jti: '',
        iss: '',
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 20,
        userId: '',
        iat: 0,
    }
    let postRequestStub: any

    let AUTH
    let isUserLoggedInStub: any
    beforeEach(() => {
        postRequestStub = sinon.stub(postRequest, 'postRequest')

        AUTH = new AuthService('user', 'password')
        AUTH.jwtTokens = {
            access: jwt.sign(accessToken, 'secret'),
            refresh: 'refresh',
        }

        isUserLoggedInStub = sinon.stub(AUTH, 'isUserLoggedIn')
    })

    afterEach(() => {
        postRequestStub.restore()
        isUserLoggedInStub.restore()

        delete AUTH.jwtTokens
    })

    it('is a function', () => {
        expect(AUTH.logout).to.be.a('function')
    })

    it('returns an empty object', async () => {
        isUserLoggedInStub.returns(true)

        postRequestStub.resolves({
            data: {},
        })

        const result = await AUTH.logout()
        expect(result).to.deep.equal({})
    })

    it('should fail if user is not logged in', async () => {
        isUserLoggedInStub.returns(false)

        try {
            await AUTH.logout()
            expect.fail('logout should be rejected')
        } catch (err) {
            expect(err.message).to.equal('No valid token found')
        }
    })

    it('should fail if there is something wrong with the request', async () => {
        isUserLoggedInStub.returns(true)

        postRequestStub.throws('400')

        try {
            await AUTH.logout()
            expect.fail('logout should be rejected')
        } catch (err) {
            expect(err.message).to.equal('MythxJS. Error with your request. 400')
        }
    })
})
