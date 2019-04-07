import axios from 'axios'
import * as fs from 'fs'

// Types
import { IAuth } from '../../types'

// Constants
import { authFile, tempDir } from '../constants'

export const login = (ethAddress: string, password: string, url: string) => {
  return axios.post(url, { ethAddress, password })
}

export const deleteCredentials = () => {
  /* Create `.temp` directory if it doesn't exist */
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  if (fs.existsSync(authFile)) {
    try {
      fs.unlinkSync(authFile)
      // console.log(`Successfully deleted ${authFile}`);
    } catch (err) {
      throw err
    }
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
