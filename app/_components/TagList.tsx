import { getAllInvestingPosts } from "../_api/getAllInvestingPosts";
import { getAllPosts } from "../_api/getAllPosts";
import TagListClient from "./TagListClient";

export default async function TagList() {
  const [posts, investingPosts] = await Promise.all([
    getAllPosts(),
    getAllInvestingPosts(),
  ]);

  const allPosts = [...posts, ...investingPosts].filter(
    (post) => !post.frontmatter.draft
  );

  // 모든 태그 수집 및 카운트
  const tagCount = new Map<string, number>();
  allPosts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  // 카운트 순으로 정렬
  const sortedTags = Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return <TagListClient tags={sortedTags} />;
}
