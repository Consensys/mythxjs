export interface AnalysisSubmission {
    apiVersion: string
    harveyVersion?: string
    maruVersion?: string
    mythrilVersion?: string
    queueTime: number
    status: string
    submittedAt: string
    submittedBy: string
    uuid: string
    [k: string]: any
}
