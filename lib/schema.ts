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

export const deleteMemberSchema = z.object({
  memberId: z
    .number({
      required_error: "L'identifiant du membre est requis",
    })
    .int({
      message: "L'identifiant du membre n'est pas valide",
    }),
});

export const newMemberScheduleSchema = z.object({
  memberId: z.number({ coerce: true }),
  date: z.string(),
  from: z.string(),
  to: z.string(),
});
