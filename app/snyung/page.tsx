import Link from "next/link";

import TopSection from "../_components/TopSection";
import { getAboutMe } from "../_api/getAboutMe";
import { MdxContent } from "../_components/MdxContent";


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