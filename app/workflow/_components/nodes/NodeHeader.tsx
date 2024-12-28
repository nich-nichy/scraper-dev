"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { AppNode } from '@/types/appNode'
import { TaskType } from '@/types/task'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { useReactFlow } from '@xyflow/react'
import { ArrowRightCircle, Coins, CoinsIcon, CopyIcon, GripVerticalIcon, Trash2Icon } from 'lucide-react'
import React from 'react'

function NodeHeader({ taskType, nodeId }: { taskType: TaskType, nodeId: string }) {
    const task = TaskRegistry[taskType]
    const { deleteElements, getNode, addNodes } = useReactFlow();
    return (
        <div
            className={cn(
                "flex items-center gap-4 p-4",
                "bg-gradient-to-r from-white/95 to-blue-50/30",
                "dark:from-slate-800/70 dark:to-blue-900/20",
                "border-b border-gray-100 dark:border-slate-700",
                "rounded-t-lg transition-all duration-300 ease-in-out",
                "drag-handle cursor-grab bg-blue-300 hover:bg-gray-300 dark:hover:bg-slate-700/50",
            )}
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <task.icon
                            className={cn(
                                "text-blue-600 dark:text-blue-400",
                                "transition-transform transform",
                                "group-hover:scale-110"
                            )}
                            size={30}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        {task.label} Task
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <div className="flex justify-between items-center w-full">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    {task.label}
                </p>
            </div>

            <div className="flex items-center space-x-2">
                {task.isEntryPoint && (
                    <Badge
                        variant="secondary"
                        className={cn(
                            "bg-blue-100 text-blue-800",
                            "dark:bg-blue-900/50 dark:text-blue-300",
                            "transition-colors duration-200 hover:bg-blue-100"
                        )}
                    >
                        Entry
                    </Badge>
                )}
                <Badge
                    variant="outline"
                    className={cn(
                        "flex items-center gap-1",
                        "text-xs font-medium",
                        "border-blue-200 text-blue-700",
                        "dark:border-blue-800/50 dark:text-blue-300",
                        "transition-colors"
                    )}
                >
                    <CoinsIcon size={12} className="mr-1" />
                    {task.credits}
                </Badge>
                {!task.isEntryPoint && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "text-gray-500 hover:text-gray-700",
                                "dark:text-gray-400 dark:hover:text-gray-200",
                                "transition-colors"
                            )}
                            onClick={() => {
                                deleteElements({
                                    nodes: [
                                        {
                                            id: nodeId,
                                            type: task.type,
                                            position: {
                                                x: 0,
                                                y: 0,
                                            },
                                            data: {
                                                label: task.label,
                                                taskType: task.type,
                                                isEntryPoint: task.isEntryPoint,
                                            },
                                        },
                                    ],
                                })
                            }}
                        >
                            <Trash2Icon className="stroke-red-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "text-gray-500 hover:text-gray-700",
                                "dark:text-gray-400 dark:hover:text-gray-200",
                                "transition-colors"
                            )}
                            onClick={() => {
                                const node = getNode(nodeId) as AppNode;
                                const newX = node.position.x;
                                const newY = node.position.y + node.measured?.height! + 20;
                                const newNode = CreateFlowNode(node.data.type, {
                                    x: newX,
                                    y: newY,
                                });
                                addNodes([newNode]);
                            }}

                        >
                            <CopyIcon />
                        </Button>
                    </>
                )}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "text-gray-500 hover:text-gray-700",
                                    "dark:text-gray-400 dark:hover:text-gray-200",
                                    "transition-colors"
                                )}
                            >
                                <GripVerticalIcon size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><Badge className="bg-gray-600 mb-2">Drag to Reorder</Badge></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}

export default NodeHeader


// function NodeHeader({ taskType }: { taskType: TaskType }) {
//     const task = TaskRegistry[taskType];

//     return (
//         <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-none shadow-sm">
//             <div className="p-3 flex items-center bg-white shadow-lg justify-between group transition-all duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg">
//                 <div className="flex items-center gap-3">
//                     <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200">
//                         <task.icon
//                             size={18}
//                             className="text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform duration-200"
//                         />
//                     </div>

//                     <div className="flex flex-col">
//                         <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200">
//                             {task.label}
//                         </h3>
//                         <p className="text-xs text-slate-500 dark:text-slate-400">
//                             Task ID: {taskType}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     {task.isEntryPoint && (
//                         <TooltipProvider>
//                             <Tooltip>
//                                 <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors duration-200">
//                                     <ArrowRightCircle size={12} className="mr-1" />
//                                     Entry
//                                 </Badge>
//                             </Tooltip>
//                         </TooltipProvider>
//                     )}
//                     <TooltipProvider>
//                         <Tooltip>
//                             <Badge variant="outline" className="bg-white dark:bg-slate-800 shadow-sm flex items-center gap-2 px-3 py-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
//                                 <Coins size={12} className="text-amber-500" />
//                                 <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                                     TODO
//                                 </span>
//                             </Badge>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </div>
//             </div>
//         </Card>
//     );
// };

// export default NodeHeader;