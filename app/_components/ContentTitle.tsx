'use client'

import Image from 'next/image';
import { Frontmatter } from '../_type/post';


type ContentTitleProps = Pick<Frontmatter, 'title' | 'date' | 'readingMinutes'>

export default function ContentTitle({ title, date, readingMinutes }: ContentTitleProps) {
  return (
    <section className={'w-auto flex flex-col justify-center items-center gap-2 py-2'}>
      <h1 className='text-center'>{title}</h1>
      
      <section className={'w-auto flex flex-row justify-center items-center gap-2 mt-2'}>
        <Image
          width={14}
          height={14}
          src={"/images/common/icon-calendar.png"}
          alt={'published'}
        />
        <span className={'text-sm text-slate-400 mr-2'}>
          {date}
        </span>

        <Image
          width={14}
          height={14}
          src={"/images/common/icon-clock.png"}
          alt={'reading minutes'}
        />
        <span className={'text-sm text-slate-400'}>
          {`${readingMinutes}분`}
        </span>
      </section>

      <hr className={'border-1 w-full border-slate-300 my-6'}/>
    </section>
  )
}
