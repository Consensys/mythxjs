// BUSINESS OBJECTS

export interface JwtTokensInterface {
    access: string;
    refresh: string;
}

export interface loginResponse {
    jwtTokens: JwtTokensInterface;
    access: string;
    refresh: string;
}

// TODO: Move this to types folder
export interface SubmitContractRes {
    apiVersion: string;
    harveyVersion: string;
    maestroVersion: string;
    maruVersion: string;
    mythrilVersion: string;
    queueTime: number;
    runTime: number;
    status: string;
    submittedAt: string;
    submittedBy: string;
    uuid: string;
}

// SERVICE INTERFACES AND FACTORIES

export { AuthService as MythxAuth } from './apiServices/AuthService'
export { AnalysesService as MythxAnalyses } from './apiServices/AnalysesService'
// export var __useDefault = true;
