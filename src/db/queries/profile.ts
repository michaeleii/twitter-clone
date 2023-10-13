import { mightFail } from "might-fail";

import { userTable } from "@/db/schema/user";

import { db, eq } from "@/db";

export const getUserByUsername = async (username: string) => {
  const { result: user, error: userError } = await mightFail(
    db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .then((result) => result[0])
  );
  return { user, userError };
};
