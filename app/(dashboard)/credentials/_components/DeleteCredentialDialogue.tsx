"use client"
import { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { Input } from '@/components/ui/input';
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { DeleteCredential } from '@/actions/credentials/deleteCredential';

type Props = {
    name: string
}

const DeleteCredentialDialogue = ({ name }: Props) => {
    const [confirmText, setConfirmText] = useState("");
    const [open, setOpen] = useState(false);
    const deleteMutation = useMutation({
        mutationFn: DeleteCredential,
        onSuccess: () => {
            toast.success("Credentials deleted successfully", { id: name });
            setConfirmText("");
        },
        onError: () => {
            toast.error("Something went wrong", { id: name });
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} size={"icon"}>
                    <XIcon size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this workflow?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        If you delete this you will not be able to recover it.
                        <div className="flex flex-col py-4 gap-2">
                            <p> If you are sure, please enter <b>{name}</b> the button below.</p>
                            <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-400 px-3 py-1.5 text-white rounded-md hover:bg-gray-600" onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive rounded-md hover:bg-destructive/90 px-3 py-1.5 text-white" disabled={confirmText !== name || deleteMutation.isPending}
                        onClick={(e) => {
                            toast.loading("Deleting credential...", { id: name });
                            deleteMutation.mutate(name)
                        }}
                    >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCredentialDialogue