import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useAgentFilters } from "../../hooks/use-agents-filters";

export const AgentSearchFilter = () => {
    const [filter, setFilter] = useAgentFilters();

    return (
        <div className="relative">
            <Input
                placeholder="Filter by name"
                value={filter.search}
                onChange={(e) => setFilter({ search: e.target.value })}
                className="h-9 bg-white w-[200px] pl-7"
            />

            <SearchIcon className=" size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
    );
};
