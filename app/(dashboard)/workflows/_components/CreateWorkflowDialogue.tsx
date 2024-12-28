"use client"
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { createWorkflowSchema, CreateWorkflowSchemaType } from '@/schema/workflow';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Grid2x2Plus, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';

const CreateWorkflowDialogue = ({ triggerText }: { triggerText?: string }) => {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {

            toast.success("Workflow created", { id: "create-workflow" });
        },
        onError: (error) => {
            console.error("Workflow creation failed", error);
        }

    });

    const onSubmit = useCallback((values: CreateWorkflowSchemaType) => {
        mutate(values);
    }, [mutate]);


    const formComponent = () => {
        return (
            <div className="p-6">
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
                                    Choose a name for your workflow
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex gap-1 items-center">
                                    Description
                                    <p className="text-xs text-blue-500">(optional)</p>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="resize-none"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe your workflow if needed
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700"
                        disabled={isPending}
                    >
                        {!isPending && "Proceed"}
                        {isPending && <Loader2 className="animate-spin" />}
                    </Button> */}
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700" disabled={isPending}>
                        {isPending ? <Loader2 className="animate-spin" /> : "Proceed"}
                    </Button>

                </form>
            </div>
        );
    };

    return (
        <FormProvider {...form}>
            <Dialog
                open={open}
                onOpenChange={(open) => {
                    form.reset();
                    setOpen(open);
                }}
            >
                <DialogTrigger asChild>
                    <Button className='bg-blue-500 hover:bg-blue-700 right-0'>
                        {triggerText ?? "Create flow"}
                    </Button>
                </DialogTrigger>

                <div className="px-0">
                    <CustomDialogHeader
                        icon={Grid2x2Plus}
                        title="Create workflow"
                        subTitle="Start building your scrape workflow"
                        formComponent={formComponent}
                    />
                </div>
            </Dialog>
        </FormProvider>
    );
};

export default CreateWorkflowDialogue;

