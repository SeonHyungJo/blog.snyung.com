export default function PostsMainPage({ params }:  { params: { slug: string[] } }) {
  return (
    <section>
      {'Posts Detail'}
      {params.slug}
    </section>
  );
}