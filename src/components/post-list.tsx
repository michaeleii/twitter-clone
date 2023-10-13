import PostItem from "./post";
import { query } from "@/db/queries/postList";

export default async function PostList() {
  const posts = await query.execute();

  return (
    <main className="p-5 grid xl:grid-cols-2 gap-5 max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </main>
  );
}
