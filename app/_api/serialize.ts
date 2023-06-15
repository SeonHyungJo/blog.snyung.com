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

import { Frontmatter, Post } from '../_type/post';


export async function serializedMDX(raw: string, newPath: string): Promise<Post<Frontmatter>> {
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
      readingMinutes: Math.ceil(readingTime(raw, { wordsPerMinute: 250 }).minutes),
      path: newPath
    },
    serialized,
  };
}