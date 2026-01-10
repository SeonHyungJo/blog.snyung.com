type ContentTagsProps = {
  tags: string[];
};

export default function Tags({ tags }: ContentTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-1.5 text-xs border-none rounded-md outline-none text-gray-500 bg-gray-100 whitespace-nowrap"
        >
          {`#${tag}`}
        </span>
      ))}
    </>
  );
}
