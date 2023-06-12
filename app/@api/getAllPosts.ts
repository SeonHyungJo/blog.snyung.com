import { sync } from 'glob';
import path from 'path';
import dayjs from 'dayjs';

import { Frontmatter, Post } from '../@type/post';
import { getPost } from './getPost';

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export async function getAllPosts(): Promise<Post<Frontmatter>[]> {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  const allPosts = await Promise.all(postPaths.map((path) => getPost(path)))
  allPosts.sort((a, b) => dayjs(b.frontmatter.date).toDate().getTime() - dayjs(a.frontmatter.date).toDate().getTime())

  return allPosts;
}
