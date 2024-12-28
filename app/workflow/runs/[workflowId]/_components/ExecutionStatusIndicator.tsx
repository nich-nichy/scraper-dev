import { cn } from '@/lib/utils'
import { WorkflowExecutionStatus } from '@/types/workflow'
import React from 'react'

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "bg-slate-500",
    RUNNING: "bg-yellow-500",
    COMPLETED: "bg-emerald-500",
    FAILED: "bg-red-500",
}

export default function ExecutionStatusIndicator({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])} />
    )
}

const labelColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "text-slate-500",
    RUNNING: "text-yellow-500",
    COMPLETED: "text-emerald-500",
    FAILED: "text-red-500",
}

export function ExecutionStatusLabel({ status }: { status: WorkflowExecutionStatus }) {
    const formattedStatus = status.toLowerCase().charAt(0).toUpperCase() + status.toLowerCase().slice(1);
    console.log({ formattedStatus })
    return <span className={cn("", labelColors[status])}>{formattedStatus}</span>
}


