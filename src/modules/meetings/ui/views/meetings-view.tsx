"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { DataPagination } from "@/components/data-pagination";

import { columns } from "../components/columns";

import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";

export const MeetingsView = () => {
    const trpc = useTRPC();

    const router = useRouter();

    const [filters, setFilters] = useAgentsFilters();

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable
                data={data.items}
                columns={columns}
                onRowClick={(row) => router.push(`/meetings/${row.id}`)}
            />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first Meeting"
                    description="Schedule a meeting to connect with other. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
                />
            )}
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="This may take a few second"
        />
    );
};

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description="Something went wrong"
        />
    );
};
