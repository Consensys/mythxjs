// Below just for testing
import { AuthService } from './apiServices/AuthService'
import { AnalysesService } from './apiServices/AnalysesService'

const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
// APISERVICE.logout()
// APISERVICE.refreshToken()

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


// SERVICE INTERFACES AND FACTORIES

export { AuthService } from './apiServices/AuthService'
export { AnalysesService } from './apiServices/AnalysesService'
// export var __useDefault = true;

