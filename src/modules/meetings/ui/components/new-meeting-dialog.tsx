import { ResponsiveDialog } from "@/components/responsive-dialog";

import { useRouter } from "next/navigation";

import { MeetingFrom } from "./meeting-from";

interface NewMeetingDialogProps {
    open: boolean,
    onOpenChange: (open: boolean) => void;
};

export const NewMeetingDialog = ({
    open,
    onOpenChange
}: NewMeetingDialogProps) => {
    const router = useRouter();

    return (
        <ResponsiveDialog
            title="New Meeting"
            description="Create a new metting"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingFrom 
                onSuccess={(id) => {
                    onOpenChange(false);
                    router.push(`/meetings/${id}`);
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};