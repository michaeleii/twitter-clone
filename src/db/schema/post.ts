import {
  serial,
  text,
  timestamp,
  integer,
  AnyPgColumn,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { mediaTable } from "./media";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const pgTable = pgTableCreator((name) => `twitter_clone_${name}`);

export const postTable = pgTable("post", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  mediaId: integer("media_id")
    .references(() => mediaTable.id)
    .default(sql`NULL`),
  replyId: integer("reply_id").references((): AnyPgColumn => postTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = typeof postTable.$inferSelect;

// Schema for inserting a post - can be used to validate API requests
export const insertPostSchema = createInsertSchema(postTable);
