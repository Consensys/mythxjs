import { postRequest } from '../http'
import { getHeaders } from './getHeaders'
import { JwtTokensInterface } from '..'
import { API_URL_PRODUCTION } from './constants'
import { errorHandler } from './errorHandler'

export async function refreshToken(jwtTokens: JwtTokensInterface): Promise<JwtTokensInterface | void> {
    try {
        const reqBody = {
            jwtTokens: jwtTokens,
        }

        const result = await postRequest(`${API_URL_PRODUCTION}/auth/refresh`, reqBody, {})
        const tokens: JwtTokensInterface = result.data.jwtTokens

        return tokens
    } catch (err) {
        errorHandler(err)
    }
}
