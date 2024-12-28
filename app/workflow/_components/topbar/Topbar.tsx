"use client"
import TooltipWrapper from '@/components/TooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './SaveButton'
import ExecuteButton from './ExecuteButton'
import NavigationTabs from './NavigationTabs'
import PublishButton from './PublishButton'
import UnpublishButton from './UnpublishButton'

interface Props {
    title: string
    subtitle?: string
    workflowId: string
    hideButtons?: boolean
    isPublished?: boolean
}

const TopBar = ({ title, subtitle, workflowId, hideButtons = false, isPublished }: Props) => {
    const router = useRouter();

    return (
        <header className='flex p-2 border-p-2 border-seperate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
            <div className="flex gap-1 flex-1">
                <TooltipWrapper content="Back">
                    <Button variant={"ghost"} size={"icon"} onClick={() => {
                        router.back()
                    }} >
                        <ChevronLeftIcon size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-ellipsis truncate'>{title}</p>
                    {subtitle && <p className='text-sm text-muted-foreground truncate text-ellipsis'>{subtitle}</p>}
                </div>
            </div>
            <NavigationTabs workflowId={workflowId} />
            <div className="flex gap-1 flex-1 justify-end">
                {hideButtons === false && (<><ExecuteButton workflowId={workflowId} />
                    {isPublished && <UnpublishButton workflowId={workflowId} />}
                    {!isPublished && (<>
                        <SaveButton workflowId={workflowId} />
                        <PublishButton workflowId={workflowId} />
                    </>)}

                </>)}
            </div>
        </header>
    )
}

export default TopBar