import dayjs from "dayjs";

import {
  getFilesByCategory,
  SUPPORTED_CATEGORIES,
} from "../lib/google-drive";
import DrivePostList from "./_components/DrivePostList";
import RecentPosts from "./_components/RecentPosts";
import TagList from "./_components/TagList";

export default async function Home() {
  // Google Drive에서 모든 카테고리의 파일 가져오기
  const driveFiles = await Promise.all(
    SUPPORTED_CATEGORIES.map((category) => getFilesByCategory(category))
  );

  // 모든 포스트를 날짜순으로 정렬
  const allPosts = driveFiles.flat().sort(
    (a, b) =>
      dayjs(b.frontmatter.date, "YYYY.MM.DD").toDate().getTime() -
      dayjs(a.frontmatter.date, "YYYY.MM.DD").toDate().getTime()
  );

  return (
    <div className="flex flex-row gap-8 pt-4">
      <DrivePostList files={allPosts} />

      <aside className="hidden lg:flex lg:flex-col lg:gap-10 w-[280px] flex-shrink-0 pl-8 border-l border-gray-100">
        <RecentPosts />
        <TagList />
      </aside>
    </div>
  );
}
