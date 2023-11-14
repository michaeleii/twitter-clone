import { db, desc, eq } from "@/db";

import { posts } from "@/db/schema/post";
import { users } from "@/db/schema/user";
import { media } from "@/db/schema/media";
import { mightFail } from "might-fail";

export const getAllPosts = async () => {
  const query = db
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
        width: media.width,
        height: media.height,
      },
    })
    .from(posts)
    .innerJoin(users, eq(users.id, posts.userId))
    .leftJoin(media, eq(media.id, posts.mediaId))
    .orderBy(desc(posts.createdAt))
    .limit(100)
    .prepare("select_posts_for_feed");

  const { result: posts, error: postsError } = await mightFail(query.execute());

  return { posts, postsError };
};

export type Result = NonNullable<
  Awaited<ReturnType<typeof getAllPosts>>["posts"]
>[0];
