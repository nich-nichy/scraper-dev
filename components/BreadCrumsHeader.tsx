"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';

const BreadCrumsHeader = () => {
    const pathName = usePathname();
    const paths = pathName === "/" ? [""] : pathName.split("/");
    return (
        <div className='flex items-center flex-start'>

            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='capitalise'
                                    href={`/${path}`}>
                                    {path === "" ? "Home" : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index !== paths.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumsHeader