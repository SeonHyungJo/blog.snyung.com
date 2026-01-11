"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

export default function Header() {
  return (
    <header className="pt-safe">
      <section className="sticky top-0 flex flex-row justify-center pt-2 w-full sm:pt-6">
        <Link href={"/"} style={{ cursor: "pointer", width: 160, height: 48 }}>
          <ExportedImage
            width={160}
            height={48}
            src={"/images/common/snyung.png"}
            alt="logo"
          />
        </Link>
      </section>
    </header>
  );
}
