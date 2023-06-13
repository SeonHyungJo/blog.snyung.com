import { promises as fs } from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';

import { Frontmatter, Post } from '../@type/post';
import { serializedMDX } from './serialize';


const BASE_PATH = '/aboutme/index';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export async function getAboutMe(): Promise<Post<Frontmatter>> {
  try {
    const raw = await fs.readFile(`${POSTS_PATH}.mdx`, 'utf-8');
    return serializedMDX(raw, '/snyung')
  } catch (error) {
    console.error(error)
    redirect('/not-found')
  }
}
