import { JSX } from "react";

type MdxContentProps = {
  content: JSX.Element;
};

export function MdxContent({ content }: MdxContentProps) {
  return (
    <article className="prose max-w-700 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:rounded-lg prose-code:px-1.5 prose-code:py-1 prose-code:bg-slate-200 dark:prose-dark prose-img:max-w-none prose-img:rounded-xl prose-a:text-stale-300
    lg:prose-h1:text-4xl prose-h1:text-3xl
    lg:prose-h2:text-3xl prose-h2:text-2xl
    lg:prose-h3:text-2xl prose-h3:text-xl
    lg:prose-h4:text-xl prose-h4:text-lg
    lg:prose-h5:text-lg prose-h5:text-base
    lg:prose-h6:text-base prose-h6:text-base
    ">
      {content}
    </article>
  );
}
