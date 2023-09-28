import PostItem from "@/components/post";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/schema/post";
import { usersTable } from "@/db/schema/user";
import { mediaTable } from "@/db/schema/media";

export default async function SinglePost({
  params,
}: {
  params: { id: string };
}) {
  const [post] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, +params.id))
    .innerJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .innerJoin(mediaTable, eq(postsTable.mediaId, mediaTable.id));
  if (!post) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-5">
      <PostItem post={post.posts} media={post.media} user={post.users} />
    </div>
  );
}
