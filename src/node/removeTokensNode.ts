const fs = require('fs')

function removeTokensNode(path: string) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file removed
    })
}

export default removeTokensNode