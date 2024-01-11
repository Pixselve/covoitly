"use server";
import "server-only";

import { z } from "zod";
import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { memberSchedule, pool, poolMember } from "@/db/schema";
import { asc, eq, gte } from "drizzle-orm";
import { cache } from "react";

const newDriverSchema = z.object({
  name: z.string().min(1).max(255),
  poolId: z.string().cuid2(),
});

export async function handleNewDriver(formData: FormData) {
  const { name, poolId } = newDriverSchema.parse(Object.fromEntries(formData));
  await db.insert(poolMember).values({
    name: name,
    poolId: poolId,
  });
  revalidatePath(`/${poolId}`);
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
