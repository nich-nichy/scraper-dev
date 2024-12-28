import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhases";
import TopBar from "@/app/workflow/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ExecutionViewer from "./_components/ExecutionViewer";
import { GetServerSideProps } from "next";

const ExecutionViewerPage = async (
    props: {
        params: Promise<{
            executionId: string;
            workflowId: string;
        }>
    }
) => {
    const params = await props.params;
    console.log({ exec: params.executionId, work: params.workflowId }, "@props");
    return (
        <div className="flex flex-col gap-2 h-screen w-full overflow-hidden">
            <TopBar workflowId={params.workflowId}
                title="Workflow run details"
                subtitle={`Execution ID: ${params?.executionId}`}
                hideButtons
            />
            <section className="flex h-full overflow-auto">
                <Suspense fallback={<div className="flex w-full items-center justify-center"><Loader2Icon className="h-10 w-10 animate-spin stroke-blue-500" /></div>}>
                    <ExecutionViewerWrapper executionId={params?.executionId} />
                </Suspense>
            </section>
        </div>
    );
};

export default ExecutionViewerPage;

async function ExecutionViewerWrapper({ executionId }: { executionId: string }) {
    // FIXME: Get user id
    const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
    if (!workflowExecution) {
        return <div>Not found</div>
    }
    return <ExecutionViewer initialData={workflowExecution} />
}

