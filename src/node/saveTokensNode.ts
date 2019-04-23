import * as fs from 'fs';

import { JwtTokensInterface } from '..'


export function saveTokensNode(data: JwtTokensInterface, path: string) {
    console.log('savetokens')
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}