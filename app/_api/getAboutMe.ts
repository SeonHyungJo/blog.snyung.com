import { redirect } from "next/navigation";

import { promises as fs } from "fs";
import path from "path";

import { getAboutMeContent } from "../../lib/google-drive";
import { Frontmatter, Post } from "../_type/post";
import { serializedMDX } from "./serialize";

const BASE_PATH = "/aboutme/index";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export async function getAboutMe(): Promise<Post<Frontmatter>> {
  // Google Drive에서 먼저 시도
  const driveContent = await getAboutMeContent();

  if (driveContent) {
    return serializedMDX(driveContent, "/snyung");
  }

  // 폴백: 로컬 파일 사용
  try {
    const raw = await fs.readFile(`${POSTS_PATH}.mdx`, "utf-8");
    return serializedMDX(raw, "/snyung");
  } catch (error) {
    console.error(error);
    redirect("/not-found");
  }
}
