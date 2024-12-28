"use client"
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
}

const TooltipWrapper = (props: Props) => {
    if (!props.content) return props.children
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{props.children}</TooltipTrigger>
                <TooltipContent side={props.side}>{props.content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipWrapper