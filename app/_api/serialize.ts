import { compileMDX } from "next-mdx-remote/rsc";

import dayjs from "dayjs";
import { readingTime } from "reading-time-estimator";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkTOC from "remark-toc";

import { Frontmatter, Post } from "../_type/post";
import { MdxComponents } from "../_components/MdxComponents";


export async function serializedMDX(raw: string, newPath: string): Promise<Post<Frontmatter>> {
  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkBreaks,
          [
            remarkTOC,
            {
              heading: "TOC",
              tight: true,
              ordered: false,
              maxDepth: 2,
            }
          ]
        ],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: true,
              defaultLang: "plaintext",
            }
          ],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
        format: "mdx"
      },
    },
    components: MdxComponents,
  });

  return {
    frontmatter: {
      ...frontmatter,
      date: dayjs(frontmatter.date).format("YYYY.MM.DD"),
      readingMinutes: Math.ceil(readingTime(raw, { wordsPerMinute: 250 }).minutes),
      path: newPath
    },
    content,
  };
}
