import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/NavigateUrlTask";

export async function NavigateUrlExecutor(environment: ExecutionEnvironment<typeof NavigateUrlTask>): Promise<boolean> {
    try {
        const url = environment.getInput("URL");
        if (!url) {
            environment.log.error("Selector not defined");
        }
        await environment.getPage()!.goto(url);
        environment.log.info(`Visited ${url}`)
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}