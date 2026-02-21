"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ErrorState } from "@/components/error-state";
import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { CallProvider } from "../components/call-provider";

interface Props {
  meetingId: string;
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }) as any
  ) as { data: inferRouterOutputs<AppRouter>["meetings"]["getOne"] };

  const [isAgentConnecting, setIsAgentConnecting] = useState(false);
  const [isAgentConnected, setIsAgentConnected] = useState(false);

  const handleConnectAgent = async () => {
    setIsAgentConnecting(true);
    try {
      const response = await fetch("/api/agents/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meetingId }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect agent");
      }

      setIsAgentConnected(true);
      toast.success("Agent connected!");
    } catch (error) {
      toast.error("Failed to connect agent");
      console.error(error);
    } finally {
      setIsAgentConnecting(false);
    }
  };

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState title="Meeting has ended" description="You can no longer join this meeting" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-dark-1 relative">
      {/* Simple overlay button for demo purposes. Ideally this should be in the Call controls or a separate panel. */}
      {!isAgentConnected && (
        <div className="absolute top-4 left-4 z-50">
          <Button onClick={handleConnectAgent} disabled={isAgentConnecting} variant="secondary">
            {isAgentConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting Agent...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Connect Agent
              </>
            )}
          </Button>
        </div>
      )}
      <CallProvider meetingId={meetingId} meetingName={data.name} />
    </div>
  );
};
