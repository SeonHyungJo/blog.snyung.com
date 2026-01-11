"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

import dayjs from "dayjs";

import { DriveFileWithMeta } from "../../lib/google-drive";
import Tags from "./Tags";

const DEFAULT_THUMBNAIL = "/images/common/snyung.png";

export default function DrivePostItem({ frontmatter }: DriveFileWithMeta) {
  return (
    <Link
      scroll={true}
      href={frontmatter.path}
      className="group flex flex-row items-start justify-between w-full gap-6 px-4 py-2 rounded-lg cursor-pointer"
    >
      <section className="flex flex-col items-start justify-between flex-1 min-w-0 min-h-[80px] sm:min-h-[120px]">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 line-clamp-2">
            {frontmatter.title}
          </h3>

          {frontmatter.description && (
            <p className="text-sm text-gray-400 line-clamp-2">
              {frontmatter.description}
            </p>
          )}
        </div>

        <section className="flex flex-row flex-wrap items-center gap-2 my-4">
          <span className="text-sm text-gray-400">
            {dayjs(frontmatter.date, "YYYY.MM.DD").format("YYYY년 M월 D일")}
          </span>
          <span className="text-sm text-gray-300">·</span>
          <span className="text-sm text-gray-400">
            {frontmatter.readingMinutes}분
          </span>

          {frontmatter.tags?.length > 0 && (
            <>
              <span className="text-sm text-gray-300">·</span>
              <Tags tags={frontmatter.tags.slice(0, 3)} />
            </>
          )}
        </section>
      </section>

      <section className="flex-shrink-0 w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] overflow-hidden rounded-lg">
        <ExportedImage
          src={frontmatter.thumbnail || DEFAULT_THUMBNAIL}
          alt={frontmatter.title}
          width={120}
          height={120}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </section>
    </Link>
  );
}
