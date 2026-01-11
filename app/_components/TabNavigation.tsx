"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "classnames";

const TABS = [
  { name: "전체", url: "/" },
  { name: "개발", url: "/tech" },
  { name: "투자", url: "/invest" },
  { name: "아티클", url: "/articles" },
  { name: "소개", url: "/snyung" },
];

const DETAIL_PATHS = ["/tech/", "/invest/", "/articles/"];

export default function TabNavigation() {
  const pathname = usePathname();

  // Hide nav on detail pages
  const isDetailPage = DETAIL_PATHS.some(
    (path) => pathname.startsWith(path) && pathname !== path.slice(0, -1)
  );

  if (isDetailPage) {
    return null;
  }

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <nav className="relative flex flex-row items-center justify-start pt-4 pb-2 px-4">
      {TABS.map(({ name, url }) => (
        <Link
          key={url}
          href={url}
          className={cx(
            "relative pb-2 px-4 text-lg transition-colors z-10 cursor-pointer",
            isActive(url)
              ? "text-gray-900 font-semibold"
              : "text-gray-400 hover:text-gray-600"
          )}
        >
          {name}
          <span
            className={cx(
              "absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-transform duration-300 origin-left pointer-events-none",
              isActive(url) ? "scale-x-100" : "scale-x-0"
            )}
          />
        </Link>
      ))}
      <span className="absolute bottom-2 left-0 w-full h-px bg-gray-200 pointer-events-none" />
    </nav>
  );
}
