import { db, eq } from "@/db";

import { posts } from "@/db/schema/posts";
import { users } from "@/db/schema/users";
import { media } from "@/db/schema/media";
import { mightFail } from "might-fail";

export const getPostById = async (id: number) => {
  const { result: post, error: postError } = await mightFail(
    db
      .select({
        id: posts.id,
        content: posts.content,
        createdAt: posts.createdAt,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
        media: {
          id: media.id,
          type: media.type,
          url: media.url,
        },
      })
      .from(posts)
      .where(eq(posts.id, id))
      .innerJoin(users, eq(users.id, posts.userId))
      .leftJoin(media, eq(media.postId, posts.id))
      .then((result) => result[0])
  );

  return { post, postError };
};
