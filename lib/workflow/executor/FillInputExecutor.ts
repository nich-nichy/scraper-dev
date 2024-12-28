import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHtmlTask } from "../task/PageToHtml";
import { FillInputTask } from "../task/FillInput";

export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector not defined");
        }

        const value = environment.getInput("Value");
        if (!value) {
            environment.log.error("Input value not defined");
            return false;
        }

        await environment.getPage()!.type(selector, value);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}