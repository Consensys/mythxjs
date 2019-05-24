export function generateBytecodeRequest(bytecode: string, toolName: string = 'MythxJS') {
    return {
        clientToolName: toolName,
        data: {
            bytecode: `${bytecode}`,
        },
    }
}

export function generateSourceCodeRequest(sourceCode: string, contractName: string, toolName: string = 'MythxJS') {
    return {
        clientToolName: toolName,
        data: {
            contractName: contractName,
            sources: {
                [`${contractName}.sol`]: {
                    source: sourceCode,
                },
            },
        },
    }
}
