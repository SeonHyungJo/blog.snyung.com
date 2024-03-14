"use client";

import Image from "next/image";

import { Frontmatter } from "../_type/post";

type ContentTitleProps = Pick<Frontmatter, "title" | "date" | "readingMinutes">;

export default function ContentTitle({
  title,
  date,
  readingMinutes,
}: ContentTitleProps) {
  return (
    <section
      className={"w-auto flex flex-col justify-start items-start gap-2 py-2"}
    >
      <h3 className="text-center">{title}</h3>

      <section
        className={
          "w-auto flex flex-row justify-center items-center gap-2 mt-2 px-2"
        }
      >
        <span className={"text-sm text-slate-400"}>
          {`${date} / ${readingMinutes}min`}
        </span>
      </section>

      <hr className={"border-1 w-full border-slate-300 my-5"} />
    </section>
  );
}
