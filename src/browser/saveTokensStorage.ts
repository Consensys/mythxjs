import { JwtTokensInterface } from '..'

declare const localStorage;

export function saveTokensStorage(tokens: JwtTokensInterface) {
    console.log('saveTokensStorage browser')
    localStorage.setItem('mythx-jwt', JSON.stringify(tokens))
}
