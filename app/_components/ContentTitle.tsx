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
    <section
      className={"w-auto flex flex-col justify-start items-start gap-2 py-2"}
    >
      <h1 className="text-center">{title}</h1>

      {tags?.length > 0 && (
        <section className="flex flex-row flex-wrap items-center gap-2 mt-2">
          <Tags tags={tags} />
        </section>
      )}

      <section
        className={
          "w-auto flex flex-row justify-center items-center gap-2 mt-2 px-2"
        }
      >
        <span className={"text-base text-slate-400"}>
          {`${dayjs(date).format("YYYY년 M월 D일")} / ${readingMinutes}분`}
        </span>
      </section>
    </section>
  );
}
