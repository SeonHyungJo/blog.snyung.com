import {
  getFilesByCategory,
  SUPPORTED_CATEGORIES,
} from "../../lib/google-drive";
import TagListClient from "./TagListClient";

export default async function TagList() {
  // Google Drive에서 모든 카테고리의 파일 가져오기
  const driveFiles = await Promise.all(
    SUPPORTED_CATEGORIES.map((category) => getFilesByCategory(category))
  );

  const allFiles = driveFiles.flat();

  // 모든 태그 수집 및 카운트
  const tagCount = new Map<string, number>();

  allFiles.forEach((file) => {
    file.frontmatter.tags?.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  // 카운트 순으로 정렬
  const sortedTags = Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return <TagListClient tags={sortedTags} />;
}
