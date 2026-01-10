type ContentTagsProps = {
  tags: string[];
};

export default function Tags({ tags }: ContentTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-1.5 py-0.5 text-sm border-none rounded outline-none text-gray-500 bg-gray-100 whitespace-nowrap"
        >
          {`#${tag}`}
        </span>
      ))}
    </>
  );
}
