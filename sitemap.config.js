/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://blog.snyung.com",
  output: "export",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  autoLastmod: true,
  outDir: "out",
  exclude: [],
};