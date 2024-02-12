"use server";
import "server-only";

import { db } from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { memberSchedule, pool, poolMember } from "@/db/schema";
import { asc, eq, gte } from "drizzle-orm";
import { cache } from "react";
import { deleteMemberSchema, newDriverSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

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

export async function deleteMember(memberId: number) {
  const parsedResult = deleteMemberSchema.safeParse({ memberId });
  if (!parsedResult.success) {
    throw new Error(parsedResult.error.errors[0].message);
  }

  const member = await db.query.poolMember.findFirst({
    where: eq(poolMember.id, memberId),
  });

  if (!member) {
    throw new Error("Member not found");
  }

  await db.delete(poolMember).where(eq(poolMember.id, memberId));

  revalidatePath(`/${member.poolId}`);
  revalidatePath(`/${member.poolId}/${member.id}`);
  redirect(`/${member.poolId}`);
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
