import { JwtTokensInterface } from '..'

declare const localStorage;

export function saveTokensStorage(tokens: JwtTokensInterface) {
    localStorage.setItem('mythx-jwt', JSON.stringify(tokens))
}
