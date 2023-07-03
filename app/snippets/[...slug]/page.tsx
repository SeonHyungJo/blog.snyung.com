export default function SnippetsMainPage({ params }:  { params: { slug: string[] } }) {
  return (
    <section>
      {"Snippets Detail"}
      {params.slug}
    </section>
  );
}