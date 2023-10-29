"use server";

import { createPost } from "@/db/queries/createPost";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleCreatePost(formData: FormData) {
  "use server";
  const content = formData.get("content") as string;

  if (content.length <= 3) return;

  const { id, createPostError } = await createPost({
    content,
    userId: "3",
  });

  if (createPostError) {
    return console.error(createPostError);
  }

  if (!id) {
    return console.error("No ID returned from createPost");
  }
  revalidatePath(`/`);
  redirect(`/`);
}
