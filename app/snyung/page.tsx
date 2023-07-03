import Link from "next/link";

import { getAboutMe } from "../_api/getAboutMe";
import { MdxContent } from "../_components/MdxContent";
import TopSection from "../_components/TopSection";


export default async function AboutMePage() {
  const { frontmatter, serialized } = await getAboutMe();

  return (
    <>
      <TopSection
        title={frontmatter.title}
        content={`Last Modified : ${frontmatter?.date ?? ""}`}
      />
      <MdxContent serialized={serialized} />
    </>
  );
}