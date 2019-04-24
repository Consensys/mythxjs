import { JwtTokensInterface } from '..'

import { isBrowser, isNode } from 'browser-or-node';


// export function saveTokensNode(data: JwtTokensInterface, path: string) {
//     console.log('savetokens')
//     try {
//         fs.writeFileSync(path, JSON.stringify(data))
//     } catch (err) {
//         console.error(err)
//     }
// }

if (isBrowser) {
    module.exports = function (tokens) {
        console.log('works in the browserrrr')
    };
} else {
    module.exports = function (data: JwtTokensInterface, path: string) {
        const fs = require('fs')
        console.log('savetokensnodeee')
        try {
            fs.writeFileSync(path, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    }
}