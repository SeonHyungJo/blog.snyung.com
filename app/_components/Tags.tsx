type ContentTagsProps = {
  tags: string[]
}

export default function Tags({ tags }: ContentTagsProps) {
  return (
    <>
      {tags.map((tag) => (
        <button key={tag} className='px-1.5 py-0.5 text-sm border-none rounded-lg outline-none text-slate-500 bg-slate-200 whitespace-nowrap text-sm'>
          {tag}
        </button>
      ))}
    </>
  );
}