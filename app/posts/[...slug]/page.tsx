
import { getAllPostsPaths } from '@/app/@api/getAllPosts';
import { getPost } from '@/app/@api/getPost';

import IdCard from '../../@components/IdCard';
import Tags from '../../@components/Tags';
import ContentTitle from '../../@components/ContentTitle';
import { MdxContent } from '../../@components/MdxContent';
import Giscus from '../../@components/Giscus';

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
      <Giscus />
    </section >
  );
}