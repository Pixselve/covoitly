import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { pool } from "@/db/schema";

export default async function () {
  const newPool = await db.insert(pool).values({}).returning();
  return redirect("/" + newPool[0].id);
}
