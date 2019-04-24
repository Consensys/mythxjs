// Below just for testing
import { AuthService } from './apiServices/AuthService'
import { AnalysesService } from './apiServices/AnalysesService'

// TODO: look into what future for env variables
const dotenv = require('dotenv');
dotenv.config();

console.log('mirkogaro');

const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
APISERVICE.setCredentials()

// const ANALYSESSERVICE = new AnalysesService()

// ANALYSESSERVICE.getAnalysesList()

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

export {
    AuthService as Login,
} from './apiServices/AuthService'

// export {
//     AnalysesService as Analyses
// } from './apiServices/AnalysesService'
