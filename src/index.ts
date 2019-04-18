// Below just for testing
import { AuthService } from './apiServices/AuthService'
// TODO: look into what future for env variables
const dotenv = require('dotenv');
dotenv.config();

const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
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
    AuthService
} from './apiServices/AuthService'
