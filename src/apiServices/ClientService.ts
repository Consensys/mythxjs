import { AuthService } from './AuthService'
import { AnalysesService } from './AnalysesService'
import { JwtTokensInterface, AnalyzeOptions } from '..'

/**
 * Main service exposed to outside.
 * Needs to be instantiated with username, password and toolName (optional) fields.
 * Please note that this is exported as `Client`.
 * @example
 * `import { Client } from 'mythxjs'`.
 *
 * `const mythx = new Client('0x0000000000000000000000000000000000000000', 'trial', 'testTool');`
 */
export class ClientService {
    /**
     * @ignore
     */
    private ethAddress
    /**
     * @ignore
     */
    private password
    /**
     * @ignore
     */
    private authService
    /**
     * @ignore
     */
    private analysesService
    /**
     * @ignore
     */
    private jwtTokens
    /**
     * @ignore
     */
    private toolName

    constructor(ethAddress: string, password: string, toolName: string = 'MythXJS') {
        this.ethAddress = ethAddress
        this.password = password
        this.authService = new AuthService(ethAddress, password)
        this.toolName = toolName
    }

    /**
     *  Login to the API using ethAddress and password specified in the library constructor.
     * @return {Promise<JwtTokensInterface>}  Returns an object containing two tokens (access+refresh) that can be saved in storage.
     */
    async login(): Promise<JwtTokensInterface> {
        this.jwtTokens = await this.authService.login(this.ethAddress, this.password)
        this.analysesService = new AnalysesService(this.jwtTokens, this.toolName)

        return this.jwtTokens
    }

    /**
     *  Login to the API using a set of pre-existing tokens.
     *   Can be used when user has previously log in and stored those tokens in memory.
     * @param jwtTokens object containing access + refresh token
     * - example: loginWithToken({access:'foo', refresh: 'foo2'})
     * @return {void}
     */
    loginWithToken(jwtTokens: JwtTokensInterface) {
        this.analysesService = new AnalysesService(jwtTokens)
    }

    /**
     *  Login to the API using metamask challenge result message.
     *  In order to get the message use `getChallenge` and handle Metamask login in the frontend.
     * @param message string returned from `getChallenge`
     * @return {Promise<JwtTokensInterface>}  Returns an object containing two tokens (access+refresh) that can be saved in storage.
     */
    async loginWithMetamask(message: string): Promise<JwtTokensInterface | void> {
        return await this.authService.loginWithMetamask(message)
    }

    /**
     *  Generates authentication challenge (Metamask only for now).
     *  The Metamask flow needs to be handled on the front end since MythXJS does not have Web3 dependencies.
     * @returns Resolves with API response or throw error
     */

    async getChallenge(): Promise<any | void> {
        return await this.authService.getChallenge()
    }

    /**
     *  Logout from the API.
     * @returns Resolves with API response or throw error
     */
    async logout() {
        return await this.authService.logout()
    }

    /**
     *   Returns API current version.
     *   Does not require login.
     */
    async getVersion() {
        return await this.authService.getVersion()
    }

    /**
     *  Refresh current set of tokens.
     * @param jwtTokens - Object containing access + refresh token
     * @return {Promise<any>}  Returns new set of tokens or throws error.
     */
    async refreshToken(jwtTokens?: JwtTokensInterface) {
        return await this.authService.refreshToken(jwtTokens)
    }

    /**
     *   Returns API stats.
     *   Internal only, needs admin credentials to be accessed.
     */
    async getStats(queryString?: string) {
        return await this.authService.getStats(queryString)
    }

    async getAnalysesList() {
        return await this.analysesService.getAnalysesList()
    }

    /**
     * Get status for analysis on given UUID.
     * @param uuid - unique identifier of analysis job
     * @return {Promise<any>} Resolves with API response, or throws error
     */
    async getAnalysisStatus(uuid: string) {
        return await this.analysesService.getAnalysisStatus(uuid)
    }

    /**
     * Gets the array of issues from the API.
     *
     * @param {String} uuid - unique identifier of analysis job
     * @returns {Promise} Resolves with API response, or throws error
     */
    async getDetectedIssues(uuid: string) {
        return await this.analysesService.getDetectedIssues(uuid)
    }

    /**
     * Submit a smart contract using bytecode only.
     *
     * @param {String} bytecode - Compiled bytecode of a smart contract for example "0xfe".
     * @return {Promise} Resolves with API response, or throws an
     *  an error.
     */
    async submitBytecode(bytecode: string): Promise<any> {
        return await this.analysesService.submitBytecode(bytecode)
    }

    /**
     * Submit a smart contract using sourcecode only.
     *
     * @param {String} sourceCode - String containing smart contract sourcecode.
     * @param {String} contractName - Name of the contract to submit for analysis.
     * @return {Promise} Resolves with API response, or throws an
     *  an error.
     */
    async submitSourceCode(sourceCode: string, contractName: string) {
        return await this.analysesService.submitSourceCode(sourceCode, contractName)
    }

    /**
     * Submit a smart contract using custom parameters.
     *
     * @param {Object} options - Object containing options to submit to API
     * @return {Promise} Resolves with API response, or throws an
     *  an error.
     */
    async analyze(options: AnalyzeOptions) {
        return await this.analysesService.analyze(options)
    }
}
