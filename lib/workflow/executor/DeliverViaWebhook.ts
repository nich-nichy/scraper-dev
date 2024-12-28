import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookElementTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookElementExecutor(environment: ExecutionEnvironment<typeof DeliverViaWebhookElementTask>): Promise<boolean> {
    try {
        const targetUrl = environment.getInput("Target URL");
        if (!targetUrl) {
            environment.log.error("Target URL not defined");
        }
        const body = environment.getInput("Body");
        if (!body) {
            environment.log.error("input -> body not defined");
        }
        const response = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const statusCode = response.status;
        if (statusCode !== 200) {
            environment.log.error(`Unexpected status code: ${statusCode}`);
            return false;
        }
        const responseBody = await response.json();
        environment.log.info(JSON.stringify(responseBody, null, 4));
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}