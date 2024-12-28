"use client"
import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Layers2Icon } from 'lucide-react'
import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>
const chartConfig = {
    success: {
        label: "Success",
        color: "hsl(92, 91%, 50%)",

    },
    failed: {
        label: "Failed",
        color: "hsl(343, 91%, 50%)",
    }
}

const ExecutionStusStat = ({ data }: { data: ChartData }) => {
    return (
        <Card className='my-3'>
            <CardHeader className=''>
                <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                    <Layers2Icon className='w-6 h-6 text-blue-600' />
                    Workflow execution status
                </CardTitle>
                <CardDescription>
                    Progress of successfull and unsuccessfull executions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                    <AreaChart data={data} height={100} accessibilityLayer >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey={"date"}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <ChartTooltip content={<ChartTooltipContent className='w-[250px]' />} />
                        <Area min={0} dataKey={"success"} fill="var(--color-success)" stroke="var(--color-success)" stackId={"a"} />
                        <Area min={0} dataKey={"failed"} fill="var(--color-failed)" stroke="var(--color-failed)" stackId={"a"} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card >
    )
}

export default ExecutionStusStat