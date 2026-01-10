import { Metadata } from "next";

import { getAllPostsPaths } from "@/app/_api/getAllPosts";
import { getPost } from "@/app/_api/getPost";

import Comment from "../../_components/Comment";
import ContentTitle from "../../_components/ContentTitle";
import IdCard from "../../_components/IdCard";
import { MdxContent } from "../../_components/MdxContent";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.map((param) => decodeURIComponent(param));
  const { frontmatter } = await getPost(`/${path.join("/")}`);

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

export default async function PostsDetailPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.map((param) => decodeURIComponent(param));
  const { frontmatter, content } = await getPost(`/${path.join("/")}`);

  return (
    <section className="w-full max-w-[700px] mx-auto px-6">
      <ContentTitle
        title={frontmatter.title}
        date={frontmatter.date}
        readingMinutes={frontmatter.readingMinutes}
        tags={frontmatter.tags}
      />
      <MdxContent content={content} />

      <hr className={"border-1 w-full border-slate-300 my-6"} />

      <IdCard />
      <Comment />
    </section>
  );
}
