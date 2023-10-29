import { text, varchar, timestamp, pgTableCreator } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `twitter-clone_${name}`);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: varchar("username", { length: 30 }).notNull(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = typeof userTable.$inferSelect;
