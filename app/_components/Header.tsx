'use client'

import { useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import { BottomSheet } from 'react-spring-bottom-sheet'

import { TOP_MENU } from '@/blog.config'
import BlogSearch from './BlogSearch';

import 'react-spring-bottom-sheet/dist/style.css'


export default function Header() {
  return (
    <header>
      <Navigation />
      <MobileNavigation />
    </header>
  )
}

function Navigation() {
  const [firtSegment = ''] = useSelectedLayoutSegments()

  return (
    <section className='flex flex-row justify-between py-6 sm:py-10'>
      <section className='flex flex-row items-center justify-start gap-3'>
        <section className={'hover:bg-slate-100 transition-all py-2 px-3 rounded-lg'}>
          <Link prefetch href={'/'}>
            <Image
              width={36}
              height={36}
              src={'/images/common/logo.png'}
              alt='logo'

              style={{ cursor: 'pointer', width: 36, height: 36, }}
            />
          </Link>
        </section>

        <section className={'flex flex-row justify-start items-center max-sm:hidden'}>
          {TOP_MENU.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              prefetch
              className={cx('text-base text-slate-600 hover:bg-slate-100 transition-all py-2 px-3 rounded-lg', url === `/${firtSegment}` && 'font-bold')}
            >
              {name}
            </Link>
          ))}
        </section>
      </section>
      <SearchAndThemeChanger />
    </section>
  )
}

function MobileNavigation() {
  const [firtSegment = ''] = useSelectedLayoutSegments()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <>
      {!openMenu && <section className={'hidden max-sm:flex fixed right-1/2 translate-x-2/4 bottom-3 w-10 h-10 flex-row justify-center items-center bg-yellow-300 rounded-full z-10'}>
        <Image
          width={20}
          height={20}
          src={'/images/common/menu-icon.png'}
          alt='logo'
          style={{ cursor: 'pointer', width: 20, height: 20 }}
          onClick={() => setOpenMenu(true)}
        />
      </section>
      }
      <BottomSheet open={openMenu} onDismiss={() => setOpenMenu(false)}>
        <section className='flex flex-col items-center justify-start gap-3 p-10'>
          {TOP_MENU.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              prefetch
              className={cx('text-base text-slate-600 hover:bg-slate-200 transition-all py-2 px-4 rounded-lg', url === `/${firtSegment}` && 'font-bold')}
              onClick={() => setOpenMenu(false)}
            >
              {name}
            </Link>
          ))}
        </section>
      </BottomSheet>
    </>
  )
}

function SearchAndThemeChanger() {
  return (
    <section className='flex flex-row items-center justify-start gap-3'>
      <BlogSearch />
      {/* <section className={'flex flex-row justify-center items-center'}>
        <Images
          width={24}
          height={24}
          src={'/images/common/theme-light.png'}
          alt='logo'
          style={{ cursor: 'pointer', width: 24, height: 24 }}
        />
        <Image
          width={24}
          height={24}
          src={'/images/common/theme-dark.png'}
          alt='logo'
          style={{ cursor: 'pointer', width: 24, height: 24 }}
        />
      </section> */}
    </section>
  )
}
