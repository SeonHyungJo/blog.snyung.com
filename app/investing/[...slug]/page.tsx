import { Metadata } from "next";

import { getAllPostsPaths } from "@/app/_api/getAllInvestingPosts";
import { getInvstingPost } from "@/app/_api/getInvestingPosts";
import ContentTitle from "@/app/_components/ContentTitle";
import IdCard from "@/app/_components/IdCard";
import { MdxContent } from "@/app/_components/MdxContent";
import Tags from "@/app/_components/Tags";

import Comment from "../../_components/Comment";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.map((param) => decodeURIComponent(param));
  const { frontmatter } = await getInvstingPost(`/${path.join("/")}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.category,
    creator: frontmatter.author,
  };
}

export function generateStaticParams() {
  return getAllPostsPaths();
}

export default async function InvestingMainPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.map((param) => decodeURIComponent(param));
  const { frontmatter, content } = await getInvstingPost(
    `/${path.join("/")}`
  );

  return (
    <section className="w-full max-w-2xl mx-auto">
      <ContentTitle
        title={frontmatter.title}
        date={frontmatter.date}
        readingMinutes={frontmatter.readingMinutes}
      />
      <MdxContent content={content} />

      <section className="flex flex-row items-center justify-start w-full gap-2 py-6">
        <Tags tags={frontmatter.tags} />
      </section>

      <hr className={"border-1 w-full border-slate-300 my-6"} />

      <IdCard />
      <Comment />
    </section>
  );
}
