import { db } from "@/db";
import { postTable } from "@/db/schema/post";
import { userTable } from "@/db/schema/user";
import { mediaTable } from "@/db/schema/media";
import { eq, like } from "drizzle-orm";
import PostItem from "./post";

export default async function PostList({ query }: { query?: string }) {
  const results = query
    ? await db
        .select()
        .from(postTable)
        .where(like(postTable.content, `%${query}%`))
        .innerJoin(userTable, eq(postTable.userId, userTable.id))
        .innerJoin(mediaTable, eq(postTable.mediaId, mediaTable.id))
    : await db
        .select()
        .from(postTable)
        .innerJoin(userTable, eq(postTable.userId, userTable.id))
        .innerJoin(mediaTable, eq(postTable.mediaId, mediaTable.id));

  const posts = results.map((result) => {
    return {
      ...result.post,
      user: result.user,
      media: result.media,
    };
  });

  return (
    <div className="p-5 grid xl:grid-cols-2 gap-5 max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
