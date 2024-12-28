import BreadCrumsHeader from '@/components/BreadCrumsHeader'
import DesktopSidebar from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Separator } from '@radix-ui/react-context-menu'
import React from 'react'

type Props = {}

const layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen'>
            <DesktopSidebar />
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
                    <BreadCrumsHeader />
                    <div className="flex gap-3 items-center">
                        <ModeToggle />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                <Separator />
                <div className="overflow-auto">
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout