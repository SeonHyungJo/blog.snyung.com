"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

export default function Header() {
  return (
    <header className="pt-safe">
      <section className="sticky top-0 flex flex-row justify-center pt-2 w-full sm:pt-6">
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
      </section>
    </header>
  );
}
