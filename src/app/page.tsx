import SearchBar from "@/components/SearchBar";
import MainContainer from "@/components/main-container";
import PostList from "@/components/post-list";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <MainContainer>
      <PostList />
    </MainContainer>
  );
}
