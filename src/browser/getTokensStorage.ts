import { JwtTokensInterface } from '..'

declare const localStorage;

export function getTokensStorage(): JwtTokensInterface {
    const tokens: JwtTokensInterface = localStorage.getItem('mythx-jwt')
    console.log(tokens, 'tokens from local storage')
    return tokens
}