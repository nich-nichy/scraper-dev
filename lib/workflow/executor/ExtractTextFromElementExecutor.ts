import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { PageToHtmlTask } from "../task/PageToHtml";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            environment.log.error("Selector not defined");
            return false;
        }
        const html = environment.getInput("Html");
        if (!html) {
            environment.log.error("Html not defined");
            return false;
        }

        const $ = cheerio.load(html);
        const element = $(selector);
        if (!element) {
            environment.log.error("Element not found");
            return false;
        }

        const extractedText = element.text();
        if (!extractedText) {
            environment.log.error("Element text is empty");
            return false;
        }

        environment.setOutput("Extracted text", extractedText);
        return true;
    }
    catch (err: any) {
        environment.log.error(err.message)
        return false;
    }
}