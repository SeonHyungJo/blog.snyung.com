"use client";

import Link from "next/link";

import { SOCIAL_LINK } from "@/blog.config";

const SOCIAL_NAMES: Record<string, string> = {
  mail: "Email",
  github: "GitHub",
  facebook: "Facebook",
  book: "Book",
};

export default function SocialLinks() {
  return (
    <nav className="flex flex-row flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
      {SOCIAL_LINK.map((link) => (
        <Link
          key={link.type}
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-slate-700 transition-colors"
        >
          {SOCIAL_NAMES[link.type] || link.type}
        </Link>
      ))}
    </nav>
  );
}
