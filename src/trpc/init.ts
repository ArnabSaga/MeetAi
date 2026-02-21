import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/lib/auth";

import { initTRPC, TRPCError } from "@trpc/server";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

export const createTRPCRouter = t.router;

export const createCallerFactory = t.createCallerFactory;

export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const headersObj = await headers();
  const session = await auth.api.getSession({
    headers: headersObj,
  });

  if (!session) {
    console.log("TRPC Protected Procedure - Unauthorized");
    console.log("Headers Cookie:", headersObj.get("cookie"));
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized to access agents" });
  }

  return next({ ctx: { ...ctx, auth: session } });
});
