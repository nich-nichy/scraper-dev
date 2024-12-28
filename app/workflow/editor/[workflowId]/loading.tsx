import { Loader2Icon } from 'lucide-react'
import React from 'react'

export default function loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2Icon className="h-10 w-10 animate-spin stroke-blue-500" />
        </div>
    )
}
