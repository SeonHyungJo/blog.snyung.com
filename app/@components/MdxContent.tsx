'use client';

import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';

import { Frontmatter, Post } from '../@type/post';

const MdxComponents = {
  img: (props: any) => (
    <Image
      className={'w-full max-w-2xl'}
      width={680}
      height={320}
      alt={'Image'}
      {...props} />
  )
};

export function MdxContent({ serialized }: Pick<Post<Frontmatter>, 'serialized'>) {
  return (
    <div className="prose max-w-none prose-code:before:content-[''] prose-code:after:content-[''] prose-code:rounded-lg prose-code:p-1.5 prose-code:bg-slate-200 dark:prose-dark prose-img:max-w-none prose-img:rounded-xl prose-a:text-stale-300">
      <MDXRemote {...serialized} components={MdxComponents} />
    </div>
  );
}