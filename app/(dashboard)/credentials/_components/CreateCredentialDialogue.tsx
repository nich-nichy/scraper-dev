"use client"
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Grid2x2Plus, Loader2, ShieldEllipsisIcon } from 'lucide-react';
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';
import { createCredentialSchema, createCredentialSchemaType } from '@/schema/credentials';
import { CreateCredential } from '@/actions/credentials/createCredential';


const CreateCredentialDialogue = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false);
    const form = useForm<createCredentialSchemaType>({
        resolver: zodResolver(createCredentialSchema),
        defaultValues: {
            name: "",
            value: ""
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCredential,
        onSuccess: () => {
            toast.success("Credential created", { id: "create-credential" });
            form.reset()
            setOpen(false);
        },
        onError: () => {
            console.log("error");
            toast.error("Something went wrong", { id: "create-credential" });
        }
    });

    const onSubmit = useCallback((values: createCredentialSchemaType) => {
        console.log(values);
        toast.loading("Creating credentials...", { id: "create-credential" });
        mutate(values);
    }, [mutate]);


    const formComponent = () => {
        return (
            <div className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex gap-1 items-center">
                                        Name
                                        <p className="text-xs text-blue-500">(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="focus:via-amber-400 ring-blue-500"
                                        />

                                    </FormControl>
                                    <FormDescription>
                                        Enter a unique name for your credential.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex gap-1 items-center">
                                        Value
                                        <p className="text-xs text-blue-500">(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the value of your credential <br />
                                        This will be securely stored by encrypting.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700"
                            disabled={isPending}
                        >
                            {!isPending && "Proceed"}
                            {isPending && <Loader2 className="animate-spin" />}
                        </Button>
                    </form>
                </Form>
            </div>
        );
    };

    return (
        <FormProvider {...form}>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogTrigger asChild>
                    <Button className='bg-blue-500 hover:bg-blue-700 right-0'>
                        {triggerText ?? "Create"}
                    </Button>
                </DialogTrigger>

                <div className="px-0">
                    <CustomDialogHeader
                        icon={ShieldEllipsisIcon}
                        title="Create credential"
                        formComponent={formComponent}
                    />
                </div>
            </Dialog>
        </FormProvider>
    );
};

export default CreateCredentialDialogue