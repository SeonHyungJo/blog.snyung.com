import Link from "next/link";

import TopSection from "../@components/TopSection";
import { getAboutMe } from "../@api/getAboutMe";
import { MdxContent } from "../@components/MdxContent";


export default async function AboutMePage() {
  const { frontmatter, serialized } = await getAboutMe();

  return (
    <>
      <TopSection
        title={frontmatter.title}
        content={`Last Modified : ${frontmatter?.date ?? ''}`}
      />
      <MdxContent serialized={serialized} />
    </>
  );
}