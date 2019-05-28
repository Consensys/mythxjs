import { AnalyzeOptions } from '..'

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
            mainSource: `${contractName}.sol`,
        },
    }
}

export function generateAnalysisRequest(options: AnalyzeOptions) {
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
