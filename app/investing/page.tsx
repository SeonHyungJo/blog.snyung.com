import { getAllInvestingPosts } from "../_api/getAllInvestingPosts";
import PostListItem from "../_components/PostListItem";
import TopSection from "../_components/TopSection";

export default async function SnippetsMainPage() {
  const posts = await getAllInvestingPosts();

  return (
    <>
      <TopSection
        title={`Investing(${posts.length})`}
        content={"⚡️ 유용한 자산 정보를 모아놓은 공간입니다."}
      />

      <section className="flex flex-col items-start justify-start gap-2">
        {posts
          .filter((post) => !post.frontmatter.draft)
          .map((post) => (
            <PostListItem key={post.frontmatter.path} {...post} />
          ))}
      </section>
    </>
  );
}
