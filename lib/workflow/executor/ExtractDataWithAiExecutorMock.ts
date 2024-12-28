import { ExecutionEnvironment } from "@/types/executor";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/helper/encryption";
import { ExtractDataWithAIMockTask } from "../task/ExtractDataWithAIMock";


export async function ExtractDataWithAiMockElementExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAIMockTask>): Promise<boolean> {
    try {
        const credentials = environment.getInput("Credentials");
        if (!credentials) {
            environment.log.error("Credentials not defined");
        }
        const prompt = environment.getInput("Prompt");
        if (!prompt) {
            environment.log.error("input -> prompt not defined");
        }
        const content = environment.getInput("Content");
        if (!content) {
            environment.log.error("input -> content not defined");
        }

        const credential = await prisma.credential.findUnique({
            where: { id: credentials }
        })

        if (!credential) {
            environment.log.error("Credential not found")
            return false
        }

        const plainCredentialValue = symmetricDecrypt(credential.value);
        if (!plainCredentialValue) {
            environment.log.error("Cannot decrypt credential");
            return false;
        }
        const mockExtractedData = {
            usernameSelector: "#username",
            passwordSelector: "#password",
            loginSelector: "body > div > form > input.btn.btn-primary"
        }
        // Implement Gemini
        environment.setOutput("Extracted Data", JSON.stringify(mockExtractedData))
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}

