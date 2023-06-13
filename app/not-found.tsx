import Link from 'next/link'

import TopSection from './@components/TopSection'


export default function NotFoundPage() {
  return (
    <TopSection
      title={'404'}
      content={'😵 페이지를 찾을 수 없습니다.'}
      footer={
        <section className={'py-2 px-2'}>
          <Link href={"/posts"} className={'text-slate-400'}>
            {'Move to Posts Page >'}
          </Link>
        </section>
      }
    />
  )
}