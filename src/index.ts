// Below just for testing
import { ApiService } from './apiService/ApiService'
// TODO: look into what future for env variables
const dotenv = require('dotenv');
dotenv.config();


// public ethAddress: string = '0x0000000000000000000000000000000000000000'
// public password: string = 'trial'
const APISERVICE = new ApiService('0x0000000000000000000000000000000000000000', 'trial');
APISERVICE.login()

// BUSINESS OBJECTS

interface JwtTokens {
    access: string
    refresh: string
}

export interface loginResponse {
    jwtTokens: JwtTokens
    access: string
    refresh: string
}


// SERVICE INTERFACES AND FACTORIES

export {
    ApiService
} from './apiService/ApiService'
