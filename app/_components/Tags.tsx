"use client";

import { Suspense } from "react";

import TagItem from "./TagItem";

type TagsProps = {
  tags: string[];
};

function TagsFallback({ tags }: TagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-1.5 text-xs border-none rounded-md outline-none text-gray-500 bg-gray-100 whitespace-nowrap"
        >
          {`#${tag}`}
        </span>
      ))}
    </>
  );
}

function TagsContent({ tags }: TagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <TagItem key={tag} tag={tag} />
      ))}
    </>
  );
}

export default function Tags({ tags }: TagsProps) {
  return (
    <Suspense fallback={<TagsFallback tags={tags} />}>
      <TagsContent tags={tags} />
    </Suspense>
  );
}
