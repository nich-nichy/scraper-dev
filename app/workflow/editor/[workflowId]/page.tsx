import prisma from '@/lib/prisma'
import React from 'react'
import Editor from '../../_components/Editor'
import { auth } from '@clerk/nextjs/server';

export default async function page({ params }: { params: { workflowId: string } }) {
    const { workflowId } = await params;
    console.log(workflowId);
    const { userId } = await auth();

    if (!userId) {

        throw new Error("User not authenticated");
    }
    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    });

    if (!workflow) {
        return <div>Workflow not found</div>;
    }

    return (
        <div>
            <Editor workflow={workflow} />
        </div>
    );
}
