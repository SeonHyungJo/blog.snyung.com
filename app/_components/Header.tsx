"use client";

import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

import "react-spring-bottom-sheet/dist/style.css";
import cx from "classnames";

import { TOP_MENU } from "@/blog.config";

export default function Header() {
  return (
    <header className="pt-safe">
      <Navigation />
      <MobileNavigation />
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
          <Image
            width={120}
            height={36}
            src={"/images/common/snyung.png"}
            alt="logo"
            style={{ cursor: "pointer", width: 120, height: 36 }}
          />
        </Link>
      </section>

      <section
        className={"flex flex-row justify-start items-center max-sm:hidden"}
      >
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

function MobileNavigation() {
  const [firtSegment = ""] = useSelectedLayoutSegments();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <>
      {!openMenu && (
        <section
          className={
            "hidden max-sm:flex fixed left-8 bottom-8 w-12 h-12 flex-row justify-center items-center bg-orange-50 rounded-xl z-10 shadow-md shadow-slate-500"
          }
          onClick={() => setOpenMenu(true)}
        >
          <Image
            width={22}
            height={22}
            src={"/images/common/menu-icon.png"}
            alt="logo"
            style={{ cursor: "pointer", width: 24, height: 24 }}
            
          />
        </section>
      )}

      <BottomSheet open={openMenu} onDismiss={() => setOpenMenu(false)}>
        <section className="flex flex-col items-center justify-start gap-3 p-10">
          {TOP_MENU.map(({ name, url }) => (
            <Link
              key={url}
              href={url}
              prefetch
              className={cx(
                "text-base text-slate-600 hover:bg-slate-200 transition-all py-2 px-4 rounded-lg",
                url === `/${firtSegment}` && "font-bold"
              )}
              onClick={() => setOpenMenu(false)}
            >
              {name}
            </Link>
          ))}
        </section>
      </BottomSheet>
    </>
  );
}

function SearchAndThemeChanger() {
  return (
    <section className="flex flex-row items-center justify-start gap-3">
      {/* <BlogSearch /> */}
      {/* <section className={'flex flex-row justify-center items-center'}>
        <Images
          width={24}
          height={24}
          src={'/images/common/theme-light.png'}
          alt='logo'
          style={{ cursor: 'pointer', width: 24, height: 24 }}
        />
        <Image
          width={24}
          height={24}
          src={'/images/common/theme-dark.png'}
          alt='logo'
          style={{ cursor: 'pointer', width: 24, height: 24 }}
        />
      </section> */}
    </section>
  );
}
