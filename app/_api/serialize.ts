import { compileMDX } from "next-mdx-remote/rsc";

import dayjs from "dayjs";
import { readingTime } from "reading-time-estimator";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkTOC from "remark-toc";

import { MdxComponents } from "../_components/MdxComponents";
import { Frontmatter, Post } from "../_type/post";

/**
 * HTML style 문자열을 제거합니다.
 * MDX에서 HTML style 속성은 JSX 객체 문법으로 변환되어야 하는데,
 * 복잡한 변환 대신 일단 제거하여 빌드 안정성을 확보합니다.
 */
function removeInlineStyles(source: string): string {
  // 코드 블록을 임시 플레이스홀더로 대체
  const codeBlocks: string[] = [];

  // Fenced code blocks (```...```)
  let processed = source.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Inline code (`...`)
  processed = processed.replace(/`[^`]+`/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // style 속성 제거
  processed = processed.replace(/\s*style\s*=\s*["'][^"']*["']/g, "");

  // 코드 블록 복원
  codeBlocks.forEach((block, index) => {
    processed = processed.replace(`__CODE_BLOCK_${index}__`, block);
  });

  return processed;
}

export async function serializedMDX(
  raw: string,
  newPath: string
): Promise<Post<Frontmatter>> {
  // HTML style 속성 제거 (MDX 호환성을 위해)
  const processedSource = removeInlineStyles(raw);

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: processedSource,
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
            },
          ],
        ] as any,
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: true,
              defaultLang: "plaintext",
            },
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
        ] as any,
        format: "mdx",
      },
    },
    components: MdxComponents,
  });

  return {
    frontmatter: {
      ...frontmatter,
      date: dayjs(frontmatter.date).format("YYYY.MM.DD"),
      readingMinutes: Math.ceil(
        readingTime(raw, { wordsPerMinute: 250 }).minutes
      ),
      path: newPath,
    },
    content,
  };
}
