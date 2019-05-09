import { compileContract } from '../util/compileContract'

export async function submitContractRequest(path: string) {

    const { solName, contractContent, bytecode } = compileContract(path)
    console.log(solName, 'solName')
    console.log(contractContent, 'solName')
    console.log(bytecode, 'solName')

    // remove file extension
    const srcName = solName.replace(/\.[^/.]+$/, "");

    return {
        "clientToolName": "MythxJS",
        "data":
        {
            "contractName": srcName,
            "bytecode": bytecode[0],
            "analysisMode": "quick",
            "sourceList": [
                solName
            ],
            "sources": {
                src: {
                    "source": contractContent
                }
            },
            "mainSource": solName
        }
    }
}