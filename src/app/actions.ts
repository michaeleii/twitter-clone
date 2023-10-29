"use server";

import { action } from "@/utils/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mightFail } from "might-fail";
import { db } from "@/db";
import { insertPostSchema, postTable } from "@/db/schema/post";

const formSchema = insertPostSchema;

export const createPost = action(formSchema, async (newPost) => {
  const { error } = await mightFail(db.insert(postTable).values(newPost));

  if (error) {
    return console.error(error);
  }
  revalidatePath(`/`);
  redirect(`/`);
});
