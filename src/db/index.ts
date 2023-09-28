import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as users from "./schema/user";
import * as posts from "./schema/post";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);

const schema = { ...users, ...posts };

export const db = drizzle(sql, { schema });
