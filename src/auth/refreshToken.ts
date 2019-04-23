import axios from 'axios'
import { JwtTokens } from '..'

// TODO: BELOW IS VERY SIMILAR TO OTHER POST REQUEST - MERGE INTO ONE REUSABLE METHOD?
export async function refreshToken(url: string, body: any, headers: any) {
    return axios.post(url, body, { headers: headers })
}  