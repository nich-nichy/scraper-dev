import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowUpIcon } from "lucide-react";

export const ScrollElementTask = {
    type: TaskType.SCROLL_ELEMENT,
    label: "Scroll to Element",
    icon: (props) => (<ArrowUpIcon className="stroke-orange-600" {...props} />),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Web page",
            type: TaskParamType.BROWSER_INSTANCE,
        }
    ] as const,
} satisfies WorkflowTask;