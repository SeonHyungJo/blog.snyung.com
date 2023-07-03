export default function ArchivesMainPage({ params }:  { params: { slug: string[] } }) {
  return (
    <section>
      {"ArchivesM Detail"}
      {params.slug}
    </section>
  );
}