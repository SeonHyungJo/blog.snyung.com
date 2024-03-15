import { getInvstingPost } from "@/app/_api/getInvestingPosts";
import Comment from "@/app/_components/Comment";
import ContentTitle from "@/app/_components/ContentTitle";
import IdCard from "@/app/_components/IdCard";
import { MdxContent } from "@/app/_components/MdxContent";
import Tags from "@/app/_components/Tags";

export default async function InvestingMainPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const path = params.slug.map((param) => decodeURIComponent(param));
  const { frontmatter, serialized } = await getInvstingPost(
    `/${path.join("/")}`
  );

  return (
    <section className="w-full max-w-2xl mx-auto">
      <ContentTitle
        title={frontmatter.title}
        date={frontmatter.date}
        readingMinutes={frontmatter.readingMinutes}
      />
      <MdxContent serialized={serialized} />

      <section className="flex flex-row items-center justify-start w-full gap-2 py-6">
        <Tags tags={frontmatter.tags} />
      </section>

      <hr className={"border-1 w-full border-slate-300 my-6"} />

      <IdCard />
      <Comment />
    </section>
  );
}
