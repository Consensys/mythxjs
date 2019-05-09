// Below just for testing
import { AuthServiceNode } from './apiServices/AuthServiceNode'
import { AnalysesService } from './apiServices/AnalysesService'
// import * as mythx from './newIndex'


async function start() {

    const APISERVICE = new AuthServiceNode('0x0000000000000000000000000000000000000000', 'trial');
    APISERVICE.getVersion()
    await APISERVICE.login()

    const anal = new AnalysesService()
    const foo = anal.submitContract('vulnerable.sol')
    console.log(foo)
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

export { AuthServiceNode } from './apiServices/AuthServiceNode'
export { AnalysesService } from './apiServices/AnalysesService'
// export var __useDefault = true;

