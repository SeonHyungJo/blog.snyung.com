"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Frontmatter, Post } from "../_type/post";
import Pagination from "./Pagination";
import PostListItem from "./PostListItem";

const POSTS_PER_PAGE = 20;

type PostListWithFilterProps = {
  posts: Post<Frontmatter>[];
};

function PostListContent({ posts }: PostListWithFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tag");
  const currentPage = Number(searchParams.get("page")) || 1;

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.frontmatter.tags?.includes(selectedTag))
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => (
          <PostListItem key={post.frontmatter.path} {...post} />
        ))
      ) : (
        <p className="text-gray-400 py-10">해당 태그의 글이 없습니다.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function PostListFallback({ posts }: PostListWithFilterProps) {
  const displayPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <>
      {displayPosts.map((post) => (
        <PostListItem key={post.frontmatter.path} {...post} />
      ))}
    </>
  );
}

export default function PostListWithFilter({
  posts,
}: PostListWithFilterProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-8 flex-1 min-w-0">
      <Suspense fallback={<PostListFallback posts={posts} />}>
        <PostListContent posts={posts} />
      </Suspense>
    </section>
  );
}
