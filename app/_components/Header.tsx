"use client";

import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import cx from "classnames";

import { TOP_MENU } from "@/blog.config";

export default function Header() {
  return (
    <header className="pt-safe">
      <Navigation />
    </header>
  );
}

function Navigation() {
  const [firtSegment = ""] = useSelectedLayoutSegments();

  return (
    <section className="sticky top-0 flex flex-row justify-between py-6 w-full sm:py-10">
      <section
        className={"hover:bg-slate-100 transition-all py-2 px-3 rounded-lg"}
      >
        <Link prefetch href={"/"}>
          <ExportedImage
            width={120}
            height={36}
            src={"/images/common/snyung.png"}
            alt="logo"
            style={{ cursor: "pointer", width: 120, height: 36 }}
          />
        </Link>
      </section>

      <section className={"flex flex-row justify-start items-center"}>
        {TOP_MENU.map(({ name, url }) => (
          <Link
            key={url}
            href={url}
            prefetch
            className={cx(
              "text-base text-slate-600 hover:bg-slate-100 transition-all py-2 px-3 rounded-lg",
              url === `/${firtSegment}` && "font-bold"
            )}
          >
            {name}
          </Link>
        ))}
      </section>
    </section>
  );
}
