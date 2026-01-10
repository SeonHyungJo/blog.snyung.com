"use client";

import { Suspense } from "react";

import TagItem from "./TagItem";

type TagListClientProps = {
  tags: string[];
};

function TagListFallback({ tags }: TagListClientProps) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-1.5 text-xs border-none rounded-md outline-none text-gray-500 bg-gray-100 whitespace-nowrap"
        >
          {`#${tag}`}
        </span>
      ))}
    </div>
  );
}

function TagListContent({ tags }: TagListClientProps) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} showActiveState />
      ))}
    </div>
  );
}

export default function TagListClient({ tags }: TagListClientProps) {
  return (
    <aside className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">태그</h3>
      <Suspense fallback={<TagListFallback tags={tags} />}>
        <TagListContent tags={tags} />
      </Suspense>
    </aside>
  );
}
