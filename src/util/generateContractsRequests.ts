import { AnalyzeOption } from '..'

export function generateBytecodeRequest(bytecode: string, toolName?: string) {
    const clientToolName = toolName || 'MythxJS'
    return {
        clientToolName: clientToolName,
        data: {
            bytecode: `${bytecode}`,
        },
    }
}

export function generateSourceCodeRequest(sourceCode: string, contractName: string, toolName?: string) {
    const clientToolName = toolName || 'MythxJS'
    return {
        clientToolName: clientToolName,
        data: {
            contractName: contractName,
            sources: {
                [`${contractName}.sol`]: {
                    source: sourceCode,
                },
            },
            mainSource: `${contractName}.sol`,
        },
    }
}

export function generateAnalysisRequest(options: AnalyzeOption) {
    const {
        toolName,
        contractName,
        bytecode,
        sourceMap,
        deployedBytecode,
        deployedSourceMap,
        mainSource,
        sources,
        sourceList,
        solcVersion,
        analysisMode,
    } = options
    return {
        clientToolName: toolName,
        data: {
            contractName: contractName,
            bytecode: bytecode,
            sourceMap: sourceMap,
            deployedBytecode: deployedBytecode,
            deployedSourceMap: deployedSourceMap,
            mainSource: mainSource,
            sources: sources,
            sourceList: sourceList,
            version: solcVersion,
            analysisMode: analysisMode,
        },
    }
}
