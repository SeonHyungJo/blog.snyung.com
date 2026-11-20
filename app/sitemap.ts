import { MetadataRoute } from "next";

import { getAllPosts, SUPPORTED_CATEGORIES } from "../lib/rss";

export const dynamic = "force-static";

const SITE_URL = "https://snyung.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    { url: SITE_URL, lastModified: new Date() },
    ...SUPPORTED_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/${category}`,
      lastModified: new Date(),
    })),
    ...posts.map(({ frontmatter }) => ({
      url: `${SITE_URL}${frontmatter.path}`,
      lastModified: new Date(frontmatter.date),
    })),
  ];
}
