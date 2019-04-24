// Below just for testing
import { AuthService } from './apiServices/AuthService'

const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
APISERVICE.login()

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
// export var __useDefault = true;

