import {
  serial,
  text,
  integer,
  pgEnum,
  timestamp,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const pgTable = pgTableCreator((name) => `twitter_clone_${name}`);

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  type: mediaType("type").notNull(),
  url: text("url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  postId: integer("post_id").references(() => posts.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Media = typeof media.$inferSelect;
