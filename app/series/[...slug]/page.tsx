export default function SeriesMainPage({ params }:  { params: { slug: string[] } }) {
  return (
    <section>
      {'Series Detail'}
      {params.slug}
    </section>
  );
}