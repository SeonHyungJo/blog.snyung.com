import Link from 'next/link'
import TopSection from "../@components/TopSection";

export default async function PostsMainPage() {
  return (
    <TopSection
      title={'Posts'}
      content={'🧐 개발하면서 정리한 내용을 모아놓은 공간입니다.'}
      footer={
        <section className={'py-2 px-2'}>
          <Link href={"/snyung"} className={'text-slate-400'}>
            {'More about me >'}
          </Link>
        </section>
      }
    />
  );
}