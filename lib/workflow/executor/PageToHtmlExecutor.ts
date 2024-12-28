import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
    try {

        const html = await environment.getPage()!.content();
        environment.setOutput("Html", html);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}