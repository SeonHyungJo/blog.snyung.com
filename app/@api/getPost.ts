import { promises as fs } from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';

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

const PROJECT_PATH = path.join(process.cwd());

export async function getPost(filepath: string): Promise<Post<Frontmatter>> {
  const raw = await fs.readFile(filepath, 'utf-8');

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
        rehypePrismPlus,
        [
          rehypeCodeTitles,
          {
            titleSeperator: ":"
          }
        ]
        ,
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
      path: filepath.includes(PROJECT_PATH) ? filepath.slice(PROJECT_PATH.length).replace('.mdx', '') : filepath
    },
    serialized,
  };
}
