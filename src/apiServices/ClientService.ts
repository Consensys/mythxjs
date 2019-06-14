import { AuthService } from './AuthService'
import { AnalysesService } from './AnalysesService'
import { JwtTokensInterface } from '..'

export class ClientService {
    private ethAddress
    private password
    private authService
    private analysesService
    private jwtTokens
    private toolName

    constructor(ethAddress: string, password: string, toolName: string = 'MythXJS') {
        this.ethAddress = ethAddress
        this.password = password
        this.authService = new AuthService(ethAddress, password)
        this.toolName = toolName
    }

    async login(): Promise<JwtTokensInterface> {
        this.jwtTokens = await this.authService.login(this.ethAddress, this.password)
        this.analysesService = new AnalysesService(this.jwtTokens, this.toolName)
        console.log(this.jwtTokens, 'tokensss')
        return this.jwtTokens
    }

    async loginWithToken(jwtTokens: JwtTokensInterface) {
        this.analysesService = new AnalysesService(jwtTokens)
    }

    async logout() {
        return await this.authService.logout()
    }

    async getVersion() {
        return await this.authService.getVersion()
    }

    async refreshToken(jwtTokens?: JwtTokensInterface) {
        return await this.analysesService.refreshToken(jwtTokens)
    }

    async getStats(queryString?: string) {
        return await this.authService.getStats(queryString)
    }

    async getAnalysesList() {
        return await this.analysesService.getAnalysesList()
    }

    async getAnalysisStatus(uuid: string) {
        return await this.analysesService.getAnalysisStatus(uuid)
    }

    async getDetectedIssues(uuid: string) {
        return await this.analysesService.getDetectedIssues(uuid)
    }

    async submitBytecode(bytecode: string) {
        return await this.analysesService.submitBytecode(bytecode)
    }

    async submitSourceCode(sourceCode: string, contractName: string) {
        return await this.analysesService.submitSourceCode(sourceCode, contractName)
    }
}
