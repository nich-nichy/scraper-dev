import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
                <h1 className='text-6xl font-bold text-blue-400 mb-4'>404</h1>
                <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
                <p className='text-muted-foreground mb-8 max-w-md'>
                    Oops kinda screwed up.
                </p>
            </div>
            <Link href='/home' className="flex items-center justify-center px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Link>
        </div>
    )
}

export default NotFoundPage