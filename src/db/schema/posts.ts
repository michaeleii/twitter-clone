import {
  serial,
  text,
  timestamp,
  integer,
  AnyPgColumn,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { createInsertSchema } from "drizzle-zod";

export const pgTable = pgTableCreator((name) => `twitter_clone_${name}`);

export const posts = pgTable("post", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  replyId: integer("reply_id").references((): AnyPgColumn => posts.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Post = typeof posts.$inferSelect;

// Schema for inserting a post - can be used to validate API requests
export const insertPostSchema = createInsertSchema(posts);
