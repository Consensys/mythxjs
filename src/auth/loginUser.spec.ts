import { loginUser } from './loginUser'
import { expect } from 'chai'

describe('loginUser', () => {
    it('should be a function', () => {
        expect(loginUser).to.be.a('function')
    })
})