import dayjs from "dayjs";
import { drive_v3, google } from "googleapis";
import matter from "gray-matter";
import { readingTime } from "reading-time-estimator";

import { Frontmatter } from "../app/_type/post";
import { FOLDER_MAP, SUPPORTED_CATEGORIES } from "./constants";

export { SUPPORTED_CATEGORIES };

// Google Drive 클라이언트 싱글톤
let driveClient: drive_v3.Drive | null = null;

/**
 * 환경 변수가 설정되어 있는지 확인합니다.
 */
function isConfigured(): boolean {
  return !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  );
}

/**
 * Google Drive API 클라이언트를 생성합니다.
 * 서비스 계정 인증을 사용합니다.
 */
function getDriveClient(): drive_v3.Drive | null {
  if (!isConfigured()) {
    console.warn("Google Drive API credentials not configured");
    return null;
  }

  if (driveClient) {
    return driveClient;
  }

  const credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

/**
 * 파일의 Frontmatter를 파싱합니다.
 */
export function parseFrontmatter(
  raw: string,
  fileId: string,
  category: string
): Omit<Frontmatter, "content"> {
  const { data } = matter(raw);

  return {
    path: `/${category}/${fileId}`,
    title: data.title || "Untitled",
    description: data.description,
    date: dayjs(data.date).format("YYYY.MM.DD"),
    draft: data.draft ?? false,
    tags: data.tags || [],
    category: data.category || category,
    readingMinutes: Math.ceil(
      readingTime(raw, { wordsPerMinute: 250 }).minutes
    ),
    author: data.author || "snyung",
    thumbnail: data.thumbnail,
  };
}

/**
 * Google Drive에서 특정 파일의 콘텐츠를 가져옵니다.
 */
export async function getFileContent(fileId: string): Promise<string> {
  const drive = getDriveClient();

  if (!drive) {
    throw new Error("Google Drive API not configured");
  }

  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    { responseType: "text" }
  );

  return response.data as string;
}

/**
 * 파일 정보와 Frontmatter를 포함한 타입
 */
export type DriveFileWithMeta = {
  fileId: string;
  frontmatter: Frontmatter;
};

/**
 * 카테고리별 파일 목록과 메타데이터를 가져옵니다.
 * 캐싱을 위해 Next.js의 fetch 캐시를 활용합니다.
 */
export async function getFilesByCategory(
  category: string
): Promise<DriveFileWithMeta[]> {
  const folderId = FOLDER_MAP[category];

  if (!folderId) {
    console.warn(`Folder ID not configured for category: ${category}`);
    return [];
  }

  const drive = getDriveClient();

  if (!drive) {
    console.warn("Google Drive API not configured, returning empty list");
    return [];
  }

  // 폴더 내 md/mdx 파일 목록 조회
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false and (name contains '.md' or name contains '.mdx')`,
    fields: "files(id, name, modifiedTime)",
    orderBy: "modifiedTime desc",
  });

  const files = response.data.files || [];

  // 병렬로 각 파일의 콘텐츠를 가져와서 Frontmatter 파싱
  const filesWithMeta = await Promise.all(
    files.map(async (file) => {
      try {
        const content = await getFileContent(file.id!);
        const frontmatter = parseFrontmatter(content, file.id!, category);

        return {
          fileId: file.id!,
          frontmatter,
        };
      } catch (error) {
        console.error(`Error fetching file ${file.id}:`, error);
        return null;
      }
    })
  );

  // null 필터링 및 draft 제외, 날짜순 정렬
  return filesWithMeta
    .filter((file): file is DriveFileWithMeta => file !== null)
    .filter((file) => !file.frontmatter.draft)
    .sort((a, b) => {
      // 날짜 내림차순 정렬
      const dateA = dayjs(a.frontmatter.date, "YYYY.MM.DD");
      const dateB = dayjs(b.frontmatter.date, "YYYY.MM.DD");
      return dateB.diff(dateA);
    });
}

/**
 * 특정 파일의 raw 콘텐츠와 파싱된 메타데이터를 반환합니다.
 */
export async function getFileWithMeta(
  fileId: string,
  category: string
): Promise<{ raw: string; frontmatter: Frontmatter } | null> {
  try {
    const raw = await getFileContent(fileId);
    const frontmatter = parseFrontmatter(raw, fileId, category);

    return { raw, frontmatter };
  } catch (error) {
    console.error(`Error fetching file ${fileId}:`, error);
    return null;
  }
}
