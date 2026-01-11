"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import cx from "classnames";

type TagItemProps = {
  tag: string;
  showActiveState?: boolean;
};

export default function TagItem({ tag, showActiveState = false }: TagItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tag");
  const isActive = showActiveState && selectedTag === tag;

  const handleTagClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const params = new URLSearchParams(searchParams.toString());

    // 태그 변경 시 페이지를 1로 리셋
    params.delete("page");

    if (selectedTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    const queryString = params.toString();

    // 리스트 페이지로 이동 (/, /posts, /invest 중 하나)
    const listPath = pathname.startsWith("/posts/")
      ? "/posts"
      : pathname.startsWith("/invest/")
        ? "/invest"
        : pathname === "/posts" || pathname === "/invest"
          ? pathname
          : "/";

    router.push(queryString ? `${listPath}?${queryString}` : listPath);
  };

  return (
    <span
      onClick={handleTagClick}
      className={cx(
        "px-1.5 text-xs border-none rounded-md outline-none whitespace-nowrap cursor-pointer transition-colors",
        isActive
          ? "text-white bg-blue-500"
          : "text-gray-500 bg-gray-100 hover:bg-gray-200"
      )}
    >
      {`#${tag}`}
    </span>
  );
}
