"use client"

import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';

function ReactCounterUpWrapper({ value }: { value: number }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return "-";
    return (
        <CountUp duration={0.5} preserveValue end={value} decimals={0} />
    )
}

export default ReactCounterUpWrapper;