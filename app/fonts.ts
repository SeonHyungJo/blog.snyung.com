import { Noto_Sans_KR, Roboto_Mono, Archivo } from 'next/font/google'


export const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '700', '900'],
  preload: true,
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
})

export const robotoMono = Roboto_Mono({
  weight: ['300', '400', '600', '700'],
  preload: true,
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const archivo = Archivo({
  weight: ['300', '400', '600', '700'],
  preload: true,
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

