import { NodeProps } from '@xyflow/react'
import { memo } from 'react'
import NodeCard from './NodeCard'
import NodeHeader from './NodeHeader'
import { AppNodeData } from '@/types/appNode'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { NodeInput, NodeInputs } from './NodeInputs'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { NodeOutput, NodeOutputs } from './NodesOutput'
import { Badge } from '@/components/ui/badge'

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true'

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData
    const task = TaskRegistry[nodeData.type]
    return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
        {DEV_MODE && <Badge>Dev: {props.id}</Badge>}
        <NodeHeader taskType={nodeData.type} nodeId={props.id} />
        <NodeInputs>{task.inputs.map((input) => (
            <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}</NodeInputs>
        <NodeOutputs>{task.outputs.map((output) => (
            <NodeOutput key={output.name} output={output} />
        ))}</NodeOutputs>
    </NodeCard>
})

// const NodeComponent = memo((props: NodeProps) => {
//     const nodeData = props.data as AppNodeData
//     const task = TaskRegistry[nodeData.type]
//     return (
//         <Card
//             className={cn(
//                 "w-[29rem] shadow-md rounded-lg overflow-hidden",
//                 "border-2 transition-all duration-300",
//                 !!props.selected
//                     ? "border-blue-500 dark:border-blue-300 ring-4 ring-blue-100/50"
//                     : "border-gray-200 dark:border-slate-700 hover:border-blue-200"
//             )}
//         >
//             <NodeHeader taskType={nodeData.type} />
//             <NodeInputs>
//                 {task.inputs.map((input) => (
//                     <NodeInput key={input.name} input={input} />
//                 ))}
//             </NodeInputs>
//         </Card>
//     )
// })

export default NodeComponent
NodeComponent.displayName = "NodeComponent";