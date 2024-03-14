import { Metadata } from "next";

import "@/app/globals.css";

import { archivo, notoSansKR } from "@/app/fonts";

import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Providers } from "./_components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.snyung.com"),
  title: {
    template: "%s | snyung blog",
    default: "snyung blog",
    absolute: "snyung blog",
  },
  description: "개발과 발견을 소소하게 기록하는 공간",
  generator: "Next.js",
  keywords: ["react", "nextjs", "snyung"],
  referrer: "strict-origin-when-cross-origin",
  applicationName: "snyung blog",
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  colorScheme: "light dark",
  publisher: "Netlify",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://blog.snyung.com",
  },
  verification: {
    google: "hDzzkGSdcpcCt94YWZs1eqeK8tpkC5ZT0UjypZ3H3JQ",
    other: {
      "naver-site-verification": "432c466f5eacaf9c1b02110abbbae0031cd63f8a",
    },
  },
  appleWebApp: {
    title: "snyung blog",
    capable: true,
    startupImage: [],
    statusBarStyle: "black-translucent",
  },
  archives: "https://blog.snyung.com/archives",
  authors: {
    url: "https://github.com/SeonHyungJo",
    name: "snyung",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    userScalable: false,
  },
  openGraph: {
    title: "snyung blog",
    url: "https://blog.snyung.com",
    description: "blog for the Web",
    siteName: "snyung blog",
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
        alt: "snyung blog",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "snyung blog",
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
        alt: "snyung blog",
      },
    ],
  },
};

const APP_ID = process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID as string;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${archivo.variable}`}>
      <head>
        <link
          rel="preconnect"
          href={`https://${APP_ID}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </head>

      <body
        className="flex flex-col w-full mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <Providers>
          <Header />
          <div className="w-full px-6 mx-auto">
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
