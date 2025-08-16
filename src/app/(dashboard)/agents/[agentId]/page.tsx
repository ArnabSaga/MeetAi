import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { 
    AgentIdViewError, 
    AgentIdViewLoading, 
    AgentsIdView 
} from "@/modules/agents/ui/views/agents-id-view";

interface Props {
    params: Promise<{ agentId: string }>
};

const Page = async ({ params }: Props) => {
    const { agentId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    )

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary fallback={<AgentIdViewError />}>
                    <AgentsIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;
