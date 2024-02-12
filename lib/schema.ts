import { z } from "zod";

export const newDriverSchema = z.object({
  name: z
    .string({
      required_error: "Le nom est requis",
    })
    .min(1, "Le nom est requis")
    .max(10, "Le nom est trop long"),
  poolId: z
    .string({
      required_error: "L'identifiant du pool est requis",
    })
    .cuid2({
      message: "L'identifiant du pool n'est pas valide",
    }),
});
