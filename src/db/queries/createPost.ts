import { mightFail } from "might-fail";
import { db } from "@/db";
import { CreatePost, postTable } from "@/db/schema/post";

export const createPost = async (newPost: CreatePost) => {
  const { result: post, error: createPostError } = await mightFail(
    db.insert(postTable).values(newPost).returning({ id: postTable.id })
  );

  const id = post?.[0]?.id;

  return { id, createPostError };
};
