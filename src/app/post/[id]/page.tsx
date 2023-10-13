import PostItem from "@/components/post";

import { getPostById } from "@/db/queries/singlePost";
import { notFound } from "next/navigation";

export default async function SinglePost({
  params,
}: {
  params: { id: string };
}) {
  const { post, postError } = await getPostById(+params.id);

  if (postError) {
    console.error(postError);
    return <div>Error connecting to database</div>;
  }

  if (!post) {
    notFound();
  }
  return (
    <div className="max-w-5xl mx-auto p-5">
      <PostItem post={post} />
    </div>
  );
}
