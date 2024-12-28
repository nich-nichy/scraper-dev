import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import TopBar from "../../_components/topbar/Topbar";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";
import ExecutionsTable from "./_components/ExecutionsTable";

export default function ExecutionsPage({ params }: { params: { workflowId: string } }) {
    return <div className="h-full w-full overflow-auto">
        <TopBar workflowId={params?.workflowId}
            hideButtons
            title="All runs"
            subtitle="View all runs for this workflow"
        />
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><Loader2Icon size={30} className="animate-spin stroke-primary" /></div>}>
            <ExecutionsTableWrapper workflowId={params.workflowId} />
        </Suspense>
    </div>
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
    const executions = await GetWorkflowExecutions(workflowId);
    if (!executions) return <div>No executions found</div>
    if (executions.length === 0) return <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                <InboxIcon size={40} className="stroke-primary" />
            </div>
            <div className="flex flex-col gap-1 text-center">
                <p className="font-bold"> No executions triggered</p>
                <p className="text-sm text-muted-foreground"> You can create it in the editor section</p>
            </div>
        </div>
    </div>
    return <div className="container py-6 w-full">
        <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
}