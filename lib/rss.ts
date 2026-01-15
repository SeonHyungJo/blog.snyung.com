import dayjs from "dayjs";

import { DriveFileWithMeta, getFilesByCategory, SUPPORTED_CATEGORIES } from "./google-drive";

const SITE_URL = "https://snyung.com";
const SITE_TITLE = "snyung.";
const SITE_DESCRIPTION = "개발과 발견을 소소하게 기록하는 공간";
const AUTHOR = "snyung";
const MAX_ITEMS = 100;

/**
 * RSS 2.0 아이템 XML 생성
 */
function generateRssItem(file: DriveFileWithMeta): string {
  const { frontmatter } = file;
  const link = `${SITE_URL}${frontmatter.path}`;
  const pubDate = dayjs(frontmatter.date).toDate().toUTCString();

  return `    <item>
      <title><![CDATA[${frontmatter.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${frontmatter.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${frontmatter.author || AUTHOR}</author>
      <category>${frontmatter.category}</category>
    </item>`;
}

/**
 * RSS 2.0 피드 XML 생성
 */
export function generateRssFeed(
  files: DriveFileWithMeta[],
  options?: { title?: string; description?: string; feedUrl?: string }
): string {
  const title = options?.title || SITE_TITLE;
  const description = options?.description || SITE_DESCRIPTION;
  const feedUrl = options?.feedUrl || `${SITE_URL}/rss.xml`;
  const lastBuildDate = new Date().toUTCString();

  const items = files
    .sort((a, b) =>
      dayjs(b.frontmatter.date).diff(dayjs(a.frontmatter.date))
    )
    .slice(0, MAX_ITEMS)
    .map(generateRssItem)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${SITE_URL}</link>
    <description>${description}</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

/**
 * 모든 카테고리의 포스트 가져오기
 */
export async function getAllPosts(): Promise<DriveFileWithMeta[]> {
  const allFiles = await Promise.all(
    SUPPORTED_CATEGORIES.map((category) => getFilesByCategory(category))
  );
  return allFiles.flat();
}

/**
 * 카테고리별 포스트 가져오기
 */
export async function getPostsByCategory(
  category: string
): Promise<DriveFileWithMeta[]> {
  return getFilesByCategory(category);
}

export { SUPPORTED_CATEGORIES };
