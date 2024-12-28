"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import React from 'react'

function TaskMenu() {
    return (
        <aside
            className="
                    w-[320px] 
                    min-w-[320px] 
                    max-w-[320px] 
                    border-r-2 
                     p-2 px-4
           h-[100%]
        no-scrollbar overflow-y-auto
                "
        >
            <Accordion
                type="multiple"
                className="w-full"
                defaultValue={["extraction", "interactions", "timing", "results", "storage"]}
            >
                <div className="h-full ">
                    <Accordion type="multiple" className="w-full" defaultValue={["extraction", "interactions", "timing", "results", "storage"]}>
                        <AccordionItem value="interactions">
                            <AccordionTrigger>User Interactions</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-1">
                                    <TaskMenuBtn taskType={TaskType.FILL_INPUT} />
                                    <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT} />
                                    <TaskMenuBtn taskType={TaskType.NAVIGATE_URL} />
                                    <TaskMenuBtn taskType={TaskType.SCROLL_ELEMENT} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="extraction">
                            <AccordionTrigger>Extraction</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-1">
                                    <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
                                    <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
                                    <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI} />
                                    <TaskMenuBtn taskType={TaskType.EXTRACT_DATA_WITH_AI_MOCK} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="timing">
                            <AccordionTrigger>Timing controls</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-1">
                                    <TaskMenuBtn taskType={TaskType.WAIT_FOR_ELEMENT} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="storage">
                            <AccordionTrigger>Data storage</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-1">
                                    <TaskMenuBtn taskType={TaskType.READ_PROPERTY_FROM_JSON} />
                                    <TaskMenuBtn taskType={TaskType.ADD_PROPERTY_TO_JSON} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="results">
                            <AccordionTrigger>Result delivery</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-1">
                                    <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Accordion>
        </aside>
    )
}
export default TaskMenu;

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
    const task = TaskRegistry[taskType];
    const onDragStart = (event: React.DragEvent, type: TaskType) => {
        event.dataTransfer.setData("application/reactflow", type);
        event.dataTransfer.effectAllowed = "move";
    }
    return (
        <Button variant={"outline"}
            className="flex justify-between items-center gap-2 border w-full bg-gray-50 hover:bg-gray-200 rounded-lg dark:bg-[#1C1917] dark:hover:bg-[#181614] dark:text-white"
            draggable={true}
            onDragStart={event => onDragStart(event, taskType)}
        >
            <div className="flex gap-2">
                <task.icon size={20} />
                {task.label}
            </div>
        </Button>
    )
}