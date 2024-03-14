type TopSectionProps = {
  title: string;
  content: string;
  footer?: React.ReactNode;
};

export default function TopSection({
  title,
  content,
  footer,
}: TopSectionProps) {
  return (
    <section className={"flex flex-col justify-start items-start gap-6"}>
      <h2>{title}</h2>
      <p>{content}</p>

      {footer && footer}
    </section>
  );
}
