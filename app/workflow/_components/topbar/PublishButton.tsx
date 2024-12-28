"use client"

import { Button } from '@/components/ui/button'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { PlayIcon, UploadIcon } from 'lucide-react'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from '@/actions/workflows/runWorkflow'
import { toast } from 'sonner'
import { useReactFlow } from '@xyflow/react'
import { PublishWorkflow } from '@/actions/workflows/publishWorkflow'

function PublishButton({ workflowId }: { workflowId: string }) {
    const { generateExecutionPlan } = useExecutionPlan();
    const { toObject } = useReactFlow();
    const mutation = useMutation({
        mutationFn: PublishWorkflow,
        onSuccess: () => {
            toast.success("Workflow published", { id: workflowId })
        },
        onError: (e) => {
            console.log(e, "error in execution")
            toast.error("Error publishing workflow", { id: workflowId })
        }
    });
    return (
        <Button
            variant={'outline'}
            className="flex items-center gap-2"
            disabled={mutation.isPending}
            onClick={() => {
                const plan = generateExecutionPlan();
                console.table(plan)
                console.log(plan, "@plan")
                if (!plan) {
                    return;
                }
                toast.loading("Publishing workflow", { id: workflowId })
                mutation.mutate({
                    id: workflowId,
                    flowDefenition: JSON.stringify(toObject())
                })
            }}
        >
            <UploadIcon size={18} className='stroke-blue-700' />
            Publish
        </Button>
    );
}

export default PublishButton;
