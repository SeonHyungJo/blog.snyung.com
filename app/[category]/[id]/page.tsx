import { Metadata } from "next";
import { notFound } from "next/navigation";

import matter from "gray-matter";

import {
  getFilesByCategory,
  getFileWithMeta,
  SUPPORTED_CATEGORIES,
} from "../../../lib/google-drive";
import { serializedMDX } from "../../_api/serialize";
import Comment from "../../_components/Comment";
import ContentTitle from "../../_components/ContentTitle";
import IdCard from "../../_components/IdCard";
import { MdxContent } from "../../_components/MdxContent";

// ISR: 1시간마다 재검증
export const revalidate = 3600;

// 빌드 시점에 모든 카테고리의 파일을 가져와서 정적 경로 생성
export async function generateStaticParams() {
  const allParams: { category: string; id: string }[] = [];

  for (const category of SUPPORTED_CATEGORIES) {
    try {
      const files = await getFilesByCategory(category);
      const categoryParams = files.map((file) => ({
        category,
        id: file.fileId,
      }));
      allParams.push(...categoryParams);
    } catch (error) {
      console.error(`Error fetching files for category ${category}:`, error);
    }
  }

  // output: export 모드에서는 최소 1개 경로가 필요
  // 환경 변수가 없으면 placeholder 경로 생성
  if (allParams.length === 0) {
    return SUPPORTED_CATEGORIES.map((category) => ({
      category,
      id: "_placeholder",
    }));
  }

  return allParams;
}

// frontmatter description이 없으면 본문 앞부분을 메타 설명으로 사용
function describe(raw: string, description?: string): string {
  if (description) return description;
  const text = matter(raw)
    .content.replace(/```[\s\S]*?```/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>|[#>*_`|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 155 ? `${text.slice(0, 155)}…` : text;
}

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, id } = await params;

  if (!SUPPORTED_CATEGORIES.includes(category)) {
    return { title: "Not Found" };
  }

  const file = await getFileWithMeta(id, category);

  if (!file) {
    return { title: "Not Found" };
  }

  const { title, date, tags, author, thumbnail } = file.frontmatter;
  const description = describe(file.raw, file.frontmatter.description);
  const url = `/${category}/${id}`;

  return {
    title,
    description,
    keywords: tags.length ? tags : file.frontmatter.category,
    creator: author,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: date,
      authors: [author],
      tags,
      images: [thumbnail || "/images/common/Avatar.png?width=1800"],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { category, id } = await params;

  // 지원하지 않는 카테고리면 404
  if (!SUPPORTED_CATEGORIES.includes(category)) {
    notFound();
  }

  // placeholder 경로는 설정 안내 페이지 표시
  if (id === "_placeholder") {
    return (
      <section className="w-full max-w-[700px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Google Drive 연동 필요
        </h1>
        <p className="text-gray-500">
          .env.local 파일에 Google Drive API 설정을 추가하고 다시 빌드해주세요.
        </p>
      </section>
    );
  }

  const file = await getFileWithMeta(id, category);

  if (!file) {
    notFound();
  }

  // MDX 컴파일
  const { content, frontmatter } = await serializedMDX(
    file.raw,
    `/${category}/${id}`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: describe(file.raw, file.frontmatter.description),
    datePublished: file.frontmatter.date,
    author: {
      "@type": "Person",
      name: file.frontmatter.author,
      url: "https://github.com/SeonHyungJo",
    },
    mainEntityOfPage: `https://snyung.com/${category}/${id}`,
    keywords: file.frontmatter.tags.join(", "),
    inLanguage: "ko-KR",
  };

  return (
    <section className="w-full max-w-[700px] mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ContentTitle
        title={frontmatter.title}
        date={frontmatter.date}
        readingMinutes={frontmatter.readingMinutes}
        tags={file.frontmatter.tags}
      />
      <MdxContent content={content} />

      <IdCard />
      <Comment />
    </section>
  );
}
