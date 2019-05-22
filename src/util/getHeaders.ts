import { validateToken } from './validateToken'
import { JwtTokensInterface } from '..'

export async function getHeaders(jwtTokens: JwtTokensInterface) {
    const accessToken = await validateToken(jwtTokens)
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }

    return { accessToken, headers }
}
