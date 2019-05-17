export function generateBytecodeRequest(bytecode: string, toolName?: string) {
    const clientToolName = toolName || 'MythxJS'
    return {
        'clientToolName': clientToolName,
        'data':
        {
            'bytecode': `${bytecode}`
        }
    }
}

export function generateSourceCodeRequest(sourceCode: string, contractName: string, toolName?: string) {
    const clientToolName = toolName || 'MythxJS'
    return {
        'clientToolName': clientToolName,
        'data':
        {
            'contractName': contractName,
            'sources': {
                [`${contractName}.sol`]: {
                    'source': sourceCode
                }
            }
        }
    }
}