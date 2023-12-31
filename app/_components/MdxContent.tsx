"use client";

import Image from "next/image";
import { MDXRemote } from "next-mdx-remote";

import { Frontmatter, Post } from "../_type/post";

const MdxComponents = {
  img: (props: any) => (
    <Image
      className={"w-full max-w-2xl"}
      width={680}
      height={320}
      placeholder={"blur"}
      blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8MBMAAj8Ba+8o2i0AAAAASUVORK5CYII="}
      alt={"Posts Image"}
      {...props} />
  )
};

export function MdxContent({ serialized }: Pick<Post<Frontmatter>, "serialized">) {
  return (
    <div className="prose max-w-none prose-code:before:content-[''] prose-code:after:content-[''] prose-code:rounded-lg prose-code:px-1.5 prose-code:py-1 prose-code:bg-slate-200 dark:prose-dark prose-img:max-w-none prose-img:rounded-xl prose-a:text-stale-300">
      <MDXRemote {...serialized} components={MdxComponents} />
    </div>
  );
}