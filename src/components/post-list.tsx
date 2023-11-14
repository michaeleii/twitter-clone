import { notFound } from "next/navigation";
import PostItem from "./post";
import { postFeedQuery } from "@/db/queries/postList";

export default async function PostList() {
  const posts = await postFeedQuery.execute();

  if (!posts) {
    notFound();
  }

  return (
    <div className="grid gap-5 max-w-xl mx-auto">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
