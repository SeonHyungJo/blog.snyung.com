const withExportImages = require("next-export-optimize-images");
const isDev = process.env.NODE_ENV !== "production";

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  // disable: isDev,
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  // runtimeCaching,
  // buildExcludes: ["app-build-manifest.json"],
});

/** @type {import('next').NextConfig} */
const nextConfig = withExportImages({
  output: "export",
  experimental: {
    mdxRs: true,
  }
});


module.exports = withPWA(nextConfig);