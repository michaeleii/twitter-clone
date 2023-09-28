import {
  serial,
  text,
  timestamp,
  integer,
  pgTable,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { mediaTable } from "./media";
import { sql } from "drizzle-orm";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  mediaId: integer("media_id")
    .references(() => mediaTable.id)
    .default(sql`NULL`),
  replyId: integer("reply_id").references((): AnyPgColumn => postsTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = typeof postsTable.$inferSelect;
