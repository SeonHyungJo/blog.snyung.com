'use client'

import Image from 'next/image';

import SocialLinks from "./SocialLinks";


const ID_DATA = {
  name: 'Seonhyung Jo',
  description: 'Frontend Engineer (from. 2018)',
  avatarImg: '/images/common/avatar.jpg'
}

export default function IdCard() {
  return (
    <section className='flex flex-row items-center justify-center gap-8 p-12 mx-auto'>
      <Image
        className='rounded-full'
        width={84}
        height={84}
        src={ID_DATA.avatarImg}
        alt={'avatar'}
      />
      
      <section className='flex flex-col items-start justify-center'>
        <span className='font-bold'>{ID_DATA.name}</span>
        <span className='text-sm text-slate-500'>{ID_DATA.description}</span>
        <section className={'my-3 w-full flex flex-row justify-start items-center gap-2'}>
          <SocialLinks />
        </section>
      </section>
    </section>
  )
}