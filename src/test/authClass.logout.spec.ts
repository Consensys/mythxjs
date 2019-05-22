import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthService } from '../apiServices/AuthService'
import { JwtTokensInterface } from '..'

describe('logout', () => {
    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh',
    }

    let logoutUserStub: any
    let AUTH
    beforeEach(() => {
        AUTH = new AuthService('user', 'password')
        logoutUserStub = sinon.stub(AUTH, 'logout')
    })

    afterEach(() => {
        logoutUserStub.restore()
    })

    it('is a function', () => {
        expect(logoutUserStub).to.be.a('function')
    })

    it('returns an empty object', async () => {
        logoutUserStub.returns({})

        const result = await AUTH.logout()
        expect(result).to.deep.equal({})
    })
})
