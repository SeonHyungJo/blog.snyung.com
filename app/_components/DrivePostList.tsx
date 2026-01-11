"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DriveFileWithMeta } from "../../lib/google-drive";
import DrivePostItem from "./DrivePostItem";
import Pagination from "./Pagination";

const POSTS_PER_PAGE = 20;

type DrivePostListProps = {
  files: DriveFileWithMeta[];
};

function PostListContent({ files }: DrivePostListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tag");
  const currentPage = Number(searchParams.get("page")) || 1;

  const filteredFiles = selectedTag
    ? files.filter((file) => file.frontmatter.tags?.includes(selectedTag))
    : files;

  const totalPages = Math.ceil(filteredFiles.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedFiles = filteredFiles.slice(
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
      {paginatedFiles.length > 0 ? (
        paginatedFiles.map((file) => (
          <DrivePostItem key={file.fileId} {...file} />
        ))
      ) : (
        <section className="w-full flex flex-col items-center justify-center pt-10">
          <p className="text-gray-400 py-10 px-10">
            해당 태그의 글이 없습니다.
          </p>
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function PostListFallback({ files }: DrivePostListProps) {
  const displayFiles = files.slice(0, POSTS_PER_PAGE);

  return (
    <>
      {displayFiles.map((file) => (
        <DrivePostItem key={file.fileId} {...file} />
      ))}
    </>
  );
}

export default function DrivePostList({ files }: DrivePostListProps) {
  return (
    <section className="flex flex-col items-start justify-start gap-8 flex-1 min-w-0">
      <Suspense fallback={<PostListFallback files={files} />}>
        <PostListContent files={files} />
      </Suspense>
    </section>
  );
}
