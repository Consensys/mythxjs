import * as path from 'path';
import { readFile } from '../util/readFile'
var solc = require('solc')

// type BC = string

function getInput(name, contractContent) {
    const input = {
        language: 'Solidity',
        sources: {
            [name]: {
                content: contractContent
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    }

    return input
}


export function compileContract(solPath) {

    const solName: string = path.basename(solPath)
    console.log(solName, 'name')
    const contractContent = readFile(path.join(__dirname, "../../src/", solPath))
    console.log(contractContent)

    const input = getInput(solName, contractContent)

    var output = JSON.parse(solc.compile(JSON.stringify(input)))
    console.log(output, 'eee')
    // `output` here contains the JSON output as specified in the documentation
    let bytecode: Array<string> = []
    for (var contractName in output.contracts[solName]) {
        console.log(contractName + ': ' + output.contracts[solName][contractName].evm.bytecode.object)
        bytecode.push(output.contracts[solName][contractName].evm.bytecode.object)
    }

    console.log(bytecode)

    return {
        solName,
        contractContent,
        bytecode
    }
}