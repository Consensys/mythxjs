import { compileContract } from '../util/compileContract'

export async function submitContractRequest(path: string) {

    const { solName, contractContent, bytecode } = compileContract(path)

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