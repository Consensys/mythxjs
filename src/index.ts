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

export interface AnalyzeOption {
    tool_name?: string
    contract_name?: string
    bytecode?: string
    source_map?: string
    deployed_bytecode?: string
    deployed_source_map?: string
    main_source?: string
    sources?: any
    source_list?: Array<string>
    solc_version?: string
    analysis_mode?: string
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

// SERVICE INTERFACES AND FACTORIES

export { ClientService as Mythxjs } from './apiServices/ClientService'
