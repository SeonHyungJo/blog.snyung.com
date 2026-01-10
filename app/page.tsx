import dayjs from "dayjs";

import { getAllInvestingPosts } from "./_api/getAllInvestingPosts";
import { getAllPosts } from "./_api/getAllPosts";
import PostListWithFilter from "./_components/PostListWithFilter";
import RecentPosts from "./_components/RecentPosts";
import TagList from "./_components/TagList";

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

  const filteredPosts = allPosts.filter((post) => !post.frontmatter.draft);

  return (
    <div className="flex flex-row gap-8 pt-4">
      <PostListWithFilter posts={filteredPosts} />

      <aside className="hidden lg:flex lg:flex-col lg:gap-10 w-[280px] flex-shrink-0 pl-8 border-l border-gray-100">
        <RecentPosts />
        <TagList />
      </aside>
    </div>
  );
}
