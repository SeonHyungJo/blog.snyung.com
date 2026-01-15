"use client";

import dayjs from "dayjs";

import { Frontmatter } from "../_type/post";
import Tags from "./Tags";

type ContentTitleProps = Pick<
  Frontmatter,
  "title" | "date" | "readingMinutes" | "tags"
>;

export default function ContentTitle({
  title,
  date,
  readingMinutes,
  tags,
}: ContentTitleProps) {
  return (
    <section className={"w-auto flex flex-col justify-start items-start py-8"}>
      <h1 className="text-left">{title}</h1>

      <section
        className={"w-auto flex flex-col justify-start items-start py-4"}
      >
        {tags?.length > 0 && (
          <section className="flex flex-row flex-wrap items-center gap-2 mt-2">
            <Tags tags={tags} />
          </section>
        )}
        <section
          className={
            "w-auto flex flex-row justify-center items-center gap-2 mt-2 px-0"
          }
        >
          <span className={"text-sm text-slate-400"}>
            {`${dayjs(date).format("YYYY년 M월 D일")} / ${readingMinutes}분`}
          </span>
        </section>
      </section>
    </section>
  );
}
