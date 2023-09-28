import {
  serial,
  text,
  integer,
  pgTable,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const mediaTable = pgTable("media", {
  id: serial("id").primaryKey(),
  type: mediaType("type").notNull(),
  url: text("url").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Media = typeof mediaTable.$inferSelect;
