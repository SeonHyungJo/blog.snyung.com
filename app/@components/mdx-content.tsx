'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

const MdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 style={{ color: '#FFF676' }} {...props} />
  ),
  img: (props: any) => (
    <Image
      width={640}
      height={320}
      placeholder={'blur'}
      blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8MBMAAj8Ba+8o2i0AAAAASUVORK5CYII='}
      alt={'Image'}
      {...props} />
  ),
  /** Card component */
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      style={{
        background: '#333',
        borderRadius: '0.25rem',
        padding: '0.5rem 1rem',
      }}
      {...props}
    />
  ),
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose dark:prose-dark">
      <MDXRemote {...source} components={MdxComponents} />
    </div>
  );
}