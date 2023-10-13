import ErrorMessage from "@/components/error-message";
import MainContainer from "@/components/main-container";
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
    return <ErrorMessage message="Error connecting to database." />;
  }

  if (!post) {
    notFound();
  }
  return (
    <MainContainer>
      <PostItem post={post} />
    </MainContainer>
  );
}
