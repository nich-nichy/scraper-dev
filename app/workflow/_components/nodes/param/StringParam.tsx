"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { paramProps } from '@/types/appNode'
import { TaskParam } from '@/types/task'
import React, { useEffect, useId, useState } from 'react'

function StringParam({ param, value, updateNodeParamValue, disabled }: paramProps) {
    const [internalValue, setInternalValue] = useState(value)
    const id = useId()

    useEffect(() => {
        setInternalValue(value)
    }, [value])

    let Component: any = Input;

    if (param.variant === "textarea") {
        Component = Textarea;
    }

    console.log(internalValue, "internalValue", value)
    // FIXME: Bug on node connect to render component node
    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className='text-xs flex'>{param.name}
                {param.required && (<span className='text-xs text-red-400 px-2'>*</span>)}
            </Label>

            <Component id={id} className='w-full text-xs' value={internalValue ? internalValue : ''}
                disabled={disabled}
                placeholder='Enter the value here'
                onChange={(e: any) => setInternalValue(e.target.value)}
                onBlur={(e: any) => updateNodeParamValue(e.target.value)}

            />
            {param.helperText && (<p className='text-xs text-muted-foreground px-2'>{param.helperText}</p>)}
        </div>
    )
}

export default StringParam