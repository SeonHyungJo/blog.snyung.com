import Link from 'next/link'

import { getAllPosts } from '../@api/getAllPosts';
import TopSection from "../@components/TopSection";
import PostListItem from '../@components/PostListItem';


export default async function PostsMainPage() {
  const posts = await getAllPosts();

  return (
    <>
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

      <section className='flex flex-row items-end justify-start w-full gap-2 py-10'>
        <h2>All Posts</h2>
        <h6>{`(${posts.length})`}</h6>
      </section>

      <section 
        className='flex flex-col items-start justify-start gap-2' 
        style={{
          transform: 'translateX(-6px)',
          width: 'calc(100% + 12px)'
        }}
      >
        {
          posts.map(post => (
            <PostListItem key={post.frontmatter.path} {...post} />
          ))
        }
      </section>
    </>
  );
}