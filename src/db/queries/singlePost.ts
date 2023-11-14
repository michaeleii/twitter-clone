import { db, eq } from "@/db";

import { posts } from "@/db/schema/posts";
import { userTable } from "@/db/schema/users";
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
          id: userTable.id,
          username: userTable.username,
          avatar: userTable.avatar,
        },
        media: {
          id: media.id,
          type: media.type,
          url: media.url,
          width: media.width,
          height: media.height,
        },
      })
      .from(posts)
      .where(eq(posts.id, id))
      .innerJoin(userTable, eq(userTable.id, posts.userId))
      .leftJoin(media, eq(media.id, posts.mediaId))
      .then((result) => result[0])
  );

  return { post, postError };
};
