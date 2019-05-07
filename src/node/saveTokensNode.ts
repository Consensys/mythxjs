import { JwtTokensInterface } from '..'

const fs = require('fs')


function saveTokensNode(data: JwtTokensInterface, path: string) {
    console.log('savetokens')
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

export default saveTokensNode