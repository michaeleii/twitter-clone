import MainContainer from "@/components/main-container";

export default function CreatePost() {
  return (
    <MainContainer>
      <form className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4">
        <label className="w-full">
          <textarea
            className="bg-transparent flex-1 border-none outline-none w-full"
            name="content"
            placeholder="Post a thing..."
            rows={5}
            required
          />
        </label>

        <button type="submit" className="border rounded-xl px-4 py-2">
          Post
        </button>
      </form>
    </MainContainer>
  );
}
