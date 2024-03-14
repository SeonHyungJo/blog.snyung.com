export default function HomebarMainPage({
  params,
}: {
  params: { slug: string[] };
}) {
  return (
    <section>
      {"Homebar Detail"}
      {params.slug}
    </section>
  );
}
