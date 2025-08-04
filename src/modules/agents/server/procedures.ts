import { createTRPCRouter, baseProcedure } from "@/trpc/init";

import { db } from "@/db";
import { agents } from "@/db/schema";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents)

        return data;
    }),
});
