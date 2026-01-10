import { getAboutMe } from "../_api/getAboutMe";
import { MdxContent } from "../_components/MdxContent";

export default async function AboutMePage() {
  const { content } = await getAboutMe();

  return (
    <section className="w-full max-w-[700px] mx-auto pt-8 px-6">
      <MdxContent content={content} />
    </section>
  );
}
