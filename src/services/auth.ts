import axios from 'axios'
import * as fs from 'fs'

// Types
import { IAuth } from '../../types'

// Constants
import { authFile, tempDir } from '../constants'

export const login = (ethAddress: string, password: string, url: string) => {
  return axios.post(url, { ethAddress, password })
}

export const deleteCredentials = (accessToken: string, url: string) => {
  if (fs.existsSync(authFile)) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }

    return axios
      .post(url, {}, { headers })
      .then(() => {
        try {
          fs.unlinkSync(authFile)
        } catch (err) {
          throw new Error(`Error while deleting the auth file`)
        }
      })
      .catch(err => {
        throw new Error(err.response.data.error)
      })
  } else {
    throw new Error(`Unable to locate auth file. Please try to login first`)
  }
}

export const getCredentials = (): IAuth | {} => {
  /* Create `.temp` directory if it doesn't exist */
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  if (fs.existsSync(authFile)) {
    return JSON.parse(fs.readFileSync(authFile).toString()) as IAuth
  }

  return {}
}

export const saveCredentials = (content: IAuth) => {
  /* Create `.temp` directory if it doesn't exist */
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  try {
    fs.writeFileSync(authFile, JSON.stringify(content), 'utf8')
  } catch (e) {
    throw e
  }
}
