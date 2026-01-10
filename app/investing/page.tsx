import { getAllInvestingPosts } from "../_api/getAllInvestingPosts";
import PostListItem from "../_components/PostListItem";

export default async function InvestingMainPage() {
  const posts = await getAllInvestingPosts();

  return (
    <section className="flex flex-col items-start justify-start gap-8 pt-4">
      {posts
        .filter((post) => !post.frontmatter.draft)
        .map((post) => (
          <PostListItem key={post.frontmatter.path} {...post} />
        ))}
    </section>
  );
}
