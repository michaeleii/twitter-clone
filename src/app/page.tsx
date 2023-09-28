import SearchBar from "@/components/SearchBar";
import PostList from "@/components/post-list";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <div>
      <SearchBar />
      <PostList query={searchParams.query} />
    </div>
  );
}
