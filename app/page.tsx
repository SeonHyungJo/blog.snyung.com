import { promises as fs } from 'fs';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import remarkGfm from 'remark-gfm';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkBreaks from 'remark-breaks';
import remarkTOC from 'remark-toc';
import rehypeCodeTitle from 'rehype-code-title';

import readingTime from 'reading-time';
import dayjs from 'dayjs';

import { MdxContent } from './@components/mdx-content';
import Giscus from './@components/giscus';


type Frontmatter = {
  path: string;
  title: string;
  date: string;
  draft?: boolean;
  tags: string[];
  category: string;
  readingMinutes: number;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

async function getPost(filepath: string): Promise<Post<Frontmatter>> {
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
            heading: 'contents'
          }
        ]
      ],
      rehypePlugins: [
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
        rehypeCodeTitle,
      ],
      format: 'mdx'
    },
  });

  const frontmatter = serialized.frontmatter as Frontmatter;

  return {
    frontmatter: {
      ...frontmatter,
      date: dayjs(frontmatter.date).format('YY.MM.DD'),
      readingMinutes: Math.ceil(readingTime(raw, { wordsPerMinute: 150 }).minutes),
    },
    serialized,
  };
}

export default async function Home() {
  const { serialized, frontmatter } = await getPost('posts/index.mdx');

  return (
    <div className={'mx-auto'}>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <p>readingMinutes {frontmatter.readingMinutes}</p>
      <MdxContent source={serialized} />
      <Giscus/>
    </div>
  );
}