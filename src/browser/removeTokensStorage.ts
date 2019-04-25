declare const localStorage;

export function removeTokensStorage() {
    return localStorage.removeItem('mythx-jwt')
}
