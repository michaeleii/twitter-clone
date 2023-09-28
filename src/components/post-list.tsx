import { db } from "@/db";
import { postsTable } from "@/db/schema/post";
import { usersTable } from "@/db/schema/user";
import { mediaTable } from "@/db/schema/media";
import { eq } from "drizzle-orm";
import PostItem from "./post";

export default async function PostList() {
  const posts = await db
    .select()
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .innerJoin(mediaTable, eq(postsTable.mediaId, mediaTable.id));

  console.log(posts);
  return (
    <div className="p-5 grid xl:grid-cols-2 gap-5">
      {posts.map((post) => (
        <PostItem
          key={post.posts.id}
          post={post.posts}
          user={post.users}
          media={post.media}
        />
      ))}
    </div>
  );
}
