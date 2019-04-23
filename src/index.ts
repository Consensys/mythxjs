// Below just for testing
import { AuthService } from './apiServices/AuthService'
import { AnalysesService } from './apiServices/AnalysesService'

// TODO: look into what future for env variables
const dotenv = require('dotenv');
dotenv.config();

// const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
// APISERVICE.login()
// APISERVICE.refreshToken()

const ANALYSESSERVICE = new AnalysesService()

ANALYSESSERVICE.getAnalysesList()

// BUSINESS OBJECTS

export interface JwtTokens {
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
    AuthService as Login,
} from './apiServices/AuthService'

// export {
//     AnalysesService as Analyses
// } from './apiServices/AnalysesService'
