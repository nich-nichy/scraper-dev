import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/WaitForElement";

export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitForElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector not defined");
        }
        const visiblity = environment.getInput("Visiblity");
        if (!visiblity) {
            environment.log.error("Visiblity not defined");
        }
        await environment.getPage()!.waitForSelector(selector, {
            visible: visiblity === "visible",
            hidden: visiblity === "hidden"
        });

        environment.log.info(`Element ${selector} became: ${visiblity}`);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}