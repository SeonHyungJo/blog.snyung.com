
import { getAllPostsPaths } from '@/app/_api/getAllPosts';
import { getPost } from '@/app/_api/getPost';

import IdCard from '../../_components/IdCard';
import Tags from '../../_components/Tags';
import ContentTitle from '../../_components/ContentTitle';
import { MdxContent } from '../../_components/MdxContent';
import Comment from '../../_components/Comment';

export function generateStaticParams() {
  return getAllPostsPaths()
}

export default async function PostsDetailPage({ params }: { params: { slug: string[] } }) {
  const path = params.slug.map((param) => decodeURIComponent(param))
  const { frontmatter, serialized } = await getPost(`/${path.join('/')}`);

  return (
    <section className="w-full max-w-2xl mx-auto">
      <ContentTitle title={frontmatter.title} date={frontmatter.date} readingMinutes={frontmatter.readingMinutes} />
      <MdxContent serialized={serialized} />

      <section className='flex flex-row items-center justify-start w-full gap-2 py-6'>
        <Tags tags={frontmatter.tags} />
      </section>

      <hr className={'border-1 w-full border-slate-300 my-6'} />

      <IdCard />
      <Comment />
    </section >
  );
}