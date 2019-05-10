// Below just for testing
import { AuthServiceNode } from './apiServices/AuthServiceNode'
import { AnalysesService } from './apiServices/AnalysesService'


async function start() {

    const APISERVICE = new AuthServiceNode('0x0000000000000000000000000000000000000000', 'trial');
    APISERVICE.getVersion()
    await APISERVICE.login()

    const anal = new AnalysesService()
    const foo = anal.submitContract(undefined, '0x608060405234801561001057600080fd5b5060d48061001f6000396000f3fe608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806338d94193146044575b600080fd5b348015604f57600080fd5b50607960048036036020811015606457600080fd5b8101908080359060200190929190505050608f565b6040518082815260200191505060405180910390f35b600081600881101515609d57fe5b01600091509050548156fea165627a7a723058206f554b09240c9771a583534d72575fcfb4623ab4df3ddc139442047795fd383b0029')
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

export { AuthServiceNode as AuthService } from './apiServices/AuthServiceNode'
export { AnalysesService } from './apiServices/AnalysesService'
// export var __useDefault = true;

