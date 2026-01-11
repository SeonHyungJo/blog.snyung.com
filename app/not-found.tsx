import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-lg text-gray-500 max-w-md">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors mt-4"
      >
        홈으로
      </Link>
    </section>
  );
}
