import { getTokensStorage } from './getTokensStorage'
import * as jwt from 'jsonwebtoken'

interface jwtInterface {
    jti: string
    iss: string,
    exp: number,
    userId: string,
    iat: number
}

export function isUserLoggedInStorage(): boolean {
    try {
        const tokens: any = getTokensStorage()
        const parsed = JSON.parse(tokens)
        const { access } = parsed

        // decode token
        const accessTokenDecoded: jwtInterface = jwt.decode(access)
        const { exp } = accessTokenDecoded

        // returns true if token is still valid
        const now = new Date();
        return now.getTime() < exp * 1000;

    } catch (err) {
        console.log(err)
        // throw new Error(`Error with checking if user is logged in. ${err}`)
        return false
    }
}