import { ResponsiveDialog } from "@/components/responsive-dialog";

import { AgentFrom } from "./agent-from";

interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({
    open,
    onOpenChange
}: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentFrom
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};