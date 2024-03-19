"use client";

import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";

import { Frontmatter, Post } from "../_type/post";

const MdxComponents = {
  img: (props: any) => (
    <Image
      className={"w-full max-w-2xl"}
      width={700}
      height={320}
      placeholder={"blur"}
      blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8MBMAAj8Ba+8o2i0AAAAASUVORK5CYII="}
      alt={"Posts Image"}
      {...props} />
  ),
  table: ({children, ...props}: any) =>  (
    <div className="overflow-x-scroll w-auto">
      <table {...props}>
        {children}
      </table>
    </div>
  ),
  blockquote: ({children, ...props}: any) =>  (
    <div className="overflow-x-scroll w-auto" {...props}>
      {children}
    </div>
  ),
};

export function MdxContent({ serialized }: Pick<Post<Frontmatter>, "serialized">) {
  return (
    <article className="prose max-w-700 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:rounded-lg prose-code:px-1.5 prose-code:py-1 prose-code:bg-slate-200 dark:prose-dark prose-img:max-w-none prose-img:rounded-xl prose-a:text-stale-300 
    lg:prose-h1:text-4xl prose-h1:text-3xl
    lg:prose-h2:text-3xl prose-h2:text-2xl
    lg:prose-h3:text-2xl prose-h3:text-xl
    lg:prose-h4:text-xl prose-h4:text-lg
    lg:prose-h5:text-lg prose-h5:text-base
    lg:prose-h6:text-base prose-h6:text-base
    ">
      <MDXRemote {...serialized} components={MdxComponents} />
    </article>
  );
}