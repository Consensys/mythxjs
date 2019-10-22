// BUSINESS OBJECTS

export interface JwtTokensInterface {
    access: string
    refresh: string
}

export interface loginResponse {
    jwtTokens: JwtTokensInterface
    access: string
    refresh: string
}

export interface VersionResponse {
    api: string
    harvey: string
    hash: string
    maru: string
    mythril: string
}

export interface StatsResponse {
    from: string
    interval: string
    createdAt: string
    type: string
    revision: number
    data: any
}

export interface AnalyzeOptions {
    toolName?: string
    noCacheLookup?: boolean
    contractName?: string
    bytecode?: string
    sourceMap?: string
    deployedBytecode?: string
    deployedSourceMap?: string
    mainSource?: string
    sources?: any
    sourceList?: Array<string>
    solcVersion?: string
    analysisMode?: string
}

// TODO: Move this to types folder
export interface SubmitContractRes {
    apiVersion: string
    harveyVersion: string
    maestroVersion: string
    maruVersion: string
    mythrilVersion: string
    queueTime: number
    runTime: number
    status: string
    submittedAt: string
    submittedBy: string
    uuid: string
}
