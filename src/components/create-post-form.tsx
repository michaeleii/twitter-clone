import SubmitButton from "./submit-button";
import { handleCreatePost } from "@/app/actions";

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
