import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
export const pool = sqliteTable("pool", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
});

export const poolRelations = relations(pool, ({ many }) => ({
  members: many(poolMember),
  schedules: many(memberSchedule),
}));

export const poolMember = sqliteTable("pool_member", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  poolId: text("pool_id")
    .notNull()
    .references(() => pool.id, { onDelete: "cascade" }),
});

export const poolMemberRelations = relations(poolMember, ({ one, many }) => ({
  pool: one(pool, {
    fields: [poolMember.poolId],
    references: [pool.id],
  }),
  schedules: many(memberSchedule),
}));

export const memberSchedule = sqliteTable("member_schedule", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  memberId: integer("member_id", { mode: "number" })
    .notNull()
    .references(() => poolMember.id, { onDelete: "cascade" }),
  poolId: text("pool_id")
    .references(() => pool.id, { onDelete: "cascade" })
    .notNull(),
  from: integer("from", { mode: "timestamp" }).notNull(),
  to: integer("to", { mode: "timestamp" }).notNull(),
});

export const memberScheduleRelations = relations(memberSchedule, ({ one }) => ({
  member: one(poolMember, {
    fields: [memberSchedule.memberId],
    references: [poolMember.id],
  }),
  pool: one(pool, {
    fields: [memberSchedule.poolId],
    references: [pool.id],
  }),
}));
