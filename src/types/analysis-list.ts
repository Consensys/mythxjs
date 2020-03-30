export interface AnalysisList {
    total: number
    analyses: {
        apiVersion: string
        harveyVersion: string
        maruVersion: string
        mythrilVersion: string
        queueTime: number
        runTime: number
        status: string
        submittedAt: string
        submittedBy: string
        uuid: string
        [k: string]: any
    }[]
    [k: string]: any
}
