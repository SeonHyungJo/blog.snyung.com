import { promises as fs } from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { redirect } from 'next/navigation';

import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkBreaks from 'remark-breaks';
import remarkTOC from 'remark-toc';
import rehypeCodeTitles from 'rehype-code-titles';

import readingTime from 'reading-time';
import dayjs from 'dayjs';

import { Frontmatter, Post } from '../@type/post';

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export async function getPost(filePath: string): Promise<Post<Frontmatter>> {
  try {
    const raw = await fs.readFile(`${POSTS_PATH}${filePath}.mdx`, 'utf-8');

    const serialized = await serialize(raw, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkBreaks,
          [

            remarkTOC,
            {
              heading: 'TOC',
              tight: true,
              ordered: false,
              maxDepth: 2,
            }
          ]
        ],
        rehypePlugins: [
          rehypeCodeTitles,
          rehypePrismPlus,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
        format: 'mdx'
      },
    });

    const frontmatter = serialized.frontmatter as Frontmatter;

    return {
      frontmatter: {
        ...frontmatter,
        date: dayjs(frontmatter.date).format('YYYY.MM.DD'),
        readingMinutes: Math.ceil(readingTime(raw, { wordsPerMinute: 150 }).minutes),
        path: BASE_PATH + filePath
      },
      serialized,
    };
  } catch (error) {
    console.error(error)
    redirect('/not-found')
  }
}
