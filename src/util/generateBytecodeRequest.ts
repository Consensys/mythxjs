export function generateBytecodeRequest(bytecode: string, toolName?: string) {
    const clientToolName = toolName || "MythxJS"
    return {
        "clientToolName": clientToolName,
        "data":
        {
            "bytecode": `${bytecode}`
        }
    }
}