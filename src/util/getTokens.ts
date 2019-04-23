import * as fs from 'fs'

export function getTokens(path) {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
    return false
  }
}