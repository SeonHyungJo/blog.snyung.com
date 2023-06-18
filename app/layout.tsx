import { Metadata } from 'next'

import { notoSansKR, archivo } from '@/app/fonts'
import { Providers } from './_components/providers'
import Header from './_components/Header'
import Footer from './_components/Footer'

import '@/app/globals.css'


export const metadata: Metadata = {
  title: 'snyung blog',
  description: '개발과 발견을 소소하게 기록하는 공간',
  generator: 'Next.js 13',
  keywords: ['react', 'nextjs', 'snyung'],
  referrer: 'strict-origin-when-cross-origin',
  themeColor: '',
  colorScheme: 'light dark',
  viewport: 'width=device-width, initial-scale=1.0',
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
  }
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