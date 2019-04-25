const fs = require('fs')

export function getTokensNode(path) {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
    return false
  }
}