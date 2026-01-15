import Link from "next/link";

import dayjs from "dayjs";

import {
  getFilesByCategory,
  SUPPORTED_CATEGORIES,
} from "../../lib/google-drive";

export default async function RecentPosts() {
  // Google Drive에서 모든 카테고리의 파일 가져오기
  const driveFiles = await Promise.all(
    SUPPORTED_CATEGORIES.map((category) => getFilesByCategory(category))
  );

  const recentPosts = driveFiles
    .flat()
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
        {recentPosts.map((file) => (
          <li key={file.frontmatter.path}>
            <Link href={file.frontmatter.path} className="group block">
              <p className="text-base font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {file.frontmatter.title}
              </p>
              <span className="text-sm text-gray-400 mt-1">
                {dayjs(file.frontmatter.date).format("YYYY년 M월 D일")} · {file.frontmatter.readingMinutes}분
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
