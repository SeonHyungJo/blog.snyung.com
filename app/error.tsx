"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">Error</h1>
      <p className="text-lg text-gray-500 max-w-md">
        에러가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          홈으로
        </Link>
      </div>
    </section>
  );
}