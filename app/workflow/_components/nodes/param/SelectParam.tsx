"use client"

import { Label } from '@/components/ui/label'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { paramProps } from '@/types/appNode'
import { SelectContent } from '@radix-ui/react-select'
import React, { useId } from 'react'

type OptionType = {
    label: string
    value: string
}

const SelectParam = ({ param, updateNodeParamValue, value }: paramProps) => {
    const id = useId()
    console.log({ param, value })
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
                        <SelectLabel className="text-gray-500 text-sm">Options</SelectLabel>
                        {param.options.map((option: OptionType) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="hover:bg-blue-100 cursor-pointer"
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectParam