import { getAllPosts, SUPPORTED_CATEGORIES } from "../../lib/rss";

export const dynamic = "force-static";

// 생성형 AI용 사이트 안내 (https://llmstxt.org)
export async function GET() {
  const posts = await getAllPosts();
  const body = [
    "# snyung.",
    "",
    "> 개발(tech), 투자(invest), 아티클(articles)을 기록하는 snyung의 개인 블로그.",
    "",
    ...SUPPORTED_CATEGORIES.flatMap((category) => [
      `## ${category}`,
      "",
      ...posts
        .filter((post) => post.frontmatter.path.startsWith(`/${category}/`))
        .map(
          ({ frontmatter: f }) =>
            `- [${f.title}](https://snyung.com${f.path})${f.description ? `: ${f.description}` : ""}`
        ),
      "",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
