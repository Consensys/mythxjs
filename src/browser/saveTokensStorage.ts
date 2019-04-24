import { JwtTokensInterface } from '..'

const localStorage: any = {}

export function saveTokensStorage(tokens: JwtTokensInterface) {
    console.log('saveTokensStorage browser')
    localStorage.setItem('mythx-jwt', JSON.stringify(tokens))
}
