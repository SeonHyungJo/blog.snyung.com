"use client";

import Link from "next/link";

import Tags from "../_components/Tags";
import { Frontmatter, Post } from "../_type/post";

export default function PostListItem({ frontmatter }: Post<Frontmatter>) {
  return (
    <Link
      scroll={true}
      href={frontmatter.path}
      className="flex flex-col items-start justify-start w-full gap-3 px-1 py-0 transition-all rounded-lg cursor-pointer sm:px-4 sm:py-4 hover:shadow-sm hover:bg-indigo-100 will-change-contents"
    >
      <p className="w-full text-lg font-semibold py-2">{frontmatter.title}</p>

      {frontmatter.description && (
        <p className="w-full px-1 text-sm text-slate-400">
          {frontmatter.description}
        </p>
      )}

      <section className="flex flex-col items-center justify-end w-full gap-3 py-2 sm:flex-row sm:items-start sm:justify-between">
        <section className="flex flex-row flex-wrap items-center justify-start w-full gap-2">
          <Tags tags={frontmatter.tags} />
        </section>

        <section
          className={
            "w-full flex flex-row sm:justify-end justify-start items-center gap-2"
          }
        >
          <span className={"text-sm text-slate-400 whitespace-nowrap"}>
            {`${frontmatter.date} / ${frontmatter.readingMinutes}min`}
          </span>
        </section>
      </section>
    </Link>
  );
}
