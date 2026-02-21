import { createRealtimeClient } from "@stream-io/openai-realtime-api";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";

// Schema for request validation
const connectAgentSchema = z.object({
  meetingId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { meetingId } = connectAgentSchema.parse(body);

    const [meeting] = await db.select().from(meetings).where(eq(meetings.id, meetingId));

    if (!meeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    const [agent] = await db.select().from(agents).where(eq(agents.id, meeting.agentId));

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Generate specific token for the agent
    const agentToken = streamVideo.generateUserToken({
      user_id: agent.id,
      validity_in_seconds: 3600, // 1 hour
    });

    console.log(`Connecting agent ${agent.name} to meeting ${meeting.id}...`);

    const client = createRealtimeClient({
      baseUrl: "https://api.openai.com/v1", // Default OpenAI base URL
      call: {
        type: "default",
        id: meeting.id,
      },
      streamApiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_APP_KEY!,
      streamUserToken: agentToken,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-4o-realtime-preview-2024-10-01",
      debug: true, // Enable debug logs for development
    });

    // Set agent instructions
    client.updateSession({
      instructions: agent.instructions,
      voice: "alloy", // You might want to make this configurable in the future
      input_audio_transcription: {
        model: "whisper-1",
      },
    });

    // Connect to the call
    // Note: In a serverless environment (like Vercel functions), this background process
    // might be terminated when the response is sent. For proper production deployment,
    // this should be run in a separate long-running service.
    await client.connect();

    console.log("Agent connected successfully!");

    return NextResponse.json({ success: true, agentId: agent.id });
  } catch (error) {
    console.error("Error connecting agent:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
