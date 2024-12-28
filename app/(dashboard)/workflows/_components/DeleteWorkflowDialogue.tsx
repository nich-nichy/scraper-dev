"use client"
import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { Input } from '@/components/ui/input';
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}

const DeleteWorkflowDialogue = ({ open, setOpen, workflowName, workflowId }: Props) => {
    const [confirmText, setConfirmText] = useState("");
    console.log(confirmText, workflowName, "workflowName")
    console.log(workflowId, "workflowId")

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", { id: workflowId });
            setConfirmText("");
        },
        onError: () => {
            toast.error("Something went wrong", { id: workflowId });
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this workflow?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this you will not be able to recover it.
                        <div className="flex flex-col py-4 gap-2">
                            <p> If you are sure, please enter <b>{workflowName}</b> the button below.</p>
                            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-400 px-3 py-1.5 text-white rounded-md hover:bg-gray-600" onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive rounded-md hover:bg-destructive/90 px-3 py-1.5 text-white" disabled={confirmText !== workflowName || deleteMutation.isPending}
                        onClick={(e) => {
                            toast.loading("Deleting workflow...", { id: workflowId });
                            deleteMutation.mutate(workflowId)
                        }}
                    >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteWorkflowDialogue