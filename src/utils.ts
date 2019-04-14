export const getRequestHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
}

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
