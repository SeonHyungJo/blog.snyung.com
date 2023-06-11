'use client'

import { useRef, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classnames';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'

import 'react-spring-bottom-sheet/dist/style.css'


const menuData: { name: string, url: string }[] = [
  {
    name: 'Posts',
    url: '/posts'
  },
  {
    name: 'Series',
    url: '/series'
  },
  {
    name: 'Snippets',
    url: '/snippets'
  },
  {
    name: 'Archives',
    url: '/archives'
  },
]

export default function Header() {
  const [firtSegment = ''] = useSelectedLayoutSegments()

  return (
    <>
      <header>
        <section className='flex flex-row justify-between py-10 px-6'>
          <section className='flex flex-row justify-start items-center gap-3'>
            <Link prefetch href={'/'}>
              <Image
                width={36}
                height={36}
                src={'/images/common/logo.png'}
                alt='logo'
                style={{ cursor: 'pointer', width: 36, height: 36 }}
              />
            </Link>

            <section className={'flex flex-row justify-start items-center max-sm:hidden'}>
              {menuData.map(({ name, url }) => (
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

          {/* <section className='flex flex-row justify-start items-center gap-3'>
            <span>
              {'검색창'}
            </span>
            <section className={'flex flex-row justify-center items-center'}>
              <Image
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
            </section>
          </section> */}
        </section>
      </header>

      <MobileNavigation />
    </>
  )
}

function MobileNavigation() {
  const [firtSegment = ''] = useSelectedLayoutSegments()
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <section className={'hidden max-sm:flex absolute right-1/2 translate-x-2/4 bottom-3 w-10 h-10 flex-row justify-center items-center bg-yellow-300 rounded-full'}>
      <Image
        width={20}
        height={20}
        src={'/images/common/menu-icon.png'}
        alt='logo'
        style={{ cursor: 'pointer', width: 20, height: 20 }}
        onClick={() => setOpenMenu(true)}
      />

      <BottomSheet open={openMenu} onDismiss={() => setOpenMenu(false)}>
        <section className='flex flex-col justify-start items-center gap-3 p-10'>
          {menuData.map(({ name, url }) => (
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
    </section>
  )
}
