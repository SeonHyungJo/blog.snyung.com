import { Metadata, Viewport } from "next";
import ExportedImage from "next-image-export-optimizer";

import "@/app/globals.css";

import { jetbrainsMono } from "@/app/fonts";

import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Providers } from "./_components/providers";
import TabNavigation from "./_components/TabNavigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://snyung.com"),
  title: {
    template: "%s | snyung.",
    default: "snyung.",
    absolute: "snyung.",
  },
  description: "개발과 발견을 소소하게 기록하는 공간",
  generator: "Next.js",
  keywords: ["react", "nextjs", "snyung"],
  referrer: "strict-origin-when-cross-origin",
  applicationName: "snyung.",
  manifest: "/manifest.json",
  publisher: "Netlify",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://snyung.com",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "snyung. RSS Feed" },
        { url: "/tech/rss.xml", title: "snyung. Tech RSS Feed" },
        { url: "/invest/rss.xml", title: "snyung. Invest RSS Feed" },
        { url: "/articles/rss.xml", title: "snyung. Articles RSS Feed" },
      ],
    },
  },
  verification: {
    google: "hDzzkGSdcpcCt94YWZs1eqeK8tpkC5ZT0UjypZ3H3JQ",
    other: {
      "naver-site-verification": "432c466f5eacaf9c1b02110abbbae0031cd63f8a",
    },
  },
  appleWebApp: {
    title: "snyung.",
    capable: true,
    startupImage: [],
    statusBarStyle: "black-translucent",
  },
  archives: "https://snyung.com/archives",
  authors: {
    url: "https://github.com/SeonHyungJo",
    name: "snyung",
  },
  openGraph: {
    title: "snyung.",
    url: "https://snyung.com",
    description: "blog for the Web",
    siteName: "snyung.",
    images: [
      {
        url: "/images/common/Avatar.png?width=800",
        width: 800,
        height: 600,
      },
      {
        url: "/images/common/Avatar.png?width=1800",
        width: 1800,
        height: 1600,
        alt: "snyung.",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "snyung.",
    description: "blog for the Web",
    siteId: "1477660020057976837",
    creator: "@snyung_dev",
    creatorId: "1477660020057976837",
    images: [
      {
        url: "/images/common/Avatar.png?width=800",
        width: 800,
        height: 600,
      },
      {
        url: "/images/common/Avatar.png?width=1800",
        width: 1800,
        height: 1600,
        alt: "snyung.",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
  colorScheme: "light dark",
};

const APP_ID = process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={jetbrainsMono.variable}>
      <head>
        <link
          rel="preconnect"
          href={`https://${APP_ID}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </head>

      <body className="flex flex-col w-full max-w-[1200px] mx-auto">
        <Providers>
          <div className="sticky top-0 z-50 bg-white w-full max-w-[1140px] mx-auto">
            <div className="px-6 min-[1200px]:px-0">
              <Header />
            </div>
            <TabNavigation />
          </div>
          <div className="w-full max-w-[1140px] mx-auto px-0">{children}</div>
          <div className="w-full max-w-[1140px] mx-auto px-6 min-[1200px]:px-0">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
