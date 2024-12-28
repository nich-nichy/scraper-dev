"use client"

import { Button } from '@/components/ui/button'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { RunWorkflow } from '@/actions/workflows/runWorkflow'
import { toast } from 'sonner'
import { useReactFlow } from '@xyflow/react'

function ExecuteButton({ workflowId }: { workflowId: string }) {
    const { generateExecutionPlan } = useExecutionPlan();
    const { toObject } = useReactFlow();
    const mutation = useMutation({
        mutationFn: RunWorkflow,
        onSuccess: () => {
            toast.success("Execution started", { id: "flow-execution" })
        },
        onError: (e) => {
            console.log(e, "error in execution")
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

                mutation.mutate({
                    workflowId: workflowId,
                    flowDefenition: JSON.stringify(toObject())
                })
            }}
        >
            <PlayIcon size={18} className='stroke-amber-700' />
            Execute
        </Button>
    );
}

export default ExecuteButton;
