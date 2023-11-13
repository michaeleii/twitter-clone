import MainContainer from "@/components/main-container";
import { auth } from "@/auth";
import CreatePostForm from "@/components/create-post-form";
import { redirect } from "next/navigation";

export default async function CreatePost() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/create");
  }
  return (
    <MainContainer>
      <CreatePostForm user={session.user} />
    </MainContainer>
  );
}
