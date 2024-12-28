import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitFor'
import { AlertCircle, Grid2x2Plus, InboxIcon, Workflow } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkflowDialogue from './_components/CreateWorkflowDialogue'
import WorkflowCard from './_components/WorkflowCard'

const page = () => {
    return (
        <div className="flex-1 flex flex-col h-full">
            <div className='flex flex-col sm:flex-row justify-between items-center py-6 border-b border-gray-200'>
                <div className='mb-4 sm:mb-0'>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
                        Workflows
                    </h1>
                    <p className='text-sm text-gray-500 mt-2'>
                        Manage your workflows and automate your tasks
                    </p>
                </div>
                <div className='w-full sm:w-auto'>
                    <CreateWorkflowDialogue />
                </div>
            </div>
            <div className="h-full py-6">
                <Suspense fallback={<UserWorkFlowSkeleton />}>
                    <UserWorkFlows />
                </Suspense>
            </div>
        </div>
    )
}

const UserWorkFlowSkeleton = () => {
    return <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
        ))}
    </div>
}

const UserWorkFlows = async () => {
    const workflows = await GetWorkflowsForUser();
    if (!workflows) {
        return (
            <Alert variant="destructive">
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong</AlertDescription>
            </Alert>
        )
    }
    if (workflows.length === 0) {
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center border py-20 rounded-md">
                <div className="rounded-full text-blue-400 items-center justify-center">
                    <Grid2x2Plus size={40} strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-1 text-center">
                    <p className="font-bold">No scrape flow created yet</p>
                    <p className="text-sm text-muted-foreground">
                        Click the button below to create your first workflow
                    </p>
                </div>
                <CreateWorkflowDialogue triggerText='Create your first scrape workflow' />
            </div>
        )
    }
    return <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow, index) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
    </div>
}

export default page