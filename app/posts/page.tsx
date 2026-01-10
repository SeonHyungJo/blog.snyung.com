import { getAllPosts } from "../_api/getAllPosts";
import PostListWithFilter from "../_components/PostListWithFilter";
import RecentPosts from "../_components/RecentPosts";
import TagList from "../_components/TagList";

export default async function PostsMainPage() {
  const posts = await getAllPosts();
  const filteredPosts = posts.filter((post) => !post.frontmatter.draft);

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
