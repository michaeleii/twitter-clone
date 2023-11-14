import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { pgTable } from "./db/schema/users";

export const authConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db, pgTable),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
