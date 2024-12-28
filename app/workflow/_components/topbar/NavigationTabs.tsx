"use client"
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    FileCode2,
    Play,
    ChevronRight,
    ChevronLeft,
    ListChecks
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from 'next/link'

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const SidebarItem = ({
        icon: Icon,
        label,
        link
    }: {
        icon: React.ElementType,
        label: string,
        link: string
    }) => (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Link href={link}
                        className={cn(
                            "p-2 hover:bg-gray-100 dark:hover:bg-gray-700",
                            "flex items-center justify-center",
                            "transition-all duration-300 ease-in-out",
                            "rounded-md group"
                        )}
                    >
                        <Icon
                            className={cn(
                                "h-6 w-6 text-gray-600 dark:text-gray-300",
                                "group-hover:text-black dark:group-hover:text-white"
                            )}
                        />
                        {isExpanded && (
                            <span
                                className={cn(
                                    "ml-2 text-sm text-gray-700 dark:text-gray-200",
                                    "whitespace-nowrap"
                                )}
                            >
                                {label}
                            </span>
                        )}
                    </Link>
                </TooltipTrigger>
                {!isExpanded && (
                    <TooltipContent side="right">
                        <p>{label}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    )

    return (
        <div
            className={cn(
                "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
                "bg-white dark:bg-gray-800",
                "border dark:border-gray-700",
                "rounded-lg shadow-lg",
                "flex items-center",
                "transition-all duration-300 ease-in-out",
                isExpanded ? "w-64 px-4 py-2" : "w-auto px-2 py-2"
            )}
        >
            <div className="flex items-center space-x-2 w-full">
                <SidebarItem
                    icon={FileCode2}
                    label="Editor"
                    link={`/workflow/editor/${workflowId}`}
                />
                <SidebarItem
                    icon={ListChecks}
                    label="Runs"
                    link={`/workflow/runs/${workflowId}`}
                />

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "ml-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700",
                        "rounded-full",
                        "transition-all duration-300 ease-in-out"
                    )}
                >
                    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>
        </div>
    )
}

export default NavigationTabs