import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/helper/encryption";
import OpenAI from "openai"


export async function ExtractDataWithAiElementExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAITask>): Promise<boolean> {
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
        console.log({ prompt })
        // FIXME: Get api
        // const genAI = new GoogleGenerativeAI("YOUR_GOOGLE_API_KEY");
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        // const openai = new OpenAI({
        //     apiKey: plainCredentialValue,
        // });
        // const response = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [{
        //         role: "system",
        //         content:
        //             "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
        //     }, {
        //         role: "user",
        //         content: content,
        //     },
        //     { role: "user", content: prompt },
        //     ],
        //     temperature: 1
        // });
        const response = await callOpenAI(plainCredentialValue, content, prompt)
        environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`)
        environment.log.info(`Completion tokens: ${response.usage?.completion_tokens}`)

        const result = response.choices[0].message?.content;

        if (!result) {
            environment.log.error("No result from OpenAI")
            return false
        }
        environment.setOutput("Extracted Data", result)
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}

async function callOpenAI(plainCredentialValue: any, content: any, prompt: any) {
    const MAX_RETRIES = 3;
    let retries = 0;
    const openai = new OpenAI({
        apiKey: plainCredentialValue,
    });
    while (retries < MAX_RETRIES) {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content:
                        "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
                }, {
                    role: "user",
                    content: content,
                },
                { role: "user", content: prompt },
                ],
                temperature: 1,
            });
            return response;
        } catch (error: any) {
            if (error.status === 429) {
                console.warn("Rate limit exceeded. Retrying...");
                await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
                retries++;
            } else {
                throw error;
            }
        }
    }
    throw new Error("Exceeded retry limit for API call.");
}
