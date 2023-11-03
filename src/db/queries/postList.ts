import { db, desc, eq } from "@/db";

import { postTable } from "@/db/schema/post";
import { userTable } from "@/db/schema/user";
import { mediaTable } from "@/db/schema/media";
import { mightFail } from "might-fail";

export const getAllPosts = async () => {
  const query = db
    .select({
      id: postTable.id,
      content: postTable.content,
      createdAt: postTable.createdAt,
      user: {
        id: userTable.id,
        username: userTable.username,
        avatar: userTable.avatar,
      },
      media: {
        id: mediaTable.id,
        type: mediaTable.type,
        url: mediaTable.url,
        width: mediaTable.width,
        height: mediaTable.height,
      },
    })
    .from(postTable)
    .innerJoin(userTable, eq(userTable.id, postTable.userId))
    .leftJoin(mediaTable, eq(mediaTable.id, postTable.mediaId))
    .orderBy(desc(postTable.createdAt))
    .limit(100)
    .prepare("select_posts_for_feed");

  const { result: posts, error: postsError } = await mightFail(query.execute());

  return { posts, postsError };
};

export type Result = NonNullable<
  Awaited<ReturnType<typeof getAllPosts>>["posts"]
>[0];