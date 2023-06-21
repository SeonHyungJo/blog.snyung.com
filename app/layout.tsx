import { Metadata } from 'next'

import { notoSansKR, archivo } from '@/app/fonts'
import { Providers } from './_components/providers'
import Header from './_components/Header'
import Footer from './_components/Footer'

import '@/app/globals.css'


export const metadata: Metadata = {
  title: {
    template: '%s | snyung blog',
    default: 'snyung blog',
    absolute: 'snyung blog'
  },
  description: '개발과 발견을 소소하게 기록하는 공간',
  generator: 'Next.js',
  keywords: ['react', 'nextjs', 'snyung'],
  referrer: 'strict-origin-when-cross-origin',
  applicationName: 'snyung blog',
  themeColor: '',
  colorScheme: 'light dark',
  publisher: 'Netlify',
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://blog.snyung.com',
  },
  verification: {
    google: 'hDzzkGSdcpcCt94YWZs1eqeK8tpkC5ZT0UjypZ3H3JQ',
    other: {
      'naver-site-verification': '432c466f5eacaf9c1b02110abbbae0031cd63f8a'
    }
  },
  appleWebApp: {
    title: 'snyung blog',
    capable: true,
    startupImage: [],
    statusBarStyle: 'black-translucent',
  },
  archives: 'https://blog.snyung.com/archives',
  authors: {
    url: 'https://github.com/SeonHyungJo',
    name: 'snyung'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    url: 'https://blog.snyung.com',
    siteName: 'snyung blog',
    images: [
      {
        url: '/images/common/Avatar.png?width=800',
        width: 800,
        height: 600,
      },
      {
        url: '/images/common/Avatar.png?width=1800',
        width: 1800,
        height: 1600,
        alt: 'snyung blog',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },

}

const APP_ID = process.env.NEXT_PUBLIC_DOC_SEARCH_APP_ID as string

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${archivo.variable}`}>
      <head>
        <link rel="preconnect" href={`https://${APP_ID}-dsn.algolia.net`} crossOrigin="anonymous" />
      </head>
      <body className='flex flex-col max-w-4xl px-4 mx-auto'>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}