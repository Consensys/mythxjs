import { validateToken } from './validateToken'
import { JwtTokensInterface } from '..'

export async function getHeaders(jwtTokens: JwtTokensInterface) {
    console.log(jwtTokens, 'jwtToken get Header')
    const accessToken = await validateToken(jwtTokens)
    console.log(accessToken, 'accessToken')
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    }

    return { accessToken, headers }
}
