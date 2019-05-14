import { expect } from 'chai'
import * as sinon from 'sinon';

import { AuthServiceNode } from '../apiServices/AuthServiceNode'
import { JwtTokensInterface } from '..';

describe('loginUser', () => {

    const tokens: JwtTokensInterface = {
        access: 'access',
        refresh: 'refresh'
    }

    const http400: string = ''

    let loginUserStub: any;
    let AUTH;
    beforeEach(() => {
        AUTH = new AuthServiceNode('user', 'password');
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