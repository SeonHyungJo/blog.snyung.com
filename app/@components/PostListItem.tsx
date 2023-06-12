'use client'

import Image from 'next/image'
import Link from 'next/link';

import Tags from '../@components/Tags';
import { Frontmatter, Post } from '../@type/post';


export default function PostListItem({ frontmatter }: Post<Frontmatter>) {
  console.log(frontmatter.path)

  return (
    <Link prefetch scroll={true} href={frontmatter.path} className='flex flex-col items-start justify-start w-full gap-4 px-0 py-6 transition-all rounded-lg cursor-pointer sm:px-4 hover:shadow-sm hover:bg-indigo-100 will-change-contents'>
      <p className='p-2 text-xl font-semibold'>{frontmatter.title}</p>

      <section className='flex flex-row items-center justify-between w-full'>
        <section className='flex flex-row items-center justify-start w-full gap-2'>
          <Tags tags={frontmatter.tags} />
        </section>

        <section className={'w-full flex flex-row justify-end items-center gap-2'}>
          <Image
            width={14}
            height={14}
            src={"/images/common/icon-calendar.png"}
            alt={'published'}
          />
          <span className={'text-sm text-slate-400 mr-2'}>
            {frontmatter.date}
          </span>

          <Image
            width={14}
            height={14}
            src={"/images/common/icon-clock.png"}
            alt={'reading minutes'}
          />
          <span className={'text-sm text-slate-400'}>
            {`${frontmatter.readingMinutes}분`}
          </span>
        </section>
      </section>
    </Link>
  )
}