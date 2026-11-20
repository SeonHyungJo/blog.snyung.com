// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: "https://snyung.com",
//   output: "export",
//   generateRobotsTxt: true,
//   changefreq: "daily",
//   priority: 0.7,
//   sitemapSize: 7000,
//   autoLastmod: true,
//   outDir: "out",
//   exclude: [],
// };


/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://snyung.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [],
  autoLastmod: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: []
      },
    ]
  }
};