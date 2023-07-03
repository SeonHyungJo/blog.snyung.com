"use client";

import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINK } from "@/blog.config";

export default function SocialLinks() {
  return (
    <>
      {SOCIAL_LINK.map((link) => (
        <Link key={link.type} href={link.url} rel="noopener noreferrer" target='_blank'>
          <Image
            width={20}
            height={20}
            src={link.iconPath}
            alt={`social-${link.type}`}
            style={{ cursor: "pointer", width: 20, height: 20, }}
          />
        </Link>
      ))}
    </>
  );
}