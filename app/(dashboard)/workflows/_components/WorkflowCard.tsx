"use client"

import TooltipWrapper from '@/components/TooltipWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types/workflow'
import { Workflow } from '@prisma/client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronRightIcon, ClockIcon, Coins, CornerDownLeft, CornerDownRightIcon, FileTextIcon, MoreHorizontalIcon, MoreVerticalIcon, MoveRightIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import DeleteWorkflowDialogue from './DeleteWorkflowDialogue'
import RunBtn from './RunBtn'
import SchedulerDialog from './SchedulerDialog'
import { Badge } from '@/components/ui/badge'
import ExecutionStatusIndicator, { ExecutionStatusLabel } from '@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator'
import { formatDate, formatDistanceToNow } from 'date-fns'
import { formatInTimeZone } from "date-fns-tz"
import DuplicateWorkflowDialogue from './DuplicateWorkflowDialogue'
import { Separator } from '@/components/ui/separator'

const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-amber-500 text-yellow-200",
    [WorkflowStatus.PUBLISHED]: "bg-green-500",

}

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;
    console.log({ workflow })
    return (
        <Card className="border border-seperate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-blue-400/30 group/card">
            <CardContent className="flex justify-between items-center p-4 h-[100px]">
                <div className="flex items-center justify-end space-x-3">
                    <div className={cn("w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center", WorkflowStatus.DRAFT ? statusColors[workflow.status as WorkflowStatus] : "bg-green-500")}>
                        {isDraft ?
                            <FileTextIcon className="h-5 w-5" />
                            :
                            <PlayIcon className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-muted-foreground flex items-center">
                            <TooltipWrapper content={workflow.description}>
                                <Link href={`/workflow/editor/${workflow.id}`} className="flex items-center hover:underline">{workflow.name}</Link>
                            </TooltipWrapper>
                            {isDraft && <span className="ml-2 text-xs font-medium text-muted-foreground bg-amber-500 text-white rounded-full px-2 py-0.5">Draft</span>}
                            <DuplicateWorkflowDialogue workflowId={workflow.id} />
                        </h3>

                        <ScheduleSection isDraft={isDraft} creditsCost={workflow.creditsCost} workflowId={workflow.id} cron={workflow.cron} />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {!isDraft && <RunBtn workflowId={workflow.id} />}
                    <Link href={`/workflow/editor/${workflow.id}`} className={cn(buttonVariants({
                        variant: "outline",
                        size: "sm"
                    }),
                        "flex items-center justify-center"
                    )}><ShuffleIcon size={16} /> Edit</Link>
                    <WorkflowCardActions workflowName={workflow?.name} workflowId={workflow?.id} />
                </div>
            </CardContent>
            <LastRunDetails workflow={workflow} />
        </Card>
    )
}

const WorkflowCardActions = ({ workflowName, workflowId }: { workflowName: string, workflowId: string }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    return (
        <>
            <DeleteWorkflowDialogue open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"sm"}>
                        <TooltipWrapper content={"More actions"}>
                            <div className='flex items-center justify-center w-full h-full'>
                                <MoreVerticalIcon size={16} />
                            </div>
                        </TooltipWrapper>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="p-3 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden dark:bg-[#1C1917]"
                >
                    <DropdownMenuLabel className='text-sm font-semibold text-gray-600 text-center py-3'>
                        Actions
                    </DropdownMenuLabel>
                    <Separator className='bg-gray-200' />
                    <DropdownMenuSeparator className='bg-gray-200' />
                    <DropdownMenuItem
                        className="
            text-red-600 
            hover:bg-red-50 
            dark:hover:bg-[#1C1917]
            focus:bg-red-100 
            cursor-pointer 
            transition-colors 
            duration-200 
            flex 
            items-center 
            text-sm 
            font-medium
            m-1
        "
                        onSelect={() => {
                            setShowDeleteDialog((prev) => !prev)
                        }}
                    >
                        <TrashIcon
                            size={16}
                            className="stroke-red-500 stroke-2"
                        />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}

const ScheduleSection = ({ isDraft, creditsCost, workflowId, cron }: { isDraft?: boolean, creditsCost: number, workflowId: string, cron: string | null }) => {
    if (isDraft) return null
    console.log(cron, "cron", workflowId, "workflowId")
    return (
        <div className="flex items-center gap-2">
            <CornerDownRightIcon className='h-4 w-4 text-muted-foreground' />
            <SchedulerDialog workflowId={workflowId} cron={cron} key={`${cron}-${workflowId}`} />
            <MoveRightIcon className='h-4 w-4 text-muted-foreground' />
            <TooltipWrapper content="Credit consumption for full run">
                <div className='flex items-center gap-3'>
                    <Badge variant={"outline"} className='space-x-2 text-muted-foreground rounded-full'><Coins className='h-4 w-4' />
                        <span className='text-sm'>{creditsCost}</span></Badge>
                </div>
            </TooltipWrapper>
        </div>
    )
}

const LastRunDetails = ({ workflow }: { workflow: Workflow }) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT
    if (isDraft) {
        return null
    }
    const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
    const formattedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
    const nextSchedule = nextRunAt && formatDate(nextRunAt, "yyyy-MM-dd HH:mm");
    const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm")
    return <div className='bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground dark:bg-blue-600/5 '>
        <div className='flex items-center text-sm gap-2'>

            {lastRunAt && (<Link href={`/workflow/runs/${workflow.id}/${lastRunId}`} className='flex items-center text-sm gap-2 group'>
                <span>Last run: </span>
                <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus} />
                <ExecutionStatusLabel status={lastRunStatus as WorkflowExecutionStatus} />
                <span>{formattedStartedAt}</span>
                <ChevronRightIcon size={14} className='-translate-x-[2px] group-hover:translate-x-0 transition' />
            </Link>
            )}
            {!lastRunAt && <p>No runs yet</p>}
        </div>
        {nextRunAt && <div className='flex items-center text-sm gap-2'>
            <ClockIcon size={12} />
            <span>Next run at: </span>
            <span>{nextSchedule}</span>
            <span className='text-xs'>({nextScheduleUTC} UTC)</span></div>}
    </div>
}

export default WorkflowCard;