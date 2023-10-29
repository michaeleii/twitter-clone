import { createPost } from "@/db/queries/createPost";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "./submit-button";

async function handleCreatePost(formData: FormData) {
  "use server";
  const content = formData.get("content") as string;

  if (content.length <= 3) return;

  const { id, createPostError } = await createPost({
    content,
    userId: "3",
  });

  if (createPostError) {
    return console.error(createPostError);
  }

  if (!id) {
    return console.error("No ID returned from createPost");
  }
  revalidatePath(`/`);
  redirect(`/`);
}

export default function CreatePostForm() {
  return (
    <form
      action={handleCreatePost}
      className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4"
    >
      <label className="w-full">
        <textarea
          className="bg-transparent flex-1 border-none outline-none w-full"
          name="content"
          placeholder="Post a thing..."
          rows={5}
          required
        />
      </label>
      <SubmitButton />
    </form>
  );
}
