import { z } from "zod";

export const newDriverSchema = z.object({
  name: z.string().min(1).max(255),
  poolId: z.string().cuid2(),
});
