import { isBrowser, isNode } from 'browser-or-node';

import { AuthService } from './apiServices/AuthService'

// TODO: look into what future for env variables
const dotenv = require('dotenv');
dotenv.config();

const APISERVICE = new AuthService('0x0000000000000000000000000000000000000000', 'trial');
APISERVICE.login()
APISERVICE.getCredentials()
// APISERVICE.refreshToken()


export interface JwtTokensInterface {
    access: string
    refresh: string
}

export function mythxjsMain() {
    if (isBrowser) {
        // do browser only stuff
        console.log('this is mythjs browser xxx')
    }

    if (isNode) {
        console.log('this is mythxjs node')
    }

}

// SERVICE INTERFACES AND FACTORIES

export {
    AuthService as Login,
} from './apiServices/AuthService'


// mythxjsMain()