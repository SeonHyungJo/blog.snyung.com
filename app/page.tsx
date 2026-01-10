import dayjs from "dayjs";

import { getAllInvestingPosts } from "./_api/getAllInvestingPosts";
import { getAllPosts } from "./_api/getAllPosts";
import PostListItem from "./_components/PostListItem";

export default async function Home() {
  const [posts, investingPosts] = await Promise.all([
    getAllPosts(),
    getAllInvestingPosts(),
  ]);

  const allPosts = [...posts, ...investingPosts].sort(
    (a, b) =>
      dayjs(b.frontmatter.date).toDate().getTime() -
      dayjs(a.frontmatter.date).toDate().getTime()
  );

  return (
    <section className="flex flex-col items-start justify-start gap-8 pt-4">
      {allPosts
        .filter((post) => !post.frontmatter.draft)
        .map((post) => (
          <PostListItem key={post.frontmatter.path} {...post} />
        ))}
    </section>
  );
}
