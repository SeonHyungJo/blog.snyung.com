import dayjs from "dayjs";
import { sync } from "glob";
import path from "path";

import { Frontmatter, Post } from "../_type/post";
import { getPost } from "./getPost";

const BASE_PATH = "/posts";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export function getAllPostsPaths(): { slug: string[] }[] {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths.map((path) => ({ slug: path.slice(POSTS_PATH.length + 1).replace(".mdx", "").split("/") }));
}

export async function getAllPosts(): Promise<Post<Frontmatter>[]> {
  const allPostsPaths = getAllPostsPaths();
  const allPosts = await Promise.all(allPostsPaths.map((path) => getPost(`/${path.slug.join("/")}`)));

  allPosts.sort((a, b) => {
    const bTitle = b.frontmatter.title;
    const aTitle = a.frontmatter.title;
    return bTitle.localeCompare(aTitle);
  });
  allPosts.sort((a, b) => dayjs(b.frontmatter.date).toDate().getTime() - dayjs(a.frontmatter.date).toDate().getTime());

  return allPosts;
}

