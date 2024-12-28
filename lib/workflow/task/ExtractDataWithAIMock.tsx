import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainCircuitIcon, BrainCogIcon } from "lucide-react";


export const ExtractDataWithAIMockTask = {
    type: TaskType.EXTRACT_DATA_WITH_AI_MOCK,
    label: "Extract data with AI Mock",
    icon: (props) => (<BrainCogIcon className="stroke-rose-400" {...props} />),
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