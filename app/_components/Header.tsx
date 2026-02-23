"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";

const SIDE_PROJECTS = [
  {
    name: "연말정산",
    href: "https://tax.snyung.com",
    color: "emerald",
  },
  {
    name: "CMS",
    href: "https://cms.snyung.com",
    color: "blue",
  },
  {
    name: "트레이딩",
    href: "https://trade.snyung.com",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  emerald:
    "bg-emerald-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50",
  blue: "bg-blue-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50",
  purple:
    "bg-purple-400 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50",
  orange:
    "bg-orange-400 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50",
  pink: "bg-pink-400 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50",
};

export default function Header() {
  return (
    <header>
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
      <nav className="flex justify-end gap-1 pt-3 px-0 sm:px-2">
        {SIDE_PROJECTS.map(({ name, href, color }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-1.5 px-1 py-1 text-xs font-medium text-slate-500 border border-slate-200 rounded-full transition-all duration-200 ${colorMap[color]?.split(" ").slice(1).join(" ")}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${colorMap[color]?.split(" ")[0]} group-hover:animate-pulse`}
            />
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
