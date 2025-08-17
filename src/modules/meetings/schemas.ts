import { z } from "zod";

export const meetingsInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    agentId: z.string().min(1, { message: "Agents is required" }),
});

export const meetingsUpdateSchma = meetingsInsertSchema.extend({
    id: z.string().min(1, {message: "Id is required"}),
});