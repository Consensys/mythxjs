// Below just for testing
import { AuthService } from './apiServices/AuthService'
import { AnalysesService } from './apiServices/AnalysesService'
// import * as mythx from './newIndex'


async function start() {

    const APISERVICE = new AuthService('0x79b483371e87d664cd39491b5f06250165e4b184', 'Abcdefg1!');
    await APISERVICE.login()
    // APISERVICE.refreshToken()

    const ANALYSESSERVICE = new AnalysesService()
    const contractData: any = await ANALYSESSERVICE.submitContractNoSolc()


    const { uuid } = contractData

    console.log(uuid)


    // Handle infinite queue
    // let timer = setInterval(async () => {
    //     const analysis = await ANALYSESSERVICE.getAnalysisStatus(uuid)
    //     console.log(analysis.status)
    //     if (analysis.status === "Finished") {
    //         clearInterval(timer)
    //     }
    // }, 2000);

    // await ANALYSESSERVICE.getDetectedIssues(uuid)
}


start()

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

export { AuthService } from './apiServices/AuthService'
export { AnalysesService } from './apiServices/AnalysesService'
// export var __useDefault = true;

