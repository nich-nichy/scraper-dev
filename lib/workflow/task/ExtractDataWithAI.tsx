import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainCircuitIcon } from "lucide-react";


export const ExtractDataWithAITask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Extract data with Chat GPT",
    icon: (props) => (<BrainCircuitIcon className="stroke-rose-400" {...props} />),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Content",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Prompt",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Credentials",
            type: TaskParamType.CREDENTIAL,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Extracted Data",
            type: TaskParamType.STRING,
        }
    ] as const
} satisfies WorkflowTask;