import SearchBar from "@/components/SearchBar";
import PostList from "@/components/post-list";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <main className="max-7xl p-5">
      <PostList />
    </main>
  );
}
