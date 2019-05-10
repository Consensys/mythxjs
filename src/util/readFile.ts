const fs = require('fs')

// TODO: refactor below same as getTokensNode

export function readFile(path: string) {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return data
    } catch (err) {
        console.error(err)
        return false
    }
}