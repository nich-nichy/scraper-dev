import { CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TaskParam, TaskParamType } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import { CodeIcon } from 'lucide-react'
import React from 'react'
import NodeParamField from './NodeParamField'
import { ColorForHandle } from './common'
import useFlowValidation from '@/components/hooks/useFlowValidation'

export function NodeInputs({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col divide-2 rounded-lg rounded-t-none">
            {children}
        </div>
    )
}

// export function NodeInput({ input }: { input: any }) {
//     return (
//         <div className="flex justify-start relative p-3 -mt-1 bg-secondary w-full bg-slate-50 border-black rounded-lg rounded-t-none">
//             {/* {input.name} */}
//             <pre>{JSON.stringify(input, null, 4)}</pre>
//             <Handle id={input.name} type="target" position={Position.Left} className={cn("!bg-primary !border-background !-left-2 !w-4 !h-4 ")} />
//         </div>
//     )
// }

export function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
    const { invalidInputs } = useFlowValidation()
    const edges = useEdges();

    const isConnected = edges.some((edge) => edge.target === nodeId && edge.targetHandle === input.name)
    const hasErrors = invalidInputs.find((node) => node.nodeId === nodeId)?.inputs.find(invalidInput => invalidInput === input.name);
    return (
        <div
            className={cn(
                "relative group",
                "bg-slate-50 dark:bg-slate-900/30",
                "border-b border-gray-100 dark:border-slate-700",
                "transition-colors duration-300",
                "first:rounded-t-none last:rounded-b-lg",
                "py-3 px-4",
                "-mt-2",
                hasErrors && "bg-destructive/30",
            )}
        >
            <div className="flex items-center space-x-3 mb-2">
                <CodeIcon
                    size={16}
                    className="text-blue-600 dark:text-blue-400 opacity-70"
                />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {input.name || 'Input'}
                </span>
            </div>
            <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
            {!input.hideHandle && (
                <Handle id={input.name} isConnectable={!isConnected} type="target" position={Position.Left} className={cn("!bg-primary !border-background !-left-2 !w-4 !h-4", ColorForHandle[input.type])} />
            )}

        </div>
    )
}

// export function NodeInputs({ children }: { children: React.ReactNode }) {
//     return (
//         <CardContent
//             className={cn(
//                 "p-0 divide-y divide-gray-100 dark:divide-slate-700",
//                 "bg-white dark:bg-slate-800"
//             )}
//         >
//             {children}
//         </CardContent>
//     )
// }

// export function NodeInput({ input }: { input: any }) {
//     return (
//         <div
//             className={cn(
//                 "relative p-3 space-y-2 group",
//                 "bg-gray-50 dark:bg-slate-900/30 hover:bg-gray-100 dark:hover:bg-slate-800/50",
//                 "transition-colors duration-300"
//             )}
//         >
//             <Handle
//                 id={input.name}
//                 type="target"
//                 position={Position.Left}
//                 className={cn(
//                     "!absolute !-left-2 !top-1/2 !-translate-y-1/2",
//                     "!w-4 !h-4 !bg-blue-500 !border-2 !border-white",
//                     "opacity-0 group-hover:opacity-100 transition-opacity"
//                 )}
//             />

//             <pre
//                 className={cn(
//                     "text-xs text-gray-600 dark:text-gray-300",
//                     "overflow-x-auto max-w-full p-2 bg-gray-100 dark:bg-slate-900/50",
//                     "rounded border border-dashed border-gray-200 dark:border-slate-700"
//                 )}
//             >
//                 {JSON.stringify(input, null, 2)}
//             </pre>
//         </div>
//     )
// }


