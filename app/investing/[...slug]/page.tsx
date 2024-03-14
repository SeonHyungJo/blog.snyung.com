export default function InvestingMainPage({
  params,
}: {
  params: { slug: string[] };
}) {
  return (
    <section>
      {"Investing Detail"}
      {params.slug}
    </section>
  );
}
