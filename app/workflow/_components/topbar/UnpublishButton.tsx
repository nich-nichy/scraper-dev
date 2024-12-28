"use client"

import { Button } from '@/components/ui/button'
import { DownloadIcon } from 'lucide-react'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { UnpublishWorkflow } from '@/actions/workflows/unpublishWorkflow'

function UnpublishButton({ workflowId }: { workflowId: string }) {
    const mutation = useMutation({
        mutationFn: UnpublishWorkflow,
        onSuccess: () => {
            toast.success("Workflow unpublished", { id: workflowId })
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
                toast.loading("Unublishing workflow", { id: workflowId })
                mutation.mutate(
                    workflowId
                )
            }}
        >
            <DownloadIcon size={18} className='stroke-orange-700' />
            Unpublish
        </Button>
    );
}

export default UnpublishButton;
