import { ExecutionEnvironment } from "@/types/executor";
import { ScrollElementTask } from "../task/ScrollElement";

export async function ScrollElementExecutor(environment: ExecutionEnvironment<typeof ScrollElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector not defined");
        }
        await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                environment.log.error(`Element ${selector} not found`);
                throw new Error(`Element ${selector} not found`);
            }
            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top })
        }, selector);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}