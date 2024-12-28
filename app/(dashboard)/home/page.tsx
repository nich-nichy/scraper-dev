import { GetPeriods } from '@/actions/analytics/getPeriods';
import React, { Suspense } from 'react'
import PeriodSelector from './_components/PeriodSelector';
import { Period } from '@/types/analytics';
import { Skeleton } from '@/components/ui/skeleton';
import { GetStatsCardsValues } from '@/actions/analytics/getStatsCardsValues';
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react';
import StatsCard from './_components/StatsCard';
import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
import ExecutionStusStat from './_components/ExecutionStatusStat';
import { getCreditUsageInPeriod } from '@/actions/analytics/getCreditUsageInPeriod';
import CreditUsageChart from '../billing/_components/CreditUsageChart';

const HomePage = ({ searchParams }: { searchParams: { month?: string; year?: string } }) => {
    const currentDate = new Date()
    const { month, year } = searchParams
    const period: Period = {
        month: month ? parseInt(month) : currentDate.getMonth(),
        year: year ? parseInt(year) : currentDate.getFullYear(),
    }
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between'>
                <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
                    Analytics
                </h1>
                <Suspense fallback={<StatsCardSkeleton />}>
                    <PeriodSelectorWrapper selectedPeriod={period} />
                </Suspense>
            </div>
            <StatsCards selectedPeriod={period} />
            <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                <StatsExecutionStatus selectedPeriod={period} />
            </Suspense>
            <Suspense fallback={<Skeleton className='w-full h-[300px]' />}>
                <CreditsUsageInPeriod selectedPeriod={period} />
            </Suspense>
        </div>
    )
}

async function PeriodSelectorWrapper({ selectedPeriod }: { selectedPeriod: Period }) {
    const periods = await GetPeriods();
    return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await GetStatsCardsValues(selectedPeriod);
    return <div className='grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px] mt-5'>
        <StatsCard title="Workflow execution" value={data.workflowExecutions} icon={CirclePlayIcon} />
        <StatsCard title="Phase execution" value={data.phaseExecutions} icon={WaypointsIcon} />
        <StatsCard title="Credits consumed" value={data.creditsConsumed} icon={CoinsIcon} />
    </div>
}

function StatsCardSkeleton() {
    return <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
        {[1, 2, 3].map((i) => {
            return <Skeleton key={i} className='w-full min-h-[120px]' />
        })}
    </div>
}

async function StatsExecutionStatus({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await GetWorkflowExecutionStats(selectedPeriod);
    return <ExecutionStusStat data={data} />
}

async function CreditsUsageInPeriod({ selectedPeriod }: { selectedPeriod: Period }) {
    const data = await getCreditUsageInPeriod(selectedPeriod);
    return <CreditUsageChart data={data} title="Daily credits spent" description="Credits spent in the last past" />
}


export default HomePage