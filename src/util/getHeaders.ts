export function getHeaders(token: string) {
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    return headers
}