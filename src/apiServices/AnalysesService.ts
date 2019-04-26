import { isBrowser, isNode } from 'browser-or-node';

import { getAnalyses } from '../analyses/getAnalyses'

import { getHeaders } from '../util/getHeaders'

import { getTokensNode } from '../node/getTokensNode'
import { errorHandler } from '../util/errorHandler'

import { API_URL_PRODUCTION, API_URL_STAGING } from '../util/constants'
import { JwtTokensInterface } from '..'

import { submitAnalysis } from '../analyses/submitAnalysis'


const ANALYSIS_SKELETON = {
    "clientToolName": "mythx-js-test",
    "data":
    {
        "bytecode": "0x6080604052602060405190810160405280600060010260001916600019168152506000906001610030929190610043565b5034801561003d57600080fd5b506100bb565b828054828255906000526020600020908101928215610085579160200282015b82811115610084578251829060001916905591602001919060010190610063565b5b5090506100929190610096565b5090565b6100b891905b808211156100b457600081600090555060010161009c565b5090565b90565b60d8806100c96000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063017a9105146044575b600080fd5b348015604f57600080fd5b50606c60048036038101908080359060200190929190505050608a565b60405180826000191660001916815260200191505060405180910390f35b600081815481101515609857fe5b9060005260206000200160009150905054815600a165627a7a72305820d1c4ab8874b5f3cc139613c225a5908ed916e813f5ccdf9a9de97ce28420ca090029",
        "sources": {
            "PublicStorageArray.sol": {
                "source": "pragma solidity ^0.5.0;\n\ncontract PublicStorageArray {\n    bytes32[] public states = [bytes32(0)];\n}",
                "ast": "{\"contracts\":{\"/tmp/test.sol:PublicStorageArray\":{}},\"sourceList\":[\"/tmp/test.sol\"],\"sources\":{\"/tmp/test.sol\":{\"AST\":{\"attributes\":{\"absolutePath\":\"/tmp/test.sol\",\"exportedSymbols\":{\"PublicStorageArray\":[9]}},\"children\":[{\"attributes\":{\"literals\":[\"solidity\",\"^\",\"0.5\",\".0\"]},\"id\":1,\"name\":\"PragmaDirective\",\"src\":\"0:23:0\"},{\"attributes\":{\"baseContracts\":[null],\"contractDependencies\":[null],\"contractKind\":\"contract\",\"documentation\":null,\"fullyImplemented\":true,\"linearizedBaseContracts\":[9],\"name\":\"PublicStorageArray\",\"scope\":10},\"children\":[{\"attributes\":{\"constant\":false,\"name\":\"states\",\"scope\":9,\"stateVariable\":true,\"storageLocation\":\"default\",\"type\":\"bytes32[]\",\"visibility\":\"public\"},\"children\":[{\"attributes\":{\"length\":null,\"type\":\"bytes32[]\"},\"children\":[{\"attributes\":{\"name\":\"bytes32\",\"type\":\"bytes32\"},\"id\":2,\"name\":\"ElementaryTypeName\",\"src\":\"59:7:0\"}],\"id\":3,\"name\":\"ArrayTypeName\",\"src\":\"59:9:0\"},{\"attributes\":{\"argumentTypes\":null,\"isConstant\":false,\"isInlineArray\":true,\"isLValue\":false,\"isPure\":true,\"lValueRequested\":false,\"type\":\"bytes32[1] memory\"},\"children\":[{\"attributes\":{\"argumentTypes\":null,\"isConstant\":false,\"isLValue\":false,\"isPure\":true,\"isStructConstructorCall\":false,\"lValueRequested\":false,\"names\":[null],\"type\":\"bytes32\",\"type_conversion\":true},\"children\":[{\"attributes\":{\"argumentTypes\":[{\"typeIdentifier\":\"t_rational_0_by_1\",\"typeString\":\"int_const 0\"}],\"isConstant\":false,\"isLValue\":false,\"isPure\":true,\"lValueRequested\":false,\"type\":\"type(bytes32)\",\"value\":\"bytes32\"},\"id\":4,\"name\":\"ElementaryTypeNameExpression\",\"src\":\"86:7:0\"},{\"attributes\":{\"argumentTypes\":null,\"hexvalue\":\"30\",\"isConstant\":false,\"isLValue\":false,\"isPure\":true,\"lValueRequested\":false,\"subdenomination\":null,\"token\":\"number\",\"type\":\"int_const 0\",\"value\":\"0\"},\"id\":5,\"name\":\"Literal\",\"src\":\"94:1:0\"}],\"id\":6,\"name\":\"FunctionCall\",\"src\":\"86:10:0\"}],\"id\":7,\"name\":\"TupleExpression\",\"src\":\"85:12:0\"}],\"id\":8,\"name\":\"VariableDeclaration\",\"src\":\"59:38:0\"}],\"id\":9,\"name\":\"ContractDefinition\",\"src\":\"25:75:0\"}],\"id\":10,\"name\":\"SourceUnit\",\"src\":\"0:102:0\"}}},\"version\":\"0.5.0+commit.1d4f565a.Linux.g++\"}"
            }
        }
    },
    "analysisMode": "quick"
}
export class AnalysesService {
    private API_URL_PRODUCTION = "https://api.mythx.io/v1"
    private apiUrl: string = 'https://staging.api.mythx.io/v1'

    constructor() {
    }

    public async getAnalysesList() {
        try {
            if (isNode) {
                const { access } = getTokensNode('tokens.json')
                const headers = getHeaders(access)

                console.log(access, 'access')
                console.log(headers, 'header')
                console.log(`${this.apiUrl}`)

                const result = await getAnalyses(`${this.apiUrl}/analyses`, headers)
                console.log(result.data)
            }
            return
        }
        catch (err) {
            errorHandler(err)
        }
    }

    public getAnalysisStatus() {
    }

    public getDetectedIssues() { }

    public async submitContract() {
        try {
            if (isNode) {
                const jwtTokens: JwtTokensInterface = getTokensNode('tokens.json')
                const headers = getHeaders(jwtTokens.access)

                const result = await submitAnalysis(`${API_URL_STAGING}/analyses`, ANALYSIS_SKELETON, headers)
                console.log(result.data, 'result')
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}
