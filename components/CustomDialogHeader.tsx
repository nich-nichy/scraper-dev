"use client"
import React from 'react'
import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';


type Props = {
    title?: string;
    subTitle?: string
    icon?: LucideIcon

    iconClassName?: string
    titleClassName?: string
    subtitleClassName?: string

    formComponent?: () => JSX.Element;
}

const CustomDialogHeader = (props: Props) => {
    console.log({ props }, "from dialog header")
    const renderForm = props.formComponent || (() => <div></div>);

    return (
        <DialogContent>
            <DialogTitle asChild>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {props.icon && <props.icon size={30} className={cn("text-blue-500", props.iconClassName)} />}
                    {props.title && <h1 className={cn("text-2xl font-bold", props.titleClassName)}>{props.title}</h1>}
                    {props.subTitle && <h1 className={cn("text-sm text-muted-foreground", props.subtitleClassName)}>{props.subTitle}</h1>}
                </div>
            </DialogTitle>
            <Separator />
            {/* FIXME: Here */}
            {renderForm()}
        </DialogContent>
    )
}

export default CustomDialogHeader
