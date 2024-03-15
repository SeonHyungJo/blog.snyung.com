import Link from "next/link";

import { getAllPosts } from "../_api/getAllPosts";
import PostListItem from "../_components/PostListItem";
import TopSection from "../_components/TopSection";

export default async function PostsMainPage() {
  const posts = await getAllPosts();

  return (
    <>
      <TopSection
        title={"Posts"}
        content={"🧐 개발하면서 정리한 내용을 모아놓은 공간입니다."}
        footer={
          <section className={"py-2 px-2"}>
            <Link href={"/snyung"} className={"text-slate-400"}>
              {"More about me >"}
            </Link>
          </section>
        }
      />

      <section className="flex flex-row items-end justify-start w-full gap-2 py-8">
        <h3>All Posts</h3>
        <h6>{`(${posts.length})`}</h6>
      </section>

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
