"use client";

import Link from "next/link";

const footerLinks = [
  { name: "GitHub", href: "https://github.com/SeonHyungJo" },
  { name: "Blog", href: "https://github.com/SeonHyungJo/snyung.com" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/snyung" },
];

export default function Footer() {
  return (
    <footer className="py-10">
      <hr className="w-full border-1 border-slate-200 mb-6" />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-slate-500">
        <nav className="flex flex-row flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-slate-700 transition-colors"
            >
              {name}
            </Link>
          ))}
        </nav>

        <p className="text-slate-800 text-base">
          {"© 2023-2026 snyung. Powered by Next.js / Netlify"}
        </p>
      </div>
    </footer>
  );
}
