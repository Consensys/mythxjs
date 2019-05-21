import { validateToken } from './isTokenValid'
import { JwtTokensInterface } from '..'
//TODO : CHANGE IS TOKEN VALID FILE NAME

export function getHeaders(jwtTokens: JwtTokensInterface): any {
    const accessToken = validateToken(jwtTokens)

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }

    return { accessToken, headers }
}
