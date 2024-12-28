"use client"

import { GetAvailableCredits } from '@/actions/billing/getAvailableCredits'
import { useQuery } from '@tanstack/react-query'
import { CoinsIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ReactCounterUpWrapper from './ReactCounterUpWrapper'

function UserAvailableCreditsBadge() {
    const query = useQuery({
        queryKey: ['user-available-credits'],
        queryFn: () => GetAvailableCredits(),
        refetchInterval: 30 * 1000
    })
    return (
        <Link href={"/billing"} className="flex items-center gap-2 justify-center">
            <CoinsIcon size={20} className='text-blue-600' />
            <span className='font-semibold capitalize'>
                {query.isLoading && <Loader2Icon className='w-4 h-4 animate-spin' />}
                {!query.isLoading && query.data && <ReactCounterUpWrapper value={query.data} />}
                {!query.isLoading && !query.data === undefined && "-"}
            </span>
        </Link>
    )
}

export default UserAvailableCreditsBadge