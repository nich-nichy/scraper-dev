import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, FileJson2Icon, GlobeIcon, LucideProps, MousePointerClickIcon, TextIcon } from "lucide-react";


export const ReadPropertyFromJsonElementTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read Property From Json",
    icon: (props) => (<FileJson2Icon className="stroke-orange-600" {...props} />),
    isEntryPoint: false,
    credits: 1,
    inputs: [
        {
            name: "JSON",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Property name",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Property value",
            type: TaskParamType.STRING,
        }
    ] as const,
} satisfies WorkflowTask;