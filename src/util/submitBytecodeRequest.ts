export function submitBytecodeRequest(bytecode: string) {
    return {
        "clientToolName": "mythxjs-api",
        "data":
        {
            "bytecode": `${bytecode}`
        }
    }
}