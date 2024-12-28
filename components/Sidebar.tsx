"use client"

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon, SquareChartGantt, X } from 'lucide-react'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import UserAvailableCreditsBadge from './UserAvailableCreditsBadge'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Menu } from '@radix-ui/react-menubar'
import { DialogContent } from './ui/dialog'

const routes = [
    {
        href: "/home",
        label: "Dashboard",
        icon: SquareChartGantt
    },
    {
        href: "/workflows",
        label: "Workflows",
        icon: Layers2Icon
    },
    {
        href: "/credentials",
        label: "Credentials",
        icon: ShieldCheckIcon
    },
    {
        href: "/billing",
        label: "Billing",
        icon: CoinsIcon
    }
]

const DesktopSidebar = () => {
    const pathname = usePathname();
    const activeRoute = routes.find(route => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

    return (
        <div className='hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg:primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-seperate'>
            <div className="flex items-center justify-center gap-2 border-b-[1px] border-seperate p-4">
                <Logo />
            </div>
            <div className="flex flex-col p-2">
                {routes?.map(route => (
                    <Link key={route.href} href={`${route.href}`} className="p-3 gap-5 rounded-md flex items-center text-sm font-medium transition-colors hover:bg-blue-400 hover:text-white">
                        <route.icon size={20} />
                        {route.label}
                    </Link>
                ))}
            </div>
            <div className="absolute bottom-0 w-full p-10">
                <h2 className="text-center text-ellipsis text-pretty">Credits</h2>
                <p><UserAvailableCreditsBadge /></p>
            </div>
        </div>
    )
}

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const activeRoute = routes.find(route => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

    return (
        <>
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="p-2 bg-blue-500 text-white rounded-full">
                            <Menu />
                        </Button>
                    </DialogTrigger>

                    {/* Drawer Content */}
                    <DialogContent className="fixed inset-0 bg-black/50 z-50 flex items-start justify-start">
                        <div className="bg-white dark:bg-secondary/30 dark:text-foreground text-muted-foreground w-64 h-full flex flex-col">
                            {/* Header with Logo and Close Button */}
                            <div className="flex items-center justify-between border-b-[1px] border-seperate p-4">
                                <Logo />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col p-4">
                                {routes?.map(route => (
                                    <Link
                                        key={route.href}
                                        href={`${route.href}`}
                                        className={`p-3 flex items-center gap-4 text-sm font-medium rounded-md transition-colors ${pathname.includes(route.href)
                                            ? "bg-blue-400 text-white"
                                            : "hover:bg-blue-400 hover:text-white"
                                            }`}
                                    >
                                        <route.icon size={20} />
                                        {route.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Footer Section */}
                            <div className="mt-auto p-4">
                                <h2 className="text-center text-sm font-semibold">Credits</h2>
                                <UserAvailableCreditsBadge />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default DesktopSidebar;
