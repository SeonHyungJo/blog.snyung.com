export default function ArticlesMainPage({ params }:  { params: { slug: string[] } }) {
  return (
    <section>
      {"Articles Detail"}
      {params.slug}
    </section>
  );
}