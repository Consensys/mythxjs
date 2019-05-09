import { expect } from 'chai'
import * as sinon from 'sinon';

import { AuthServiceNode } from '../apiServices/AuthServiceNode'
import { JwtTokensInterface } from '..';
import { loginUser } from '../auth/loginUser'

describe('loginUser', () => {

    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh'
    }

    let loginUserStub: any;
    let AUTH;
    beforeEach(() => {
        AUTH = new AuthServiceNode('0x0000000000000000000000000000000000000000', 'trial');
        loginUserStub = sinon.stub(AUTH, 'login')
    });

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
})