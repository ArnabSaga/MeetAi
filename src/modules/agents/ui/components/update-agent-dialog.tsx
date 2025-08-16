import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AgentFrom } from "./agent-from";

import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
    initialValue: AgentGetOne;
};

export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialValue
}: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Edit Agent"
            description="Edit the agent details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentFrom
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValue}
            />
        </ResponsiveDialog>
    );
};