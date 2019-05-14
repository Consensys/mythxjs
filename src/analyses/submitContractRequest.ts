import { compileContract } from '../util/compileContract'


//TODO: ADD EXTRA PARAM CONTRACTNAME
export async function submitContractRequest(contractName: string, path: string) {

    const { solName, contractContent, bytecode } = compileContract(path)
    console.log(solName, 'solName')

    return {
        "clientToolName": "MythxJS",
        "data":
        {
            "contractName": contractName,
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