import { JwtTokensInterface } from '..'

const localStorage: any = {}

export function saveTokensStorage(tokens: JwtTokensInterface) {
    console.log('saveTokensStorage fired')
    localStorage.setItem('mythx-jwt', JSON.stringify(tokens))
}
