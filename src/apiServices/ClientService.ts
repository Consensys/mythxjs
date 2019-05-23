import { AuthService } from './AuthService'
import { AnalysesService } from './AnalysesService'
import { JwtTokensInterface } from '..'

export class ClientService {
    private ethAddress
    private password
    private authService
    private analysesService
    private jwtTokens

    constructor(ethAddress: string, password: string) {
        this.ethAddress = ethAddress
        this.password = password
        this.authService = new AuthService(ethAddress, password)
    }

    async login() {
        this.jwtTokens = this.authService.login(this.ethAddress, this.password)
        this.analysesService = new AnalysesService(this.jwtTokens)
    }

    async loginWithToken(jwtTokens: JwtTokensInterface) {
        this.analysesService = new AnalysesService(jwtTokens)
    }

    async logout() {
        this.authService.logout()
    }

    async getVersion() {
        this.authService.getVersion()
    }

    async refreshToken(jwtTokens?: JwtTokensInterface) {
        this.analysesService.refreshToken(jwtTokens)
    }

    async getAnalysesList() {
        this.analysesService.getAnalysesList()
    }

    async getAnalysisStatus(uuid: string) {
        this.analysesService.getAnalysisStatus(uuid)
    }

    async getDetectedIssues(uuid: string) {
        this.analysesService.getDetectedIssues(uuid)
    }

    async submitBytecode(bytecode: string, toolName?: string) {
        this.analysesService.submitBytecode(bytecode, toolName)
    }

    async submitSourceCode(sourceCode: string, contractName: string, toolName?: string) {
        this.analysesService.submitSourceCode(sourceCode, contractName, toolName)
    }
}
