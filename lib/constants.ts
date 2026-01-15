// 카테고리별 Google Drive 폴더 ID 매핑
export const FOLDER_MAP: Record<string, string> = {
  tech: process.env.GOOGLE_DRIVE_TECH_FOLDER_ID || "",
  invest: process.env.GOOGLE_DRIVE_INVEST_FOLDER_ID || "",
  articles: process.env.GOOGLE_DRIVE_ARTICLE_FOLDER_ID || "",
};

// About Me Google Drive 폴더 ID
export const ABOUTME_FOLDER_ID = process.env.GOOGLE_DRIVE_ABOUTME_FOLDER_ID || "";

// 지원하는 카테고리 목록
export const SUPPORTED_CATEGORIES = Object.keys(FOLDER_MAP);
