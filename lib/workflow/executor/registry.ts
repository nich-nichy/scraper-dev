import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";
import { WaitForElementExecutor } from "./WaitForElementExecutor";
import { DeliverViaWebhookElementExecutor } from "./DeliverViaWebhook";
import { ExtractDataWithAiElementExecutor } from "./ExtractDataWithAiExecutor";
import { ReadPropertyFromJsonElementExecutor } from "./ReadPropertyFromJsonExecutor";
import { ExtractDataWithAiMockElementExecutor } from "./ExtractDataWithAiExecutorMock";
import { AddPropertyToJsonExecutor } from "./AddPropertyToJsonExecutor";
import { NavigateUrlExecutor } from "./NavigateUrlExecutor";
import { ScrollElementExecutor } from "./ScrollElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>
}

export const ExecutiorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookElementExecutor,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAiElementExecutor,
    EXTRACT_DATA_WITH_AI_MOCK: ExtractDataWithAiMockElementExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonElementExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
    NAVIGATE_URL: NavigateUrlExecutor,
    SCROLL_ELEMENT: ScrollElementExecutor
}