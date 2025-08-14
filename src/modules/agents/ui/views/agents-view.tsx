"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";

import { useAgentFilters } from "../../hooks/use-agents-filters";

import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { DataPagination } from "../components/data-pagination";


export const AgentsView = () => {
    const [filters, setFilters] = useAgentFilters();

    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex flex-col flex-1 gap-y-4 pb-4 px-4 md:px-8 ">
            <DataTable
                data={data.items}
                columns={columns}
            />

            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />

            {data.items.length === 0 && (
                <EmptyState 
                    title="Create your first agent"
                    description="Create an agent to join your meeting. Each agent will follow your instructions and can interact with participants during the call."
                />
            )}
        </div>
    );
};


export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
            description="This may take a few second"
        />
    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Something went wrong"
        />
    )
}