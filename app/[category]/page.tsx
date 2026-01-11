import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getFilesByCategory,
  SUPPORTED_CATEGORIES,
} from "../../lib/google-drive";
import DrivePostList from "../_components/DrivePostList";
import RecentPosts from "../_components/RecentPosts";
import TagList from "../_components/TagList";

// ISR: 1시간마다 재검증
export const revalidate = 3600;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

// 정적 경로 생성 (SSG)
export function generateStaticParams() {
  return SUPPORTED_CATEGORIES.map((category) => ({
    category,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!SUPPORTED_CATEGORIES.includes(category)) {
    return { title: "Not Found" };
  }

  return {
    title: category.charAt(0).toUpperCase() + category.slice(1),
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // 지원하지 않는 카테고리면 404
  if (!SUPPORTED_CATEGORIES.includes(category)) {
    notFound();
  }

  const files = await getFilesByCategory(category);

  return (
    <div className="flex flex-row gap-8 pt-4">
      <DrivePostList files={files} />

      <aside className="hidden lg:flex lg:flex-col lg:gap-10 w-[280px] flex-shrink-0 pl-8 border-l border-gray-100">
        <RecentPosts />
        <TagList />
      </aside>
    </div>
  );
}
