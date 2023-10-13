import { db, eq } from "@/db";

import { postTable } from "@/db/schema/post";
import { userTable } from "@/db/schema/user";
import { mediaTable } from "@/db/schema/media";
import { mightFail } from "might-fail";

export const getPostById = async (id: number) => {
  const { result: post, error: postError } = await mightFail(
    db
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
      .where(eq(postTable.id, id))
      .innerJoin(userTable, eq(userTable.id, postTable.userId))
      .leftJoin(mediaTable, eq(mediaTable.id, postTable.mediaId))
      .then((result) => result[0])
  );

  return { post, postError };
};
