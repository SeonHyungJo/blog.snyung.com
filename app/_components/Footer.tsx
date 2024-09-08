"use client";

import Link from "next/link";

import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className={"flex flex-col justify-start items-center gap-4 py-10"}>
      <hr className={"w-full border-1 border-slate-300"} />

      <section
        className={"w-full flex flex-col justify-center items-end gap-2"}
      >
        <section
          className={"w-full flex flex-row justify-end items-center gap-2"}
        >
          <SocialLinks />
        </section>

        <p className={"text-sm gap-1 text-slate-600 font-semibold text-right"}>
          <span className={"text-slate-300 font-normal mr-2"}>
            {"© 2023-2024"}
          </span>
          <Link
            href={"https://github.com/SeonHyungJo/snyung.com"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {"snyung blog"}
          </Link>
          <span className={"text-slate-300 font-normal mx-2"}>
            {"Powered by"}
          </span>
          <Link
            href={"https://nextjs.org/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {"Next.js"}
          </Link>
          <span className={"text-slate-300 font-normal mr-2"}>{"/"}</span>
          <Link
            href={"https://www.netlify.com/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {"Netlify"}
          </Link>
        </p>
      </section>
    </footer>
  );
}
