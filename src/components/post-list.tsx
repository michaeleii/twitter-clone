import { notFound } from "next/navigation";
import PostItem from "./post";
import { getAllPosts } from "@/db/queries/postList";
import ErrorMessage from "./error-message";

export default async function PostList() {
  const { posts, postsError } = await getAllPosts();

  if (postsError) {
    console.error(postsError);
    return <ErrorMessage message="Error connecting to database." />;
  }

  if (!posts) {
    notFound();
  }

  return (
    <main className="p-5 grid xl:grid-cols-2 gap-5 max-w-7xl mx-auto">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </main>
  );
}
