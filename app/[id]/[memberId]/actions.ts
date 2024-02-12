"use server";
import "server-only";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { memberSchedule, poolMember } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const newMemberScheduleSchema = z.object({
  memberId: z.number({ coerce: true }),
  date: z.string(),
  from: z.string(),
  to: z.string(),
});

export async function handleNewMemberSchedule(formData: FormData) {
  const { memberId, date, from, to } = newMemberScheduleSchema.parse(
    Object.fromEntries(formData.entries()),
  );
  const pm = await db.query.poolMember.findFirst({
    where: eq(poolMember.id, memberId),
  });

  if (!pm) {
    throw new Error("Member not found");
  }

  const fromDateAndTime = new Date(`${date} ${from}`);
  const toDateAndTime = new Date(`${date} ${to}`);

  await db.insert(memberSchedule).values({
    memberId: pm.id,
    poolId: pm.poolId,
    from: fromDateAndTime,
    to: toDateAndTime,
  });

  revalidatePath(`/${pm.poolId}`);
  revalidatePath(`/${pm.poolId}/${pm.id}`);
}
