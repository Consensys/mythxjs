export type DetectedIssues = {
    issues: {
        decodedLocations?: {
            column: number
            line: number
            [k: string]: any
        }[][]
        swcID: string
        swcTitle: string
        description: {
            head: string
            tail: string
            [k: string]: any
        }
        severity: string | null
        locations: {
            sourceMap?: string | null
            sourceType?: string | null
            sourceFormat?: string | null
            sourceList?: string[]
            [k: string]: any
        }[]
        extra: {
            [k: string]: any
        }
        [k: string]: any
    }[]
    sourceType: string | null
    sourceFormat: string | null
    sourceList: string[]
    meta: {
        [k: string]: any
    }
    [k: string]: any
}[]
