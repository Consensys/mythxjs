import * as jwt from 'jsonwebtoken'

interface jwtInterface {
    jti: string
    iss: string,
    exp: number,
    userId: string,
    iat: number
}

export function isTokenValid(token: string): boolean {
    try {

        // decode token
        const tokenDecoded: jwtInterface = jwt.decode(token)
        const { exp } = tokenDecoded

        // returns true if token is still valid
        const now = new Date();
        return now.getTime() < exp * 1000;

    } catch (err) {
        throw new Error(`Error with checking if token is still valid. ${err}`)
    }
}