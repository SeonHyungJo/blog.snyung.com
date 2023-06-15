import Link from "next/link";
import TopSection from "./_components/TopSection";

export default async function Home() {
  return (
    <TopSection
        title={'snyung blog'}
        content={'Frontend Engineer'}
        footer={
          <section className={'py-2 px-2'}>
            <Link href={"/posts"} className={'text-slate-400'}>
              {'Read All Posts >'}
            </Link>
          </section>
        }
      />
  );
}