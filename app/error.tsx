"use client";

import Link from "next/link";

import TopSection from "./_components/TopSection";

export default function ErrorPage() {
  return (
    <TopSection
      title={"Error"}
      content={"⚒️ 에러가 발생했네요... 열심히 찾아서 수정하겠습니다. 🙇‍♂️"}
      footer={
        <section className={"py-2 px-2"}>
          <Link href={"/posts"} className={"text-slate-400"}>
            {"Move to Posts Page >"}
          </Link>
        </section>
      }
    />
  );
}