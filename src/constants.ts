import * as path from 'path'

// Default/Trial Credentials
export const DEFAULT_ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_PASSWORD = 'trial'

export const API_URL = {
  production: 'https://api.mythx.io/',
  staging: 'https://staging.api.mythx.io/'
}

export const LOGIN_API = 'v1/auth/login'

export const tempDir = path.resolve(
  path.dirname(require!.main!.filename),
  '../.temp/'
)
export const authFile = tempDir + '/auth.json'
