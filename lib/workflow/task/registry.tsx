import { TaskType } from "@/types/task";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { WorkflowTask } from "@/types/workflow";
import { FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";
import { DeliverViaWebhookElementTask } from "./DeliverViaWebhook";
import { ReadPropertyFromJsonElementTask } from "./ReadPropertyFromJson";
import { ExtractDataWithAITask } from "./ExtractDataWithAI";
import { ExtractDataWithAIMockTask } from "./ExtractDataWithAIMock";
import { AddPropertyToJsonElementTask } from "./AddPropertyToJson";
import { NavigateUrlTask } from "./NavigateUrlTask";
import { ScrollElementTask } from "./ScrollElement";

type Registry = {
    [K in TaskType]: WorkflowTask & { type: K };
}

export const TaskRegistry: Registry = {
    LAUNCH_BROWSER: LaunchBrowserTask,
    PAGE_TO_HTML: PageToHtmlTask,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
    FILL_INPUT: FillInputTask,
    CLICK_ELEMENT: ClickElementTask,
    WAIT_FOR_ELEMENT: WaitForElementTask,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookElementTask,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAITask,
    EXTRACT_DATA_WITH_AI_MOCK: ExtractDataWithAIMockTask,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonElementTask,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonElementTask,
    NAVIGATE_URL: NavigateUrlTask,
    SCROLL_ELEMENT: ScrollElementTask
}

