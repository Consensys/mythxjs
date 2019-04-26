import { getTokensNode } from './getTokensNode'
import * as jwt from 'jsonwebtoken'

interface jwtInterface {
    jti: string
    iss: string,
    exp: number,
    userId: string,
    iat: number
}

export function isUserLoggedInNode(path: string): boolean {
    try {
        const tokens = getTokensNode(path)
        const { access, refresh } = tokens

        // decode token
        const accessTokenDecoded: jwtInterface = jwt.decode(access)
        const { exp } = accessTokenDecoded

        // returns true if token is still valid
        const now = new Date();
        return now.getTime() < exp * 1000;

    } catch (err) {
        throw new Error(`Error with checking if user is logged in. ${err}`)
    }
}