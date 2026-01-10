import Link from "next/link";

import dayjs from "dayjs";

import { getAllInvestingPosts } from "../_api/getAllInvestingPosts";
import { getAllPosts } from "../_api/getAllPosts";

export default async function RecentPosts() {
  const [posts, investingPosts] = await Promise.all([
    getAllPosts(),
    getAllInvestingPosts(),
  ]);

  const recentPosts = [...posts, ...investingPosts]
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        dayjs(b.frontmatter.date).toDate().getTime() -
        dayjs(a.frontmatter.date).toDate().getTime()
    )
    .slice(0, 3);

  return (
    <aside className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">최신글</h3>
      <ul className="flex flex-col gap-4">
        {recentPosts.map((post) => (
          <li key={post.frontmatter.path}>
            <Link href={post.frontmatter.path} className="group block">
              <p className="text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.frontmatter.title}
              </p>
              <span className="text-sm text-gray-400 mt-1">
                {dayjs(post.frontmatter.date).format("YYYY년 M월 D일")} · {post.frontmatter.readingMinutes}분
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
