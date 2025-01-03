"use client"

import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import { Workflow } from '@prisma/client'
import FlowEditor from './FlowEditor'
import TopBar from './topbar/Topbar'
import TaskMenu from './TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext'
import { WorkflowStatus } from '@/types/workflow'

const Editor = ({ workflow }: { workflow: Workflow }) => {
    return (
        <FlowValidationContextProvider>
            <ReactFlowProvider>
                <div className="flex flex-col h-screen">
                    <TopBar title="Workflow editor" subtitle={workflow.name} workflowId={workflow.id} isPublished={workflow.status === WorkflowStatus.PUBLISHED} />
                    <section className="flex h-full overflow-auto">
                        <TaskMenu />
                        <FlowEditor workflow={workflow} />
                    </section>
                </div>
            </ReactFlowProvider>
        </FlowValidationContextProvider>
    );
};

export default Editor;
