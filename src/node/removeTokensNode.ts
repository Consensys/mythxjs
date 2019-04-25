const fs = require('fs')

export function removeTokensNode(path: string) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file removed
    })
}