"use client"

import { GetCredentialsForUser } from '@/actions/credentials/getCredentialsForUser'
import { Label } from '@/components/ui/label'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { paramProps } from '@/types/appNode'
import { SelectContent } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import React, { useId } from 'react'

const CredentialsParam = ({ param, updateNodeParamValue, value }: paramProps) => {
    const id = useId()
    const query = useQuery({
        queryKey: ['credentials-for-user'],
        queryFn: () => GetCredentialsForUser(),
        refetchInterval: 10000
    })
    return (
        <div className="flex flex-col gap-1 w-full">
            <Label htmlFor={id} className="text-xs flex items-center">
                {param.name}
                {param.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select onValueChange={value => updateNodeParamValue(value)} defaultValue={value}>
                <SelectTrigger
                    className="bg-white border border-gray-300 shadow-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent
                    className="bg-white border border-gray-300 shadow-md rounded-md w-[28rem]"
                >
                    <SelectGroup>
                        <SelectLabel className="text-gray-500 text-sm">Credentials</SelectLabel>
                        {query.data?.map((credential) => (
                            <SelectItem key={credential.id} value={credential.id}>
                                {credential.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default CredentialsParam