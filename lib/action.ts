"use server";
import "server-only";

import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { memberSchedule, pool, poolMember } from "@/db/schema";
import { asc, eq, gte } from "drizzle-orm";
import { cache } from "react";
import { newDriverSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";

export async function handleNewDriver(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: newDriverSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, poolId } = submission.value;

  await db.insert(poolMember).values({
    name: name,
    poolId: poolId,
  });
  revalidatePath(`/${poolId}`);
  return submission.reply({
    resetForm: true,
  });
}

export const fetchPool = cache(async (poolId: string) => {
  return db.query.pool.findFirst({
    where: eq(pool.id, poolId),
    with: {
      members: true,
      schedules: {
        orderBy: [asc(memberSchedule.from)],
        where: gte(memberSchedule.from, new Date()),
        with: {
          member: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });
});

export const fetchPoolMember = cache(async (poolMemberId: number) => {
  return db.query.poolMember.findFirst({
    where: eq(poolMember.id, poolMemberId),
    with: {
      schedules: {
        orderBy: [asc(memberSchedule.from)],
        where: gte(memberSchedule.from, new Date()),
      },
    },
  });
});
