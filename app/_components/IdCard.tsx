"use client";

import ExportedImage from "next-image-export-optimizer";

import SocialLinks from "./SocialLinks";

const ID_DATA = {
  name: "snyung",
  description: "Software Engineer(from. 2018)",
  avatarImg: "/images/common/avatar.jpg",
};

export default function IdCard() {
  return (
    <section className="flex flex-row items-center justify-center gap-8 p-10 mx-auto bg-slate-100 rounded-lg w-full max-w-[700px] mt-12 mb-8">
      <ExportedImage
        className="rounded-full"
        width={90}
        height={90}
        src={ID_DATA.avatarImg}
        alt={"avatar"}
      />

      <section className="flex flex-col items-start justify-center">
        <span className="text-xl font-bold">{ID_DATA.name}</span>
        <span className="text-sm text-slate-500">{ID_DATA.description}</span>
        <section
          className={
            "mt-2 w-full flex flex-row justify-start items-center gap-1"
          }
        >
          <SocialLinks />
        </section>
      </section>
    </section>
  );
}
