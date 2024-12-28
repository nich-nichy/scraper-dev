"use client"
import { UpdateWorkflow } from '@/actions/workflows/updateWorkflows'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    workflowId: string
}

const SaveButton = ({ workflowId }: Props) => {
    const { toObject } = useReactFlow();
    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success("Workflow saved", { id: "save-workflow" })
        },
        onError: () => {
            toast.error("Something went wrong", { id: "save-workflow" })
        }
    })

    return (

        <Button
            variant={"outline"}
            className="flex items-center gap-2"
            onClick={() => {
                const workflowDefinition = JSON.stringify(toObject());
                const toastId = toast.loading("Saving workflow...");

                saveMutation.mutate({
                    id: workflowId,
                    definition: workflowDefinition,
                }, {
                    onSuccess: () => {
                        toast.success("Workflow saved successfully!", { id: toastId, duration: 3000 });
                    },
                    onError: () => {
                        toast.error("Failed to save workflow.", { id: toastId, duration: 3000 });
                    },
                });
            }}
        >
            <CheckIcon size={16} className="stroke-green-400" />
            Save
        </Button>
    )
}

export default SaveButton