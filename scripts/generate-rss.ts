import * as fs from "fs";
import * as path from "path";

import {
  generateRssFeed,
  getAllPosts,
  getPostsByCategory,
  SUPPORTED_CATEGORIES,
} from "../lib/rss";

const OUT_DIR = path.join(process.cwd(), "out");

async function generateAllRssFeeds() {
  console.log("Generating RSS feeds...");

  // 1. 전체 피드 생성
  const allPosts = await getAllPosts();
  const mainFeed = generateRssFeed(allPosts, {
    title: "snyung.",
    description: "개발과 발견을 소소하게 기록하는 공간",
    feedUrl: "https://snyung.com/rss.xml",
  });
  fs.writeFileSync(path.join(OUT_DIR, "rss.xml"), mainFeed, "utf-8");
  console.log(`  ✓ Generated: /rss.xml (${allPosts.length} posts)`);

  // 2. 카테고리별 피드 생성
  for (const category of SUPPORTED_CATEGORIES) {
    const categoryPosts = await getPostsByCategory(category);
    const categoryFeed = generateRssFeed(categoryPosts, {
      title: `snyung. - ${category}`,
      description: `snyung.의 ${category} 포스트`,
      feedUrl: `https://snyung.com/${category}/rss.xml`,
    });

    const categoryDir = path.join(OUT_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    fs.writeFileSync(path.join(categoryDir, "rss.xml"), categoryFeed, "utf-8");
    console.log(
      `  ✓ Generated: /${category}/rss.xml (${categoryPosts.length} posts)`
    );
  }

  console.log("RSS generation complete!");
}

generateAllRssFeeds().catch((error) => {
  console.error("Failed to generate RSS feeds:", error);
  process.exit(1);
});
