import {
  generateRssFeed,
  getPostsByCategory,
  SUPPORTED_CATEGORIES,
} from "../../../lib/rss";

export const dynamic = "force-static";

export function generateStaticParams() {
  return SUPPORTED_CATEGORIES.map((category) => ({ category }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const feed = generateRssFeed(await getPostsByCategory(category), {
    title: `snyung. - ${category}`,
    description: `snyung.의 ${category} 포스트`,
    feedUrl: `https://snyung.com/${category}/rss.xml`,
  });
  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
