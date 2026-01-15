# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog platform (blog.snyung.com) built with Next.js 16, React 19, and TypeScript. Posts are sourced from Google Drive via the Google Drive API and rendered as MDX content. The site supports three content categories: tech (개발), invest (투자), and articles (아티클).

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production (includes image optimization, sitemap, and RSS generation)
pnpm start        # Serve the static export from /out directory
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
```

**Requirements:** Node >= 22, pnpm 10.28.0

## Architecture

### App Router Structure (app/)

- `[category]/page.tsx` - Category listing pages (tech, invest, articles) using ISR with 1-hour revalidation
- `[category]/[id]/page.tsx` - Individual post pages with MDX rendering
- `_api/` - Data fetching functions (prefixed with `_` to exclude from routing)
- `_components/` - React components (Server and Client components)
- `_type/` - TypeScript type definitions

### Content Pipeline

1. **Google Drive API** (`lib/google-drive.ts`) fetches MDX files from configured folders
2. **Frontmatter** is parsed with gray-matter
3. **MDX** is serialized using next-mdx-remote with plugins:
   - Remark: remarkGfm, remarkBreaks, remarkTOC
   - Rehype: rehypePrettyCode (shiki, GitHub Dark theme), rehypeSlug, rehypeAutolinkHeadings
4. Custom components in `MdxComponents.tsx` handle rendering (code blocks, images, etc.)

### Key Files

- `blog.config.ts` - Navigation menu and social links configuration
- `lib/constants.ts` - Category to Google Drive folder ID mapping (FOLDER_MAP)
- `lib/google-drive.ts` - Google Drive API integration with service account auth
- `lib/rss.ts` - RSS feed generation utilities

## Environment Variables

Required for Google Drive integration:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_DRIVE_TECH_FOLDER_ID`
- `GOOGLE_DRIVE_INVEST_FOLDER_ID`
- `GOOGLE_DRIVE_ARTICLE_FOLDER_ID`

Optional for search:
- `NEXT_PUBLIC_DOC_SEARCH_API_KEY`
- `NEXT_PUBLIC_DOC_SEARCH_INDEX_NAME`
- `NEXT_PUBLIC_DOC_SEARCH_APP_ID`

## Code Style

- ESLint with TypeScript, double quotes, semicolons required
- Import sorting via eslint-plugin-simple-import-sort
- 2-space indentation
- Tailwind CSS for styling with @tailwindcss/typography

## Build Output

Static export to `/out` directory, deployed to Netlify. Build process runs:
1. `next build` - Generate static pages
2. `next-image-export-optimizer` - Optimize images
3. `next-sitemap` - Generate sitemaps
4. RSS generation script for all categories
